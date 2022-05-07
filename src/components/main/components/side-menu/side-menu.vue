<!--后续还要改造，目前写死为三层，后续优化为递归组件-->
<template>
  <div class="layout-sider">
    <div class="side-menu-wrapper">
      <slot></slot>
      <el-menu class="el-menu-sider" :collapse="collapsed" unique-opened :default-active="activeRoute">
        <template v-for="item in menuList">
          <template v-if="item.children">
            <el-sub-menu :index="item.path" :key="item.name">
              <template #title>
                <e-icon :type="item.icon" v-if="item.icon"></e-icon>
                <span>{{ showTitle(item) }}</span>
              </template>
              <template v-for="sub in item.children">
                <el-sub-menu v-if="sub.children" :index="`${item.path}/${sub.path}`" :key="sub.name">
                  <template #title>
                    <e-icon :type="sub.icon" v-if="sub.icon"></e-icon>
                    <span>{{ showTitle(sub) }}</span>
                  </template>
                  <el-menu-item v-for="(threeItem, i) in sub.children" :key="i"
                    :index="`${item.path}/${sub.path}/${threeItem.path}`"
                    @click.native="gotoPage(threeItem.name, threeItem)">
                    <e-icon :type="threeItem.icon" v-if="threeItem.icon"></e-icon>
                    <template #title>{{ showTitle(threeItem) }}</template>
                  </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="`${item.path}/${sub.path}`" :key="sub.name"
                  @click.native="gotoPage(sub.name, sub)">
                  <e-icon :type="sub.icon" v-if="sub.icon"></e-icon>
                  <template #title>{{ showTitle(sub) }}</template>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="item.path" :key="item.name" @click.native="gotoPage(`${item.name}`, item)">
              <e-icon :type="item.icon" v-if="item.icon"></e-icon>
              <template #title>{{ showTitle(item) }}</template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { showTitle } from '@/libs/utils'
import Main from '_c/main'
import EmptyComponent from '_c/empty'
const store = useStore()
const router = useRouter()
const activeRoute = computed(() => store.state.app.activeRoutePath)
defineProps({
  menuList: {
    type: Array,
    default() {
      return []
    }
  },
  collapsed: {
    type: Boolean
  },
  activeName: {
    type: String,
    default: ''
  },
  openNames: {
    type: Array,
    default: () => []
  }
})

const gotoPage = (name, item) => {
  store.commit('app/setShowIframe', false)
  store.commit('app/setIframeUrl', '')
  if (item.target == '_blank' && item.href) {
    window.open(item.href, '_blank');
  } else if (item.target == '_self' && item.href) {
    store.commit('app/setShowIframe', true)
    store.commit('app/setIframeUrl', item.href)
  } else {
    router.push({ name })
  }
}
</script>

<style lang="scss">
@import "./side-menu.scss";
</style>