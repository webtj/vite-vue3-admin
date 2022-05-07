import { getToken, setToken } from '@/libs'
import { login, getUserInfo, logout } from '@/api/user'
/**
 * access: 该登录用户的权限后续方便扩展
 *        处理1：直接使用routers配置的路由列表，不支持动态，则需将用户的access和路由上的access进行过滤
 *        处理2：如果菜单为接口返回，则直接返回该access的菜单即可
 */
export default {
  namespaced: true,
  state: () => ({
    token: getToken(),
    access: '',
    userName: '',
    userId: '',
    userAvatar: '',
    hasGetInfo: false,
  }),
  mutations: {
    setUserId(state, id) {
      state.userId = id
    },
    setUserName(state, name) {
      state.userName = name
    },
    setAvatar(state, avatar) {
      state.userAvatar = avatar
    },
    setAccess(state, access) {
      state.access = access
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    },
  },
  actions: {
    //执行登录操作接口
    handleLogin({ commit }, params) {
      return new Promise((resovle, reject) => {
        login(params).then(res => {
          //设置token
          commit('setToken', res.token)
          resovle()
        }).catch(error => reject(error))
      })
    },
    // 获取用户相关信息
    getUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo({ token: state.token }).then(res => {
          commit('setAvatar', res.data.avatar)
          commit('setUserName', res.data.name)
          commit('setUserId', res.data.id)
          commit('setAccess', res.data.access)
          commit('setHasGetInfo', true)
          resolve(res.data)
        }).catch(err => reject(err))
      })
    },
    //退出登录
    handleLogout({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout({ token: state.token }).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => reject(err))
        // 不适用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    }
  },
  getters: {}
}