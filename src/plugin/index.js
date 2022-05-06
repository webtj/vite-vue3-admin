/**element-plus 全部导入 */
import ElementPlus from 'element-plus'
/**vue router */
import router from '@/router'
/**vuex */
import store from '@/store'
/**i18n */
import i18n from '@/locale'
/**json可视化 */
import JsonViewer from 'vue-json-viewer'
/**带有导出功能的表格 */
import ExportTable from '_c/tables/export-table'

const installPlugin = app => {
  app.use(ElementPlus).use(router).use(store).use(i18n).use(JsonViewer)
  app.component('exportTable', ExportTable)
}

export default installPlugin