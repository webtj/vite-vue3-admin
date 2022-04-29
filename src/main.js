import { createApp } from 'vue'
import App from './App.vue'
import { installPlugin } from './plugin'
import '@/assets/icons/iconfont.css'
const app = createApp(App)
installPlugin(app)
app.mount('#app')