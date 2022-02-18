import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [vueJsx(), vue()],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
      // 如果你指定了 build.lib，那么 build.assetsInlineLimit 将被忽略，无论文件大小，资源都会被内联。
      assetsInlineLimit: 4096,
      // 如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
      cssCodeSplit: true,
      cssTarget: 'chrome61',
      sourcemap: true,
      minify: 'esbuild',
      emptyOutDir: true,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 500,
      lib: {
        entry: path.resolve(__dirname, 'components/index.ts'),
        name: 'moon'
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  }
})
