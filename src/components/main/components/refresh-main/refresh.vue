<template>
  <div class="refreshMain">
    <el-tooltip effect="dark" :content="$t('navbar.refresh')" placement="bottom">
      <e-icon type='Refresh' :size="20" @click.native="handleRefresh"></e-icon>
    </el-tooltip>
  </div>
</template>
<script setup>
const store = useStore()
const handleRefresh = () => {
  store.commit('app/setRefreshKey')
}
</script>
<style lang="scss">
.refreshMain {
  margin: 0 5px;

  i {
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>