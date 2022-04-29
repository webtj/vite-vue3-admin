import { createI18n } from 'vue-i18n'
import { getNavigatorLang } from '@/libs'

//自定义国际化
import customEnUs from './lang/en-Us'
import customZhCn from './lang/zh-CN'
//ElementPlus 国际化
import localeZH from 'element-plus/lib/locale/lang/zh-cn'
import localeEN from 'element-plus/lib/locale/lang/en'

//获取浏览器当前语言环境
let locale = getNavigatorLang()
const i18n = createI18n({
  locale,
  messages: {
    'zh-CN': Object.assign(customZhCn, localeZH),
    'en-US': Object.assign(customEnUs, localeEN),
  }
})

export default i18n