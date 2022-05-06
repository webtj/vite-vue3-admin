<template>
  <div>
    <el-row :gutter="14">
      <el-col :span="6">
        <el-card>
          <template #header>
            <span>
              <e-icon type="TrendCharts"></e-icon>
              基础用法
            </span>
          </template>
          <el-row type="flex" justify="center" align="middle" class="countto-page-el-row">
            <div class="count-to-con">
              <count-to :end="1234" />
            </div>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6" class="padding-left-10">
        <el-card>
          <template #header>
            <e-icon type="TrendCharts"></e-icon>
            添加左右文字
          </template>
          <el-row type="flex" justify="center" align="middle" class="countto-page-el-row">
            <div class="count-to-con">
              <count-to :end="785785">
                <template #left>
                  <span>左先生&nbsp;</span>
                </template>
                <template #right>
                  <span>&nbsp;右小姐</span>
                </template>
              </count-to>
            </div>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6" class="padding-left-10">
        <el-card>
          <template #header>
            <e-icon type="TrendCharts"></e-icon>
            男人最爱的<span style="color:#67C23A;font-weight:bold">绿色</span>
          </template>
          <el-row type="flex" justify="center" align="middle" class="countto-page-el-row">
            <div class="count-to-con">
              <count-to :end="2534" count-class="count-text" unit-class="unit-class">
                <template #left>
                  <span class="slot-text">你被绿了&nbsp;</span>
                </template>
                <template #right>
                  <span class="slot-text">&nbsp;次</span>
                </template>
              </count-to>
            </div>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6" class="padding-left-10">
        <el-card>
          <template #header>
            <e-icon type="TrendCharts"></e-icon>
            设置数据格式
          </template>
          <el-row type="flex" justify="center" align="middle" class="countto-page-el-row">
            <div class="count-to-con">
              <count-to :end="2534" count-class="count-text" unit-class="unit-class" :decimals="2">
                <template #left>
                  <span class="slot-text">月薪高达&nbsp;</span>
                </template>
                <template #right>
                  <span class="slot-text">&nbsp;元</span>
                </template>
              </count-to>
            </div>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="14" style="margin-top: 14px;">
      <el-col :span="6" class="padding-left-10">
        <el-card>
          <template #header>
            <e-icon type="TrendCharts"></e-icon>
            可异步更新数据
          </template>
          <el-row type="flex" justify="center" align="middle" class="countto-page-el-row">
            <div class="count-to-con">
              <count-to :end="asynEndVal" count-class="count-text" unit-class="unit-class">
                <template #left>
                  <span class="slot-text">未读&nbsp;</span>
                </template>
                <template #right>
                  <span class="slot-text">&nbsp;条消息</span>
                </template>
              </count-to>
            </div>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <e-icon type="TrendCharts"></e-icon>
            转换单位简化数据
          </template>
          <el-row type="flex" justify="center" align="middle" class="countto-page-el-row">
            <div class="count-to-con">
              <count-to :simplify="true" :end="2534" count-class="count-text" unit-class="unit-class">
                <template #left>
                  <span class="slot-text">毫不客气的讲，我的工资&nbsp;</span>
                </template>
              </count-to>
            </div>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6" class="padding-left-10">
        <el-card>
          <template #header>
            <e-icon type="TrendCharts"></e-icon>
            自定义单位
          </template>
          <el-row type="flex" justify="center" align="middle" class="countto-page-el-row">
            <div class="count-to-con">
              <count-to :simplify="true" :unit="unit" :end="2345" count-class="count-text" unit-class="unit-class">
                <template #left>
                  <span class="slot-text">2345&nbsp;<e-icon type="ArrowRight"></e-icon>&nbsp;</span>
                </template>
              </count-to>
              <count-to :simplify="true" :unit="unit" :end="34567" count-class="count-text" unit-class="unit-class">
                <template #left>
                  <span class="slot-text">34567&nbsp;<e-icon type="ArrowRight"></e-icon>&nbsp;</span>
                </template>
              </count-to>
              <count-to :simplify="true" :unit="unit" :end="456789" count-class="count-text" unit-class="unit-class">
                <template #left>
                  <span class="slot-text">456789&nbsp;<e-icon type="ArrowRight"></e-icon>&nbsp;</span>
                </template>
              </count-to>
            </div>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <e-icon type="TrendCharts"></e-icon>
            综合使用
          </template>
          <el-row type="flex" justify="center" align="middle" class="countto-page-el-row">
            <div class="count-to-con">
              <count-to :delay="500" :simplify="true" :unit="unit2" :end="integratedEndVal" count-class="count-text"
                unit-class="unit-class">
                <template #left>
                  <span class="slot-text">常年ctrl+cv {{ integratedEndVal }}&nbsp;<e-icon type="ArrowRight"></e-icon>
                    &nbsp;</span>
                </template>
                <template #right>
                  <span class="slot-text">&nbsp;次</span>
                </template>
              </count-to>
            </div>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import CountTo from '_c/count-to'
const end = ref(0)
const unit = reactive([[3, '千多'], [4, '万多'], [5, '十多万']])
const unit2 = reactive([[1, '十多'], [2, '百多'], [3, '千多'], [4, '万多'], [5, '十万多'], [6, '百多万'], [7, '千多万'], [8, '亿多']])
const asynEndVal = ref(487)
const integratedEndVal = ref(5)
const init = () => {
  setInterval(() => {
    asynEndVal.value += parseInt(Math.random() * 20)
    integratedEndVal.value += parseInt(Math.random() * 30)
  }, 1000)
}

onMounted(() => init())
</script>

<style lang="scss">
$baseColor: #67c23a;
.countto-page-el-row {
  height: 200px;
}
.count-to-con {
  display: block;
  // height: 100%;
  text-align: center;
  overflow: auto;
}
.count-text {
  font-size: 30px;
  color: $baseColor;
}
.slot-text {
  font-size: 20px;
}
.unit-class {
  font-size: 30px;
  color: $baseColor;
}
</style>
