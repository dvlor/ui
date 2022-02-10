const fileRegex = /components\/(.*)\/example\/.*\.vue$/

let flag = false

export default function myPlugin() {
  return {
    name: 'transform-file',
    transform(src, id) {
      if (fileRegex.test(id)) {
        if (flag) {
        }
        return {
          code: src.match(/<template>(.*\s*)*<\/template>/)[0],
          map: null // 如果可行将提供 source map
        }
      }
    }
  }
}
