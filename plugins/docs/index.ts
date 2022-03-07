import { splitVueTemplate } from './convertDoc'

const fileRegex = /components\/(.*)\/example\/.*\.vue$/

export default function myPlugin() {
  return {
    name: 'transform-file',
    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: splitVueTemplate(src),
          map: null // 如果可行将提供 source map
        }
      }
    }
  }
}
