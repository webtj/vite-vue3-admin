<template>
  <el-card class="echarts-view">
    <template #header>
      <span>echarts图表</span>
      <div style="float: right;">
        <el-button @click="changedata">变换数据</el-button>
      </div>
    </template>
    <el-row :gutter="20" style="margin-top: 10px;">
      <el-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <el-card shadow>
          <chart-pie :value="$data.pieData" text="pie饼状图组件"></chart-pie>
        </el-card>
      </el-col>
      <el-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <el-card shadow>
          <chart-bar :value="$data.barData" text="bar柱状图组件" />
        </el-card>
      </el-col>
      <el-col :md="24">
        <el-card shadow>
          <chart :option="$data.commonuseData" text="通用图表组件" />
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>
<script setup>
import { ChartPie, ChartBar, Chart } from '_c/charts'
import { reactive } from 'vue';
const $data = reactive({
  pieData: [
    { value: 335, name: '直接访问' },
    { value: 310, name: '邮件营销' },
    { value: 234, name: '联盟广告' },
    { value: 135, name: '视频广告' },
    { value: 1548, name: '搜索引擎' }
  ],
  barData: {
    Mon: 13253,
    Tue: 34235,
    Wed: 23453,
    Thu: 34523,
    Fri: 23453,
    Sat: 34523,
    Sun: 34523
  },
  commonuseData: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      top: '3%',
      left: '1.2%',
      right: '1%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '运营商/网络服务',
        type: 'line',
        stack: '总量',
        areaStyle: {
          normal: {
            color: '#2d8cf0'
          }
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '银行/证券',
        type: 'line',
        stack: '总量',
        areaStyle: {
          normal: {
            color: '#10A6FF'
          }
        },
        data: [257, 358, 278, 234, 290, 330, 310]
      },
      {
        name: '游戏/视频',
        type: 'line',
        stack: '总量',
        areaStyle: {
          normal: {
            color: '#0C17A6'
          }
        },
        data: [379, 268, 354, 269, 310, 478, 358]
      },
      {
        name: '餐饮/外卖',
        type: 'line',
        stack: '总量',
        areaStyle: {
          normal: {
            color: '#4608A6'
          }
        },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '快递/电商',
        type: 'line',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        areaStyle: {
          normal: {
            color: '#398DBF'
          }
        },
        data: [820, 645, 546, 745, 872, 624, 258]
      }
    ]
  }
})

const changedata = () => {
  $data.pieData = [
    { value: 999, name: '你好' },
    { value: 123, name: '你是谁' },
    { value: 456, name: '哈哈哈' }
  ]

  $data.barData = {
    Mon: 88888,
    Tue: 77777,
    Wed: 66666,
    Thu: 55555,
    Fri: 44444,
    Sat: 33333,
    Sun: 22222
  }

  $data.commonuseData.series = [
    {
      name: '运营商/网络服务',
      type: 'line',
      stack: '总量',
      areaStyle: {
        normal: {
          color: '#2d8cf0'
        }
      },
      data: [0, 132, 101, 70, 101, 132, 0]
    }]
}
</script>