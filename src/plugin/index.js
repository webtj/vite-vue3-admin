/**element-plus 全部导入 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
/**vue router */
import router from '@/router'
/**全局引入icon*/
import * as ElIconModules from '@element-plus/icons-vue'
/**自定义icon组件 */
import vIcon from '_c/icons'
import CustomIcon from '_c/custom-icons'
/**vuex */
import store from '@/store'
/**i18n */
import i18n from '@/locale'
/**json可视化 */
import JsonViewer from 'vue-json-viewer'

import ExportTable from '_c/tables/export-table'

export const installPlugin = app => {
  app.use(ElementPlus).use(router).use(store).use(i18n).use(JsonViewer)

  // 统一注册Icon图标
  for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
      const item = ElIconModules[iconName]
      app.component(iconName, item)
    }
  }
  //注册自定义组件
  app.component('vIcon', vIcon)
  app.component('cIcon', CustomIcon)
  app.component('exportTable', ExportTable)
}