import { createRouter, createWebHistory } from 'vue-router'

//菜单路由，后续路由优化需后台接口返回，拆分成routers.js(通用的) 和 menu.js（有权限的）
import routes from './routers'

let router = createRouter({
  routes,
  history: createWebHistory()
})

//TODO这边需处理路由守卫



export default router