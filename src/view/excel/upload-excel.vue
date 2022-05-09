<template>
  <el-card>
    <template #header>
      <span>Excel转数据</span>
      <div class="export">
        <el-upload class="upload-demo" action="#" :limit="1" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
          <el-button type="primary" size="small" :loading="uploadLoading" @click="initUpload">上传Excel</el-button>
        </el-upload>
      </div>
    </template>
    <el-alert type="success" title="可读取Excel转换成数据，上传excel不建议太大，浏览器内存会崩溃"></el-alert>
    <el-alert type="success" title="excel每列 名称和key用-分割，例如：姓名-name 日期-date"></el-alert>
    <el-row :gutter="20" class="jsonBody" v-loading="uploadLoading">
      <el-col :span="12">
        <el-card>
          <template #header><span>解析表头数据</span></template>
          <json-viewer :value="$data.tableTitle" copyable expanded :expand-depth="2"></json-viewer>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header><span>解析信息体数据</span></template>
          <json-viewer :value="$data.tableData" copyable expanded :expand-depth="2"></json-viewer>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <template #header><span>数据转el-table表格</span></template>
          <el-table :data="$data.tableData" style="width: 100%">
            <template v-for="item in $data.tableTitle">
              <el-table-column :prop="item.key" :label="item.title">
              </el-table-column>
            </template>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>
<script setup>
import excel from '@/libs/excel'
let uploadLoading = ref(false)
let progressPercent = ref(0)
let showProgress = ref(false)
let showRemoveFile = ref(false)
let file = reactive({
  name: ''
})
let tableLoading = ref(false)

let $data = reactive({
  tableTitle: [],
  tableData: []
})

const initUpload = () => {
  file = { name: '' }
  showProgress.value = false
  $data.tableTitle = []
  $data.tableData = []
}

const uploadExcel = () => {

}

const handleBeforeUpload = file => {
  const fileExt = file.name.split('.').pop().toLocaleLowerCase()
  if (fileExt === 'xlsx' || fileExt === 'xls') {
    readFile(file)
    file = file
  } else {
    ElMessage.error('请选择后缀为.xlsx或者.xls的EXCEL文件')
  }
  return false
}

const readFile = file => {
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadstart = e => {
    uploadLoading.value = true
    tableLoading.value = true
    showProgress.value = true
  }
  reader.onprogress = e => {
    progressPercent.value = Math.round(e.loaded / e.total * 100)
  }
  reader.onerror = e => {
    ElMessage.error('文件读取出错')
  }
  reader.onload = e => {
    ElMessage.success('文件读取成功')
    const { header, results } = excel.readFile(e.target.result, 'array')
    const tableTitle = header.map(item => { return { title: item.split('-')[0], key: item.split('-')[1] || item } })
    let tabledata = []
    results.map(item => {
      let keys = Object.keys(item)
      let newkeys = keys.map(k => (k.split('-')[1] || k.split('-')[0]))
      let obj = {}
      keys.forEach((k, index) => {
        obj[newkeys[index]] = item[k]
      })
      tabledata.push(obj)
    })
    //TODO : 这边result还需要转换
    $data.tableData = tabledata
    $data.tableTitle = tableTitle
    uploadLoading.value = false
    tableLoading.value = false
    showRemoveFile.value = true
  }
}
</script>
<style lang="scss">
.export {
  float: right;
}

.jsonBody {
  margin: 10px 0;

  .el-card {
    margin: 10px 0;

    .el-card__body {
      height: 350px;
      overflow: auto;
    }
  }
}
</style>