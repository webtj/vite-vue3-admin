import { ElMessage } from 'element-plus'
import HttpRequest from "./axios";
import config from '@/config'
import i18n from '@/locale'
/**
 * 二次封装，可以做什么
 * 1：根据不同的环境设置不同的baseUrl
 * 2: 设置token等头信息
 * 3：多国际站点，可根据浏览器语言匹配不同的url
 * 4：统一的错误码处理
 */
//可根据不同的环境设置不同的url前缀
const { baseUrl, responseMap } = config
const publicUrl = process.env.NODE_ENV === 'development' ? baseUrl.dev : baseUrl.pro
const axios = new HttpRequest(publicUrl)
const { global } = i18n


/**
 * 根据错误码对错误信息做国际化处理
 * @param {接口返回的错误码} code 
 * @returns 
 */
const getErrorMsg = code => {
  let errorKey = `error.${code}`
  let errorMap = global.messages[global.locale]['error']
  if (code in errorMap) return global.t(errorKey)
  else return global.t('error.default')
}

/**
 * 二次封装axios请求，处理业务上接口请求返回
 * @param {*} params 接口请求参数
 * @param {*} url 接口请求地址
 * @param {*} type 接口请求类型
 * @param {*} _options 接口私有的option，例如独立设置头信息等
 * @returns 
 */
export const $http = (url, method = 'get', params = {}, _options = {}) => {
  const bodySet = new Set(['put', 'post', 'patch'])
  method = method.toLocaleLowerCase()
  const key = bodySet.has(method) ? 'data' : 'params'
  let options = {
    url,
    method,
    [key]: params,
  }
  options = Object.assign(options, _options)
  return new Promise((resolve, reject) => {
    axios.request(options).then(response => {
      let res = response.data
      if (res && res[responseMap.code.key] === responseMap.code.success) resolve(res) //业务上成功，执行then
      else {
        //业务上失败，提示业务信息
        let errorMsg = getErrorMsg(res[responseMap.code.key])
        ElMessage.error(errorMsg)
      }
    }).catch(error => {
      //接口异常时返回信息
      reject(error)
      ElMessage.error(global.t('error.exception', {
        status: error.status,
        statusText: error.statusText
      }))
    })
  })
} 