const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')
const consola = require('consola')

// 组件入口路径
const compontentPath = path.join(__dirname, '../../components/components.ts')
// 样式入口路径
const stylePath = path.join(__dirname, '../../components/style.ts')
// 类型说明入口路径
const typesPath = path.join(__dirname, '../../typings/global.d.ts')
// 组件所在文件夹
const dst = path.join(__dirname, '../../components/')

main()

async function main() {
  const argv = process.argv
  const component = ''

  switch (argv[2]) {
    case '-add':
    case '-a':
      if (argv.length <= 3) {
        consola.info('组件名称不能为空')
        return
      }
      inquirer
        .prompt([{ type: 'confirm', message: '确定要创建组件吗', name: 'sure' }])
        .then(async (answers) => {
          if (answers.sure) {
            for (let index = 3; index < argv.length; index++) {
              if (!argv[index]) {
                continue
              }
              consola.log(`创建组件 ${argv[index]}`)
              const state = await addComponent(argv[index])
              if (state) {
                consola.success('完成')
              } else {
                consola.success('组件已存在')
              }
            }
          }
        })
        .catch((error) => {
          if (error.isTtyError) {
            consola.error(error)
          } else {
            consola.error(error)
          }
        })
      break
    case '-remove':
    case '-r':
      if (argv.length <= 3) {
        consola.info('组件名称不能为空')
        return
      }
      inquirer
        .prompt([{ type: 'confirm', message: '确定要删除组件吗', name: 'sure' }])
        .then(async (answers) => {
          if (answers.sure) {
            for (let index = 3; index < argv.length; index++) {
              if (!argv[index]) {
                continue
              }
              consola.log(`删除组件 ${argv[index]}`)
              const state = await removeComponent(argv[index])
              if (state) {
                consola.success('完成')
              } else {
                consola.success('组件不存在')
              }
            }
          }
        })
        .catch((error) => {
          if (error.isTtyError) {
            consola.error(error)
          } else {
            consola.error(error)
          }
        })
      break
  }
}

// 删除组件
async function removeComponent(name) {
  name = name.replace(/\w/, ($0) => $0.toUpperCase())
  const state = await removeComponentFiles(name)
  if (state) {
    unRegisterComponent(name)
    return true
  } else {
    return false
  }
}

// 新增组件
async function addComponent(name) {
  name = name.replace(/\w/, ($0) => $0.toUpperCase())
  // 基础文件拷贝
  const state = await generateComponentFiles(name)
  if (state) {
    // 组件注册
    registerComponent(name)
    return true
  } else {
    return false
  }
}

// 删除基础文件
async function removeComponentFiles(name) {
  let dir = path.join(dst, name)
  // 文件夹不存在 直接跳过
  try {
    fs.statSync(dir)
  } catch (e) {
    return false
  }

  // 删除文件夹
  fs.rmSync(dir, { recursive: true, force: true })
  return true
}

//拷贝基础文件
async function generateComponentFiles(name) {
  let dir = path.join(dst, name)
  // 文件夹存在 直接跳过
  try {
    fs.statSync(dir)
    return false
  } catch (e) {
    fs.mkdirSync(dir)
  }

  // 拷贝文件夹
  await copyDir(path.join(__dirname, 'template'), dir, name)
  return true
}

// 拷贝文件夹
async function copyDir(src, dst, name) {
  const dirs = fs.opendirSync(src)
  try {
    for await (let dir of dirs) {
      const srcFile = path.join(src, dir.name)

      const stat = fs.statSync(srcFile)
      if (stat.isDirectory()) {
        const dstDir = path.join(dst, dir.name)
        try {
          fs.accessSync(dstDir)
        } catch {
          fs.mkdirSync(dstDir)
        }
        await copyDir(srcFile, dstDir, name)
      } else {
        // 文件名处理
        const dstFilePath = path.join(dst, dir.name.replace('component', name).replace('.tpl', ''))
        let content = fs.readFileSync(srcFile).toString()
        // 文件内容处理
        content = content.replace(/\$\{name\}/g, name)
        content = content.replace(/\$\{name_camcel\}/g, name_camel(name))
        content = content.replace(/\$\{name_pascal\}/g, name_pascal(name))
        content = content.replace(/\$\{name_kebab\}/g, name_kebab(name))
        fs.writeFileSync(dstFilePath, content)
      }
    }
  } catch (e) {
    throw e
  }
}

// 注册组件
function registerComponent(name) {
  // 引入并导出组件
  const component = `
export { ${name} } from './${name}/index'
export type { ${name}Prop } from './${name}/index'
`
  // 引入样式
  const style = `import './${name}/style.less'
`
  // 导入类型
  const types = `    U${name}: typeof import('ui')['${name}']\n`

  fs.writeFileSync(compontentPath, `${fs.readFileSync(compontentPath).toString()}${component}`)
  fs.writeFileSync(stylePath, `${fs.readFileSync(stylePath).toString()}${style}`)
  fs.writeFileSync(
    typesPath,
    `${fs
      .readFileSync(typesPath)
      .toString()
      .replace(/  \}\s\}/, `${types}  }\n}`)}`
  )
}

// 清除组件注册
function unRegisterComponent(name) {
  // 引入并导出组件
  const component = `
export { ${name} } from './${name}/index'
export type { ${name}Prop } from './${name}/index'
`
  // 引入样式
  const style = `import './${name}/style.less'
`
  // 导入类型
  const types = `    U${name}: typeof import('ui')['${name}']
`

  const src = fs.readFileSync(compontentPath).toString()
  fs.writeFileSync(compontentPath, `${src.replace(component, '')}`)
  fs.writeFileSync(stylePath, `${fs.readFileSync(stylePath).toString().replace(style, '')}`)
  fs.writeFileSync(typesPath, `${fs.readFileSync(typesPath).toString().replace(types, '')}`)
}

// 字符串命名格式
function name_kebab(name) {
  return name.replace(/[A-Z]/g, ($0) => `-${$0.toLowerCase()}`).substr(1)
}

function name_camel(name) {
  return name.replace(/[A-Z]/, ($0) => `${$0.toLowerCase()}`)
}

function name_pascal(name) {
  return name
}
