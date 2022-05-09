<template>
  <component :theme="theme" :size="size" :strokeWidth="strokeWidth" :is="innerName" :fill="innerColor"
    class="parkicon" />
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    require: true
  },
  size: {
    type: [Number, String],
    default: 16
  },
  color: {
    type: [String, Array],
    default: '#5c6b77',
  },
  theme: {
    type: String,
    default: 'outline',
  },
  strokeWidth: {
    type: Number,
    default: 3,
  }
});

const innerColor = computed(() => {
  let _type = Object.prototype.toString.call(props.color).match(/^\[object\s(.*)\]$/)[1]
  return _type === 'String' ? [props.color] : props.color
})

const innerName = computed(() => {
  return `park-${props.type}`
})
</script>

<style lang="scss">
.parkicon {
  vertical-align: middle;
}
</style>
