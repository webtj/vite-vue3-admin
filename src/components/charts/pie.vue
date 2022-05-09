<template>
  <div ref="chartDom" class="charts chart-pie" :style="style"></div>
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
      height: '300px'
    }
  }
})
const chartDom = ref(null)
const chartResize = () => chartInstance?.resize()
let chartInstance = null
const initOption = props => {
  nextTick(() => {
    let legend = props.value.map(_ => _.name)
    let option = {
      title: {
        text: props.text,
        subtext: props.subtext,
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: legend
      },
      series: [
        {
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: props.value,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
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
