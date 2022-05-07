import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import config from '@/config'
import { getToken, setToken } from '@/libs'
import { setTitle, canTurnTo } from '@/libs/utils'

//菜单路由，后续路由优化需后台接口返回，拆分成routers.js(通用的) 和 menu.js（有权限的）
import routes from './routers'

let router = createRouter({
  routes,
  history: createWebHistory()
})

const { loginName } = config
const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}
//TODO这边需处理路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = getToken()
  const gotoLogin = () => setToken('') & next({ name: loginName })
  if (!token) {
    //没有token或token过期
    if (to.name === loginName) next()
    else gotoLogin()
  } else {
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.userAccess, next)
    } else {
      store.dispatch('user/getUserInfo').then(user => {
        turnTo(to, user.access, next)
      }).catch(() => gotoLogin())
    }
  }
})

router.afterEach(to => {
  //设置浏览器窗口显示的title
  setTitle(to, router.currentRoute.value)
  NProgress.done()
  window.scrollTo(0, 0)
})

export default router