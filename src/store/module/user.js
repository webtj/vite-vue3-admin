/**
 * access: 该登录用户的权限后续方便扩展
 *        处理1：直接使用routers配置的路由列表，不支持动态，则需将用户的access和路由上的access进行过滤
 *        处理2：如果菜单为接口返回，则直接返回该access的菜单即可
 */
export default {
  namespaced: true,
  state: () => ({
    access: '',
  }),
  mutations: {},
  actions: {},
  getters: {}
}