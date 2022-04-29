<template>
  <i :class="`iconfont icon-${type}`" :style="styles"></i>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#5c6b77'
  },
  size: {
    type: Number,
    default: 16
  }
})

const styles = computed(() => {
  return {
    fontSize: `${props.size}px`,
    color: props.color
  }
})
</script>

<style lang="scss">
.iconfont {
  vertical-align: middle;
}
</style>
