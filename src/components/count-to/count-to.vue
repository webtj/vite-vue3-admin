<template>
  <div class="count-to-wrapper">
    <slot name="left"></slot>
    <p class="content-outer">
      <span :class="['count-to-count-text', countClass]" :id="counterId">{{ init }}</span>
      <i :class="['count-to-props.unit-text', unitClass]">{{ unitTextValue }}</i>
    </p>
    <slot name="right" />
  </div>
</template>

<script setup>
import CountUp from 'countup'
import { computed, onMounted, reactive, watch, ref } from 'vue'
const props = defineProps({
  init: {
    type: Number,
    default: 0
  },
  /**
   * @description 起始值，即动画开始前显示的数值
   */
  startVal: {
    type: Number,
    default: 0
  },
  /**
   * @description 结束值，即动画结束后显示的数值
   */
  end: {
    type: Number,
    required: true
  },
  /**
   * @description 保留几位小数
   */
  decimals: {
    type: Number,
    default: 0
  },
  /**
   * @description 分隔整数和小数的符号，默认是小数点
   */
  decimal: {
    type: String,
    default: '.'
  },
  /**
   * @description 动画持续的时间，单位是秒
   */
  duration: {
    type: Number,
    default: 2
  },
  /**
   * @description 动画延迟开始的时间，单位是秒
   */
  delay: {
    type: Number,
    default: 0
  },
  /**
   * @description 是否禁用easing动画效果
   */
  uneasing: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否使用分组，分组后每三位会用一个符号分隔
   */
  usegroup: {
    type: Boolean,
    default: false
  },
  /**
   * @description 用于分组(usegroup)的符号
   */
  separator: {
    type: String,
    default: ','
  },
  /**
   * @description 是否简化显示，设为true后会使用unit单位来做相关省略
   */
  simplify: {
    type: Boolean,
    default: false
  },
  /**
   * @description 自定义单位，如[3, 'K+'], [6, 'M+']即大于3位数小于6位数的用k+来做省略
   *              1000即显示为1K+
   */
  unit: {
    type: Array,
    default() {
      return [[3, 'K+'], [6, 'M+'], [9, 'B+']]
    }
  },
  countClass: {
    type: String,
    default: ''
  },
  unitClass: {
    type: String,
    default: ''
  }
})

let counter = null
let unitTextValue = ref('')
const counterId = computed(() => `count_to_${Math.random()}`)
const getHandleVal = (val, len) => {
  return {
    endVal: parseInt(val / Math.pow(10, props.unit[len - 1][0])),
    unitText: props.unit[len - 1][1]
  }
}

const transformValue = val => {
  let len = props.unit.length
  let res = {
    endVal: 0,
    unitText: ''
  }
  if (val < Math.pow(10, props.unit[0][0])) res.endVal = val
  else {
    for (let i = 1; i < len; i++) {
      if (val >= Math.pow(10, props.unit[i - 1][0]) && val < Math.pow(10, props.unit[i][0])) res = getHandleVal(val, i)
    }
  }
  if (val > Math.pow(10, props.unit[len - 1][0])) res = getHandleVal(val, len)
  return res
}

const getValue = val => {
  let res = 0
  if (props.simplify) {
    let { endVal, unitText } = transformValue(val)
    unitTextValue.value = unitText
    res = endVal
  } else {
    res = val
  }
  return res
}

onMounted(() => {
  let endVal = getValue(props.end)
  counter = new CountUp(counterId.value, props.startVal, endVal, props.decimals, props.duration, {
    useEasing: !props.uneasing,
    useGrouping: props.useGroup,
    separator: props.separator,
    decimal: props.decimal
  })

  setTimeout(() => {
    if (!counter.error) counter.start()
  }, props.delay)
})

watch(() => props.end, newVal => {
  let endVal = getValue(newVal)
  counter.update(endVal)
})
</script>
<style lang="sass">
@import './count-to.scss'
</style>
