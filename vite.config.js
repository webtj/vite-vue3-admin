import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

const resolve = dir => {
  return path.join(__dirname, dir)
}

const isPro = process.env.NODE_ENV === 'production'
const vueI18nBundler = isPro ? 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js' : 'vue-i18n/dist/vue-i18n.cjs.js'

// https://vitejs.dev/config/
export default defineConfig({
  base: isPro ? '/admin/' : './',
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
    AutoImport({ //element组件按需加载
      imports: ['vue', 'vue-i18n', 'vue-router', 'vuex'],
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      resolvers: [
        //sass按需加载
        ElementPlusResolver({
          importStyle: "sass"
        }),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        Icons({
          autoInstall: true,
        }),
      ],
    }),
    viteMockServe({
      supportTs: false,
      logger: false,
      mockPath: "./src/mock/"  //你自己创建的mock文件夹路径
    })
  ],
  // server: {
  //   proxy: {
  //     '/vue-admin': {
  //       target: 'http://124.222.43.123',
  //       changeOrigin: true,
  //     }
  //   }
  // }
})
