<template>
  <div class="custom-bread-crumb">
    <el-breadcrumb separator="/" :style="{ fontSize: `${fontSize}px` }">
      <el-breadcrumb-item v-for="item in list" :to="item.name == config.homeName ? { path: item.path } : ''"
        :key="`bread-crumb-${item.name}`">
        <e-icon :type="item.icon || ''" style="margin-right: 4px;"></e-icon>
        {{ showTitle(item) }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script setup>
import { showTitle } from '@/libs/utils'
import config from '@/config'
defineProps({
  list: {
    type: Array,
    default: () => []
  },
  fontSize: {
    type: Number,
    default: 14
  },
  showIcon: {
    type: Boolean,
    default: false
  }
})


</script>
<style lang="sass">
@import './custom-bread-crumb.scss'
</style>
