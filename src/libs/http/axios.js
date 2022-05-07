import axios from "axios";

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  /**
   * 设置默认的配置，可用于配置公共头，超时时间等
   * @returns 
   */
  getInsideConfig() {
    /**
     * 可以设置一些和业务无关的头信息
     * @param {*} config 
     * config.headers['x-request-id]=generateid
     * config.headers['x-t']=(new Date()).getTime()
     * config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
     * config.timeout
     * config.onDownloadProgress 下载处理进展
     * @returns 
    */
    const config = {
      baseURL: this.baseUrl
    }
    return config
  }

  /**
   * 拦截器，做请求前和返回后的拦截
   * @param {axios.create的实例} instance 
   * @param {*} options 可能会对options的内容做全局的修改
   */
  interceptors(instance) {
    //请求拦截，每次请求前做些操作
    instance.interceptors.request.use(
      config => config,
      error => Promise.reject(error)
    )
    //响应拦截
    instance.interceptors.response.use(res => {
      const { data, status } = res
      return { data, status }
    }, error => {
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      return Promise.reject(errorInfo);
    })
  }

  //创建axios实例并暴露
  request(options) {
    const instance = axios.create()
    //自定义options和初始的合并
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options)
    return instance(options)
  }
}

export default HttpRequest