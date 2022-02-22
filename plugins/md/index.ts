import { md } from './md'

const fileRegex = /components\/(.*)\/.*\.md$/

export default function myPlugin() {
  return {
    name: 'transform-file',
    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: md(src),
          map: null // 如果可行将提供 source map
        }
      }
    }
  }
}
