import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { setTitle } from '@/libs/utils'

//菜单路由，后续路由优化需后台接口返回，拆分成routers.js(通用的) 和 menu.js（有权限的）
import routes from './routers'


let router = createRouter({
  routes,
  history: createWebHistory()
})

//TODO这边需处理路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(to => {
  //设置浏览器窗口显示的title
  setTitle(to, router.currentRoute.value)
  NProgress.done()
  window.scrollTo(0, 0)
})

export default router