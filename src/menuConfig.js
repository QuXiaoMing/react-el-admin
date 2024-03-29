// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message'
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu'
  },
  {
    name: '退出',
    path: '/user/login',
    icon: 'yonghu'
  }
];

const asideMenuConfig = [
  {
    name: '工作台',
    path: '/dashboard',
    icon: 'home2'
  },
  {
    name: '资产管理',
    path: '/asset',
    icon: 'cascades'
  },
  {
    name: '商品管理',
    path: '/goods',
    icon: 'shopcar'
  },
  {
    name: '分类管理',
    path: '/category',
    icon: 'shopcar'
  },
  {
    name: '店铺管理',
    path: '/shop',
    icon: 'shopcar'
  },
  {
    name: '预约管理',
    path: '/reserve',
    icon: 'clock'
  },
  {
    name: '订单管理',
    path: '/order',
    icon: 'shopcar'
  },
  {
    name: '会员管理',
    path: '/membership',
    icon: 'menu'
  },
  {
    name: '字典管理',
    path: '/dic',
    icon: 'menu'
  }
];

export {headerMenuConfig, asideMenuConfig};
