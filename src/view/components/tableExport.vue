<template>
  <el-card>
    <template #header>
      <span>支持数据导出的表格</span>
      <div class="export">
        <el-button type="primary" size="small" @click="exportData">导出</el-button>
      </div>
    </template>
    <el-alert type="success" title="组件写的比较拉垮，增加了全局组件<el-table>，在el-table基础上增加了exportData方法">
    </el-alert>
    <el-alert type="success" title="本来想继承ElTable组件进行二次封装的，过程有点问题，用$attrs和slot透传暂时解决，将就用吧">
    </el-alert>
    <el-alert type="success" title="只需将<el-table>改为<export-table> 其他所有属性事件方法与<el-table>保持一致">
    </el-alert>

    <export-table :data="tableData" style="width: 100%;margin-top:20px" ref="reportTable">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </export-table>

  </el-card>
</template>

<script setup>
import { ref } from "vue"
const reportTable = ref(null)
const exportData = () => reportTable.value.exportData('文件的名称')

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
<style lang="sass">
.export
  float: right
</style>