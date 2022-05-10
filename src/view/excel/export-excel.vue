<template>
  <el-card>
    <template #header>
      <span>数据转Excel</span>
      <div class="export">
        <el-button type="primary" size="small" :loading="exportLoading" @click="exportExcel">转表格</el-button>
      </div>
    </template>
    <el-alert type="success" title="可将下列数据转成excel表格下载"></el-alert>
    <el-row :gutter="20" class="jsonBody" v-loading="exportLoading">
      <el-col :span="12">
        <el-card>
          <template #header><span>表格头信息数据</span></template>
          <json-viewer :value="tableTitle" copyable expanded :expand-depth="2"></json-viewer>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header><span>表格信息体数据</span></template>
          <json-viewer :value="tableData" copyable expanded :expand-depth="2"></json-viewer>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>
<script setup>
import excel from '@/libs/excel'
import { ref } from 'vue'
const exportLoading = ref(false)
const tableTitle = [{
  title: '日期',
  key: 'date'
},
{
  title: '名称',
  key: 'name'
},
{
  title: '地址',
  key: 'address'
}]

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

const exportExcel = () => {
  if (tableData.length) {
    exportLoading.value = true
    const params = {
      title: tableTitle.map(item => item.title),
      key: tableTitle.map(item => item.key),
      data: tableData,
      autoWidth: true,
      filename: '家庭地址'
    }
    excel.export_array_to_excel(params)
    exportLoading.value = false
  }
}

</script>
<style lang="scss">
.export {
  float: right;
}

.jsonBody {
  margin: 10px 0;
  .el-card .el-card__body {
    height: 450px;
    overflow: auto;
  }
}
</style>