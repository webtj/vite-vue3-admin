const initUrl = url => `/vue-admin${url}`

export default [
  {
    type: 'post',
    url: initUrl('/user/login'),
    response: () => {
      return {
        code: 0,
        message: 'success',
        token: 'eqwdqwdqwd1wqewqex2e21edasdsdwdwdwqdwqdd'
      }
    }
  },
  {
    type: 'post',
    url: initUrl('/user/getUserInfo'),
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          id: '999999',
          name: 'taojian',
          avatar: 'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
          access: ['admin', 'superadmin']
        }
      }
    }
  },
  {
    type: 'post',
    url: initUrl('/user/logout'),
    response: () => {
      return {
        code: 0,
        message: 'success'
      }
    }
  },
]