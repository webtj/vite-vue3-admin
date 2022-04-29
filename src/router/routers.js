import parentView from '_c/parent-view'
import Main from '_c/main'
export default [
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          notCache: true,
          icon: 'HomeFilled'
        },
        component: () => import('_v/home/home.vue')
      },
    ]
  },
  {
    path: '/components',
    name: 'components',
    component: Main,
    meta: {
      showAlways: true,
      icon: 'Collection',
      title: '组件'
    },
    children: [
      {
        path: 'customIcon',
        name: 'customIcon',
        meta: {
          title: '自定义图标',
          notCache: false,
          icon: 'IceCream'
        },
        component: () => import('_v/components/customIcon.vue')
      },
      {
        path: 'countup',
        name: 'countup',
        meta: {
          title: '数字渐变',
          notCache: false,
          icon: 'TrendCharts'
        },
        component: () => import('_v/components/countup.vue')
      },
      {
        path: 'dragList',
        name: 'dragList',
        meta: {
          title: '拖拽列表',
          notCache: false,
          icon: 'Pointer'
        },
        component: () => import('_v/components/dragList.vue')
      },
      {
        path: 'exportTable',
        name: 'exportTable',
        meta: {
          title: '表格导出Excel',
          notCache: false,
          icon: 'Pointer'
        },
        component: () => import('_v/components/tableExport.vue')
      }
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    component: Main,
    meta: {
      showAlways: true,
      icon: 'Collection',
      title: 'excel'
    },
    children: [
      {
        path: 'exportExcel',
        name: 'exportExcel',
        meta: {
          title: '数据转表格',
          icon: 'IceCream'
        },
        component: () => import('_v/excel/export-excel.vue')
      },
      {
        path: 'uploadExcel',
        name: 'uploadExcel',
        meta: {
          title: '表格转数据',
          icon: 'TrendCharts'
        },
        component: () => import('_v/excel/upload-excel.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'List',
      title: '多级菜单'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'Link',
          title: '二级-1'
        },
        component: () => import('_v/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          icon: 'Link',
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'Link',
              title: '三级-1'
            },
            component: () => import('_v/multilevel/level-2-2/level-3-1.vue')
          },
          {
            path: 'level_2_2_2',
            name: 'level_2_2_2',
            meta: {
              icon: 'Link',
              title: '三级-2'
            },
            component: () => import('_v/multilevel/level-2-2/level-3-2.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'Link',
          title: '二级-3',
        },
        component: () => import('_v/multilevel/level-2-3.vue')
      }
    ]
  },
  {
    path: '/package',
    name: 'package',
    meta: {
      hideInBread: true,
    },
    component: Main,
    children: [
      {
        path: 'json',
        name: 'json',
        meta: {
          icon: 'Tools',
          notCache: true,
          title: '依赖配置'
        },
        component: () => import('_v/packageJson/packageJson.vue')
      }
    ]
  }
]