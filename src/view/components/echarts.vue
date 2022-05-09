<template>
  <el-card class="echarts-view">
    <template #header>
      <span>echarts图表</span>
      <div style="float: right;">
        <el-button @click="changedata">变换数据</el-button>
      </div>
    </template>
    <el-row :gutter="20" style="margin-top: 10px;">
      <el-col :span="24" style="margin-bottom: 20px;">
        <el-link type="primary" href="https://echarts.apache.org/zh/theme-builder.html#acc-theme-body" target="_blank">
          自定义主题</el-link>&nbsp;
        <el-link type="primary" href="https://echarts.apache.org/examples/zh/index.html" target="_blank">
          官网示例</el-link>
      </el-col>
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
    { value: 335, name: '早晨起来' },
    { value: 310, name: '拥抱太阳' },
    { value: 234, name: '让身体充满' },
    { value: 135, name: '灿烂的阳光' },
    { value: 1548, name: '慢慢的正能量' }
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
    title: {
      text: '通用charts组件'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  }
})

const changedata = () => {
  $data.pieData = [
    { value: 123, name: '嘴角向上' },
    { value: 456, name: '蒸蒸日上' },
    { value: 789, name: '嘴角向下' },
    { value: 222, name: '会迷失方向' }
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
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
}
</script>