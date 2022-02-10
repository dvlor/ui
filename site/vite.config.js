import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import docs from '../plugins/docs'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: '/',
    root: './',
    mode,
    plugins: [vueJsx(), docs(), vue()],
    publicDir: './public',
    cacheDir: './.vite',
    clearScreen: true,
    envDir: 'root',
    // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。
    envPrefix: 'VITE_',
    resolve: {
      alias: {
        ui: path.resolve(__dirname, '../components')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: '3000'
      // open: true,
      // proxy: {
      //   '/api': ''
      // }
    },
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
      chunkSizeWarningLimit: 500
    }
  }
  // if (command == 'serve') {
  //   return {
  //     base: '/',
  //     mode,
  //     plugins: [vue()],
  //     publicDir: './public',
  //     cacheDir: './.vite',
  //     clearScreen: true,
  //     envDir: 'root',
  //     // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。
  //     envPrefix: 'VITE_',
  //     server: {
  //       host: '0.0.0.0',
  //       port: '3000',
  //       open: true,
  //       proxy: {
  //         '/api': ''
  //       }
  //     },
  //     build: {
  //       outDir: 'dist',
  //       assetsDir: 'assets',
  //       // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
  //       // 如果你指定了 build.lib，那么 build.assetsInlineLimit 将被忽略，无论文件大小，资源都会被内联。
  //       assetsInlineLimit: 4096,
  //       // 如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
  //       cssCodeSplit: true,
  //       cssTarget: 'chrome61',
  //       sourcemap: true,
  //       minify: 'esbuild',
  //       emptyOutDir: true,
  //       reportCompressedSize: false,
  //       chunkSizeWarningLimit: 500
  //     }
  //   }
  // } else {
  //   return {
  //     base: '/',
  //     mode,
  //     plugins: [vue()],
  //     publicDir: './public',
  //     cacheDir: './.vite',
  //     clearScreen: true,
  //     envDir: 'root',
  //     // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。
  //     envPrefix: 'VITE_',
  //     build: {
  //       outDir: 'dist',
  //       assetsDir: 'assets',
  //       // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
  //       // 如果你指定了 build.lib，那么 build.assetsInlineLimit 将被忽略，无论文件大小，资源都会被内联。
  //       assetsInlineLimit: 4096,
  //       // 如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
  //       cssCodeSplit: true,
  //       cssTarget: 'chrome61',
  //       sourcemap: true,
  //       minify: 'esbuild',
  //       emptyOutDir: true,
  //       reportCompressedSize: true,
  //       chunkSizeWarningLimit: 500
  //     }
  //   }
  // }
})
