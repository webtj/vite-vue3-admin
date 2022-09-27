import { $http } from '@/libs/http/request.js'

//登录的接口
export const login = params => {
  return $http('/user/login', 'post', params)
}

//获取用户详细信息
export const getUserInfo = params => {
  return $http('/user/getUserInfo', 'post', params)
}

export const logout = params => {
  return $http('/user/logout', 'post', params)
}