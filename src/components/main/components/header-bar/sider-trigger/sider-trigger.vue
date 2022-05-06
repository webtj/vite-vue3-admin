<template>
  <a @click="handleChange" type="text" class="sider-trigger-a">
    <e-icon :type="icon" :size="size"></e-icon>
  </a>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  collapsed: Boolean,
  size: {
    type: Number,
    default: 26
  }
})
const emit = defineEmits(['on-change'])

/**折叠和放开图标变化*/
const icon = computed(() => {
  return props.collapsed ? 'Expand' : 'Fold'
})

function handleChange() {
  emit('on-change', !props.collapsed)
}

</script>
<style lang="scss">
@import "./sider-trigger.scss";
</style>
