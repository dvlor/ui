import fs from 'fs'
import path from 'path'

/**
 * 文件夹内容复制
 * @param {*} src 源文件夹
 * @param {*} dst 目标文件夹
 */
async function copyDir(src, dst) {
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
        await copyDir(srcFile, dstDir)
      } else {
        fs.copyFileSync(srcFile, path.join(dst, dir.name))
      }
    }
  } catch (e) {
    console.log(e)
  }
}

export const fileService = {
  copyDir
}
