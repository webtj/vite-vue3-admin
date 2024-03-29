<template>
  <el-container class="main">
    <el-aside class="left-sider" :style="{ overflow: 'hidden' }">
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
          <refresh-main></refresh-main>
          <language></language>
          <user></user>
        </header-bar>
      </el-header>
      <el-main class="main-content-con">
        <el-container class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"></tags-nav>
          </div>
          <el-main class="content-wrapper">
            <div class="iframeContent" v-if="showIframe" v-loading="iframeLoading">
              <iframe ref="mainIframe" :src="iframeUrl" frameborder="0" width="100%" height="100%"></iframe>
            </div>
            <router-view v-slot="{ Component }" v-else>
              <Transition name="move" mode="out-in">
                <keep-alive :include="cacheList">
                  <component :is="Component" :key="renderKey" />
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
import routers from '@/router/routers'
import config from '@/config'
import { routeEqual } from '@/libs/utils'
import { getNavigatorLang } from '@/libs'
import minLogo from '@/assets/images/logo/logo-mini.svg'
import maxLogo from '@/assets/images/logo/logo.svg'
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
// import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import RefreshMain from './components/refresh-main'
const store = useStore()
const router = useRouter()
const params = reactive({
  collapsed: false,
  isFullScreen: true
})

let iframeLoading = ref(false)
let mainIframe = ref(null)

let renderKey = computed(() => store.state.app['refreshKey'])
let showIframe = computed(() => store.state.app['showIframe'])
let iframeUrl = computed(() => store.state.app['iframeUrl'])

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

const initIframeRoute = (currentRoute) => {
  iframeLoading.value = false
  store.commit('app/setShowIframe', false)
  store.commit('app/setIframeUrl', '')
  if (currentRoute.meta && currentRoute.meta.target == '_self' && currentRoute.meta.href) {
    store.commit('app/setShowIframe', true)
    store.commit('app/setIframeUrl', currentRoute.meta.href)
    nextTick(() => {
      iframeLoading.value = true
      let iframe = mainIframe.value
      if (iframe.attachEvent) {
        iframe.attachEvent("onload", () => {
          iframeLoading.value = false
        })
      } else {
        iframe.onload = () => iframeLoading.value = false
      }
    })
  }
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

  //初始化iframe初始状态
  initIframeRoute(newRoute)
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

  //判断当前是否是iframe,iframe需要打开iframe隐藏route-view
  initIframeRoute(router.currentRoute.value)
})
</script>

<style lang="scss">
@import "./main.scss";
</style>