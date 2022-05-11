<template>
  <div ref="chartDom" class="charts chart-common-use" :style="style"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import tdTheme from './theme.json'
import { on, off } from '@/libs'
echarts.registerTheme('tdTheme', tdTheme)
const props = defineProps({
  option: {
    type: Object,
    default: () => { }
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
    chartInstance = echarts.init(chartDom.value, 'tdTheme')
    chartInstance.setOption(props.option)
  })
}
//监听参数变化，销毁实例并重新初始化
watch(props, newProps => chartInstance?.dispose() & initOption(newProps))
onMounted(() => initOption(props)) & on(window, 'resize', chartResize)
onBeforeUnmount(() => off(window, 'resize', chartResize))
</script>
