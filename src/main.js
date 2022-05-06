import { createApp } from 'vue'
import App from './App.vue'
import installPlugin from './plugin'
import useIcons from './plugin/icons'
import importDirective from './directive'
const app = createApp(App)
/** 加载图标 */
useIcons(app)
/** 加载扩展插件 */
installPlugin(app)
/** 加载指令 */
importDirective(app)
app.mount('#app')