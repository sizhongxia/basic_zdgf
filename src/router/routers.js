import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: {  String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{多语言字段}}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          notCache: true,
          icon: 'ios-speedometer'
        },
        component: () => import('@/view/main/home')
      }
    ]
  },
  {
    path: '/map',
    name: 'map', // 地图
    meta: {
      access: ['super_admin'],
      title: '地图',
      icon: 'ios-map-outline'
    },
    component: Main, // 一级目录必须使用Main组件作为component
    children: [
      {
        path: '/powerstation/map',
        name: 'powerstation_map',
        meta: {
          icon: 'ios-settings',
          title: '电站地图'
        },
        component: () => import('@/view/basic.vue')
      }
    ]
  },
  {
    path: '/powerstation',
    name: 'powerstation_manage', // 电站管理
    meta: {
      access: ['super_admin'],
      title: '电站管理',
      icon: 'ios-compass-outline'
    },
    component: Main, // 一级目录必须使用Main组件作为component
    children: [
      {
        path: '/powerstation/list',
        name: 'powerstation_list',
        meta: {
          icon: 'ios-settings',
          title: '电站列表'
        },
        component: () => import('@/view/table/index.vue')
      },
      {
        path: '/equipment/list',
        name: 'equipment_list',
        meta: {
          icon: 'ios-settings',
          title: '设备列表'
        },
        component: () => import('@/view/basic.vue')
      }
    ]
  },
  {
    path: '/report',
    name: 'powerstation_report',
    meta: {
      access: ['super_admin'],
      title: '电站报表',
      icon: 'ios-compass-outline'
    },
    component: Main, // 一级目录必须使用Main组件作为component
    children: [
      {
        path: '/report/day',
        name: 'report_day',
        meta: {
          icon: 'ios-settings',
          title: '电站日报表'
        },
        component: () => import('@/view/basic.vue')
      },
      {
        path: '/report/month',
        name: 'report_month',
        meta: {
          icon: 'ios-settings',
          title: '电站月报表'
        },
        component: () => import('@/view/basic.vue')
      },
      {
        path: '/report/year',
        name: 'report_year',
        meta: {
          icon: 'ios-settings',
          title: '电站年报表'
        },
        component: () => import('@/view/basic.vue')
      }
    ]
  },
  {
    path: '/maintenance',
    name: 'powerstation_maintenance',
    meta: {
      access: ['super_admin'],
      title: '电站运维',
      icon: 'ios-compass-outline'
    },
    component: Main, // 一级目录必须使用Main组件作为component
    children: [
      {
        path: '/maintenance/manage',
        name: 'maintenance_manage',
        meta: {
          icon: 'ios-settings',
          title: '运维管理'
        },
        component: () => import('@/view/basic.vue')
      },
      {
        path: '/maintenance/fault',
        name: 'fault_manage',
        meta: {
          icon: 'ios-settings',
          title: '故障管理'
        },
        component: () => import('@/view/basic.vue')
      },
      {
        path: '/maintenance/workorder',
        name: 'workorder_manage',
        meta: {
          icon: 'ios-settings',
          title: '工单管理'
        },
        component: () => import('@/view/basic.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'user', // 用户管理
    meta: {
      access: ['super_admin'],
      title: '用户',
      icon: 'md-people'
    },
    component: Main, // 一级目录必须使用Main组件作为component
    children: [
      {
        path: '/user/manage',
        name: 'user_manage',
        meta: {
          icon: 'md-people',
          title: '用户管理'
        },
        component: () => import('@/view/basic.vue')
      },
      {
        path: '/user/authorization/manage',
        name: 'authorization_manage',
        meta: {
          icon: 'ios-lock',
          title: '权限管理'
        },
        component: () => import('@/view/basic.vue')
      }
    ]
  },
  {
    path: '/basicinfo',
    name: 'basicinfo', // 基础信息
    meta: {
      access: ['super_admin'],
      title: '基础信息',
      icon: 'ios-settings'
    },
    component: Main, // 一级目录必须使用Main组件作为component
    children: [
      {
        path: '/basicinfo/area',
        name: 'area_manage',
        meta: {
          icon: 'ios-settings',
          title: '区域管理'
        },
        component: () => import('@/view/basic.vue')
      },
      {
        path: '/basicinfo/conversion',
        name: 'conversion_manage',
        meta: {
          icon: 'ios-settings',
          title: '基础换算'
        },
        component: () => import('@/view/basic.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: '/center',
        name: 'message_center',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/main/message/index.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
