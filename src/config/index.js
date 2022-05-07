/**
 * homeName:主页home
 * loginName:登录的路由名称
 * title:浏览器窗口标签展示的title前缀
 * baseUrl:url统一前缀
 * responseMap:api接口数据返回字段隐射，下列配置返回的数据格式为
 *  示例一：
   *  配置：
        responseMap: {
          code: {
            key: 'code',
            success: 0
          },
          msgKey: 'message',
          dataKey: 'data'
        }
      接口返回：
        {
          code:0,
          message:'success'
          ....
        }
    * 示例一：
    * 配置：
        responseMap: {
          code: {
            key: 'retCode',
            success: 200
          },
          msgKey: 'retMsg'
        }
      接口返回：
        {
          retCode:200,
          retMsg:'success'
          ...
        }
    * tokenKey: 校验字段
    * cookieExpires: 单位天 cookie失效时间，建议和后台保持一致，默认1天    
 */

export default {
  github: 'https://github.com/webtj/vite-vue3-admin',
  homeName: 'home',
  loginName: 'login',
  title: '',
  baseUrl: {
    dev: '/api-dev',
    pro: '/api'
  },
  responseMap: {
    code: {
      key: 'code',
      success: 0
    },
    msgKey: 'message'
  },
  tokenKey: 'token',
  cookieExpires: 1
}