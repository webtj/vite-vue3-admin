import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import path from 'path'

const resolve = dir => {
  return path.join(__dirname, dir)
}

const isPro = process.env.NODE_ENV === 'production'
const vueI18nBundler = isPro ? 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js' : 'vue-i18n/dist/vue-i18n.cjs.js'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src'),
      '_c': resolve('src/components'),
      '_v': resolve('src/view'),
      'vue-i18n': vueI18nBundler
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    vueI18n({ //Three-shaking https://vue-i18n.intlify.dev/guide/advanced/optimization.html#vite 
      include: path.resolve(__dirname, './locale/**')
    }),
  ]
})
