const path = require('path')
const fs = require('fs')

generateRoutes()

async function generateRoutes() {
  const dirs = fs.opendirSync(path.join(__dirname, '../components'))

  const components = []

  for await (const dir of dirs) {
    if (dir.isDirectory() && !dir.name.startsWith('_') && dir.name !== 'style') {
      components.push(dir.name)
    }
  }

  const routes = `export const exampleRoutes = [
  ${components
    .map((component) => {
      let content = fs.readFileSync(path.join(__dirname, `../components/${component}/index.md`)).toString()

      let type = content.match(/type: (.*)/)[1]
      let title = content.match(/title: (.*)/)[1]
      let subtitle = content.match(/subtitle: (.*)/)[1]
      return `
  {
    path: '${component}',
    meta: {doc: import('../../../components/${component}/index.md'), type: '${type}', title: '${title}', subtitle: '${subtitle}'},
    component: () => import('../../../components/${component}/example/index.vue')
  }`
    })
    .join(',')}
]
`
  fs.writeFileSync(path.join(__dirname, '../site/src/routes/component.js'), routes, { flag: 'w' })
}
