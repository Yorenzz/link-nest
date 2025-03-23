import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const { VITE_APP_ENV } = loadEnv(mode, process.cwd())
  console.log(command)
  return {
    base: VITE_APP_ENV === 'production' ? '/link-nest' : '/',
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()]
      }
    },
    plugins: [
      vue(),
      AutoImport({
        /* options */
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.ts$/],
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core']
      }),
      Components({
        extensions: ['vue'],
        dirs: ['src/'],
        include: [/\.vue$/, /\.vue\?vue/]
      })
    ],
    resolve: {
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src')
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    }
  }
})
