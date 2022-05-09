<!--
fuck，本来想优雅的使用extends扩展 ElTable，增加一个exportData方法，但是Element-plus报错了，自己写个组件继承是ok的，ElTable抽风了。
<script>
import { ElTable } from 'element-plus'
export default {
  extends: ElTable
}
</script>

表格导出依赖： npm install --save xlsx 

先麻烦点，把功能先弄出来
-->
<template>
  <el-table :bind="$attrs">
    <slot></slot>
  </el-table>
</template>
<script setup>
import FileSaver from 'file-saver'
import { utils, write, writeFile } from 'xlsx'
let $el = null
let instance = getCurrentInstance()
onMounted(() => {
  $el = instance.vnode.el
})
const exportData = (fileName = 'exportSheet') => {
  let wb = utils.table_to_book($el)
  writeFile(wb, `${fileName}.xlsx`);

  //或者 npm install file-saver
  // let wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
  // try {
  //   FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${fileName}.xlsx`)
  // } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
  // return wbout
}

defineExpose({ exportData })
</script>