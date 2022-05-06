import { forEach, objEqual } from '@/libs'
import i18n from '../locale'
import config from '@/config'
const { title } = config
const { global } = i18n

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}


const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */

export const getMenuByRouter = (list, access) => {
  let res = []
  forEach(list, item => {
    //只展示非hideInMenu的菜单及其子菜单
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      if (item.children && item.children.length == 1 && (item.meta && !item.meta.showAlways)) {
        //当只有一个子路由并且不配置showAlways的情况下，拆分成独立路由，不使用二级路由
        let subItem = item.children[0]
        let obj = {
          icon: (subItem.meta && subItem.meta.icon) || (item.meta && item.meta.icon) || '',
          title: (subItem.meta && subItem.meta.title) || subItem.name || (item.meta && item.meta.title) || item.name,
          path: `${item.path}/${subItem.path}`,
          name: subItem.name,
          meta: subItem.meta || {}
        }
        if (subItem.meta && subItem.meta.href) obj.href = subItem.meta.href
        if (showThisMenuEle(subItem, access)) res.push(obj)
      } else {
        let obj = {
          icon: (item.meta && item.meta.icon) || '',
          title: (item.meta && item.meta.title) || item.name,
          path: item.path || '',
          name: item.name,
          meta: item.meta || {}
        }
        if (hasChild(item) && showThisMenuEle(item, access)) {
          obj.children = getMenuByRouter(item.children, access)
        }
        if (item.meta && item.meta.href) obj.href = item.meta.href
        if (showThisMenuEle(item, access)) res.push(obj)
      }
    }
  })
  return res
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}

//路由和面包屑导航国际化
export const showTitle = item => {
  return global.t(`router.${item.name}`) || (item.meta && item.meta.title) || item.name
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (route, homeRoute) => {
  let homeItem = { ...homeRoute, icon: homeRoute.meta.icon }
  let routeMetched = route.matched
  if (routeMetched.some(item => item.name === homeRoute.name)) return [homeItem]
  let res = routeMetched.filter(item => {
    //过滤掉隐藏面包屑的菜单
    return item.meta === undefined || !item.meta.hideInBread
  }).map(item => {
    let meta = { ...item.meta }
    if (meta.title && typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true
      meta.title = meta.title(route)
    }
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })
  return [{ ...homeItem, to: homeRoute.path }, ...res]
}

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  localStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList
  return list ? JSON.parse(list) : []
}


/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'home') => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children, homeName)
      if (res.name) return res
    } else {
      if (item.name === homeName) homeRoute = item
    }
  }
  return homeRoute
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  let res = {}
  if (list.length === 2) {
    res = getHomeRoute(list)
  } else {
    const index = list.findIndex(item => routeEqual(item, route))
    if (index === list.length - 1) res = list[list.length - 2]
    else res = list[index + 1]
  }
  return res
}


/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  let len = tagNavList.length
  let res = false
  doCustomTimes(len, (index) => {
    if (routeEqual(tagNavList[index], routeItem)) res = true
  })
  return res
}

/**
 * @param {路由实例} routeItem 
 */
export const setTitle = routeItem => {
  const pageTitle = showTitle(routeItem)
  const resTitle = pageTitle ? `${title} ${pageTitle}` : title
  window.document.title = resTitle
}