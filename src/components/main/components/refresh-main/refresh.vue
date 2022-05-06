<template>
  <div class="refreshMain">
    <el-tooltip effect="dark" content="刷新窗口" placement="bottom">
      <e-icon type='Refresh' :size="23" @click.native="handleRefresh"></e-icon>
    </el-tooltip>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
const store = useStore()
const handleRefresh = () => {
  store.commit('app/setRefreshKey')
}
</script>
<style lang="scss">
.refreshMain {
  margin-left: 10px;

  i {
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>