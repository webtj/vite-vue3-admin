import { getMenuByRouter } from '@/libs/utils'
import routers from '@/router/routers'
import router from '@/router'
import config from '@/config'

import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getTagNavListFromLocalstorage,
  routeEqual,
  routeHasExist,
  needToAddToBar,
  getHomeRoute,
  getNextRoute,
} from '@/libs/utils'

import { localRead, localSave } from '@/libs'

const { homeName } = config

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}

//vue3中的 mapMutations 到底怎么用？
export default {
  namespaced: true,
  state: () => ({
    breadCrumbList: [], //面包屑列表
    tagNavList: [], //标签缓存列表
    homeRoute: {},
    local: localRead('local'),
    activeRoutePath: '/home', //当前激活的菜单
    refreshKey: 0, //刷新键
    showIframe: false, //是否显示iframe
    iframeUrl: '', //iframe地址
  }),
  mutations: {
    setBreadCrumb(state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute(state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    setActiveRoutePath(state, path) {
      state.activeRoutePath = path
    },
    setRefreshKey(state) {
      state.refreshKey = new Date().getTime()
    },
    setShowIframe(state, show) {
      state.showIframe = show
    },
    setIframeUrl(state, url) {
      state.iframeUrl = url
    },
    setTagNavList(state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
      let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    closeTag(state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      closePage(state, route)
    },
    addTag(state, { route, type = 'unshift' }) {
      if (!routeHasExist(state.tagNavList, route) && needToAddToBar(route)) {
        if (type === 'push') state.tagNavList.push(route)
        else {
          if (route.name === homeName) state.tagNavList.unshift(route)
          else state.tagNavList.splice(1, 0, route)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal(state, lang) {
      localSave('local', lang)
      state.local = lang
    },
  },
  actions: {},
  getters: {
    //菜单那列表，根据路由配置去取，后续会对接接口动态路由来控制权限
    menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access)
  }
}