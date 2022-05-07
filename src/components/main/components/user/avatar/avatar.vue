<template>
  <div class="avatar-area">
    <el-avatar v-if="src" :src="src" size="small"></el-avatar>
    <el-avatar v-else :icon="UserFilled" size="small"></el-avatar>
  </div>
</template>
<script setup>
import { UserFilled } from '@element-plus/icons-vue'
defineProps({
  src: {
    type: String,
    default: ''
  }
})
</script>