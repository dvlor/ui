const argv = process.argv
const path = require('path')
const fs = require('fs')

const component = ''

switch (argv[2]) {
  case '-add':
  case '-a':
    if (argv.length <= 3) {
      console.log('组件名称不能为空')
    }
    for (let index = 3; index < argv.length; index++) {
      addComponent(argv[index])
    }
    break
  case '-remove':
  case '-r':
    if (argv.length <= 3) {
      console.log('组件名称不能为空')
    }
    for (let index = 3; index < argv.length; index++) {
      removeComponent(argv[index])
    }
    break
}

function removeComponent(name) {
  name = name.replace(/\w/, ($0) => $0.toUpperCase())
  unRegisterComponent(name)
}

function addComponent(name) {
  name = name.replace(/\w/, ($0) => $0.toUpperCase())
  generateComponentFiles(name)
  registerComponent(name)
}

//
async function generateComponentFiles(name) {
  const dst = path.join(__dirname, '../../component/', name)
  try {
    fs.statSync(dst)
    return false
  } catch (e) {
    fs.mkdirSync(dst)
  }

  await copyDir(path.join(__dirname, 'template'), dst, name)
}

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
          console.log(dstDir)
          fs.mkdirSync(dstDir)
        }
        await copyDir(srcFile, dstDir, name)
      } else {
        const dstFilePath = path.join(dst, dir.name.replace('component', name).replace('.tpl', ''))
        let content = fs.readFileSync(srcFile).toString()
        content = content.replace(/\$\{name\}/g, name)
        content = content.replace(/\$\{name_camcel\}/g, name_camel(name))
        content = content.replace(/\$\{name_pascal\}/g, name_pascal(name))
        content = content.replace(/\$\{name_kebab\}/g, name_kebab(name))
        fs.writeFileSync(dstFilePath, content)
      }
    }
  } catch (e) {
    console.log(e)
  }
}

// 注册组件
function registerComponent(name) {
  const component = `
export { ${name} } from './${name}/index'
export type { ${name}Prop } from './${name}/index'
`
  const style = `import './${name}/style.less'
`
  const types = `U${name}: typeof import('ui')['${name}']\r  `
  const compontentPath = path.join(__dirname, '../../component/components.ts')
  const stylePath = path.join(__dirname, '../../component/style.ts')
  const typesPath = path.join(__dirname, '../../component/global.d.ts')

  fs.writeFileSync(compontentPath, `${fs.readFileSync(compontentPath).toString()}${component}`)
  fs.writeFileSync(stylePath, `${fs.readFileSync(stylePath).toString()}${style}`)
  fs.writeFileSync(
    typesPath,
    `${fs
      .readFileSync(typesPath)
      .toString()
      .replace(/\}\s\}/, `${types}  }\n}`)}`
  )
}

// 清除组件注册
function unRegisterComponent(name) {
  const component = `
export { ${name} } from './${name}/index'
export type { ${name}Prop } from './${name}/index'
`
  const style = `import './${name}/style.less'
`
  const types = `    U${name}: typeof import('ui')['${name}']
`
  const compontentPath = path.join(__dirname, '../../component/components.ts')
  const stylePath = path.join(__dirname, '../../component/style.ts')
  const typesPath = path.join(__dirname, '../../component/global.d.ts')

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
