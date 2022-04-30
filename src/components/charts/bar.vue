<template>
  <div ref="chartDom" class="charts chart-bar1" :style="style"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import tdTheme from './theme.json'
import { on, off } from '@/libs'
echarts.registerTheme('tdTheme', tdTheme)
const props = defineProps({
  value: {
    type: Object,
    default: () => { }
  },
  text: {
    type: String,
    default: ''
  },
  subtext: {
    type: String,
    default: ''
  },
  style: {
    type: Object,
    default: {
      height: '300px',
    }
  }
})
const chartDom = ref(null)
const chartResize = () => chartInstance?.resize()
let chartInstance = null
const initOption = props => {
  nextTick(() => {
    let xAxisData = Object.keys(props.value)
    let seriesData = Object.values(props.value)
    let option = {
      title: {
        text: props.text,
        subtext: props.subtext,
        x: 'center'
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: seriesData,
        type: 'bar'
      }]
    }
    chartInstance = echarts.init(chartDom.value, 'tdTheme')
    chartInstance.setOption(option)
  })
}
//监听参数变化，销毁实例并重新初始化
watch(props, newProps => chartInstance?.dispose() & initOption(newProps))
onMounted(() => initOption(props)) & on(window, 'resize', chartResize)
onBeforeUnmount(() => off(window, 'resize', chartResize))
</script>
