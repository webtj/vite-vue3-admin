<template>
  <!--封装下element-plus图标，让书写和element-ui一致-->
  <el-icon v-bind="$attrs" :style="{verticalAlign:align}">
    <component :is="type" />
  </el-icon>
</template>

<script setup>

defineProps({
  type: {
    type: String,
    require: true
  },
  align: {
    type: String,
    default: 'middle'
  }
})

</script>

<style>
</style>