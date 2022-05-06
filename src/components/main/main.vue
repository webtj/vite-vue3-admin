<template>
  <el-container class="main">
    <el-aside class="left-sider" :style="{overflow:'hidden'}">
      <!--菜单栏-->
      <side-menu ref="sideMenu" :collapsed="params.collapsed" model="vertical" :menuList="menuList">
        <div class="logo-con">
          <img v-show="!params.collapsed" :src="maxLogo" key="max-logo" />
          <img v-show="params.collapsed" :src="minLogo" key="min-logo" />
        </div>
      </side-menu>
    </el-aside>
    <el-container>
      <!--头部信息-->
      <el-header class="header-con">
        <header-bar :collapsed="params.collapsed" @on-coll-change="handleCollapsedChange">
          <fullscreen v-model="params.isFullScreen"></fullscreen>
          <language style="margin:0 10px"></language>
        </header-bar>
      </el-header>
      <el-main class="main-content-con">
        <el-container class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"></tags-nav>
          </div>
          <el-main class="content-wrapper">
            <router-view v-slot="{ Component }">
              <Transition name="move" mode="out-in">
                <keep-alive :include="cacheList">
                  <component :is="Component" />
                </keep-alive>
              </Transition>
            </router-view>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed, onMounted, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import routers from '@/router/routers'
import config from '@/config'
import { routeEqual } from '@/libs/utils'
import { getNavigatorLang } from '@/libs'
import minLogo from '@/assets/images/logo/logo-min.jpg'
import maxLogo from '@/assets/images/logo/logo.jpg'
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
// import User from './components/user'
// import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
const store = useStore()
const router = useRouter()
const params = reactive({
  collapsed: false,
  isFullScreen: true
})


const turnToPage = route => {
  let { name, params, query } = {}
  if (typeof route === 'string') name = route
  else {
    name = route.name
    params = route.params
    query = route.query
  }
  router.push({ name, params, query })
}

/**菜单列表 */
const menuList = store.getters['app/menuList']
const handleCollapsedChange = collapsed => params.collapsed = collapsed

/**tagNav **/
const tagNavList = computed(() => store.state.app['tagNavList'])
const cacheList = computed(() => {
  //检查下router配置是否有 notCache标志,做页面缓存，下次打开该标签还保持原来
  const list = ['ParentView', ...tagNavList.length ? tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
  return list
})
const handleClick = item => turnToPage(item)
const handleCloseTag = (remainList, type, route) => {
  if (type !== 'others') {
    if (type === 'all') {
      turnToPage(config.homeName)
    } else {
      if (routeEqual(router.currentRoute.value, route)) {
        store.commit('app/closeTag', route)
      }
    }
  }
  //navTagList重新复制
  store.commit('app/setTagNavList', remainList)
}

//监听当前路由变化，对tagNavList进行操作
watch(router.currentRoute, newRoute => {
  const { name, query, params, meta } = newRoute
  //增加tag到store和localStorage
  store.commit('app/addTag', {
    route: { name, params, query, meta },
    type: 'push'
  })
  //同步更新面包屑
  store.commit('app/setBreadCrumb', newRoute)
  store.commit('app/setActiveRoutePath', newRoute.path)
})

onMounted(() => {
  /**初始化tag标签列表**/
  store.commit('app/setTagNavList')
  store.commit('app/setHomeRoute', routers)
  // /**获取当前激活的路由，并添加到tagNavList中**/
  const { name, query, params, meta } = router.currentRoute.value
  store.commit('app/addTag', {
    route: { name, params, query, meta }
  })
  store.commit('app/setBreadCrumb', router.currentRoute.value)
  if (!Array.from(tagNavList.value).find(item => item.name === router.currentRoute.value.name)) {
    router.push({
      name: config.homeName
    })
  }
  //设置初始语言
  store.commit('app/setLocal', getNavigatorLang())
  //初始化菜单，使刚进入页面左侧菜单自动打开
  store.commit('app/setActiveRoutePath', router.currentRoute.value.path)
})
</script>

<style lang="scss">
@import "./main.scss";
</style>