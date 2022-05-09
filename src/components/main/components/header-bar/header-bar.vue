<template>
  <div class="header-bar">
    <sider-trigger :collapsed="collapsed" @on-change="handleCollpasedChange"></sider-trigger>
    <custom-bread-crumb show-icon :list="breadCrumbList"></custom-bread-crumb>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import siderTrigger from './sider-trigger'
import customBreadCrumb from './custom-bread-crumb'
defineProps({
  collapsed: Boolean
})
const emit = defineEmits(['on-coll-change'])
const store = useStore()

//面包屑列表
const breadCrumbList = computed(() => store.state.app['breadCrumbList'])

const handleCollpasedChange = (collapsed) => {
  emit('on-coll-change', collapsed)
}
</script>

<style lang="scss">
@import "./header-bar.scss";
</style>