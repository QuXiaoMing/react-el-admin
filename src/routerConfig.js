// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import UserRegister from './pages/UserRegister';
import Dashboard from './pages/Dashboard';
import Reserve from './pages/Reserve';
import Asset from './pages/Asset';
import OrderList from './pages/OrderList';
import Goods from './pages/Goods';
import Shop from './pages/Shop';
import Membership from './pages/Membership';
import AddReserve from './pages/AddReserve';

import Login from './pages/Login';
import AddGoods from './pages/AddGoods';

const routerConfig = [
  {
    path: '/user/login',
    component: Login,
  },
  {
    path: '/user/register',
    component: UserRegister,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/reserve',
    component: Reserve,
  },
  {
    path: '/asset',
    component: Asset,
  },
  {
    path: '/goods',
    component: Goods,
  },
  {
    path: '/shop',
    component: Shop,
  },
  {
    path: '/order',
    component: OrderList,
  },
  {
    path: '/membership',
    component: Membership,
  },
  {
    path: '/add/reserve',
    component: AddReserve,
  },
  {
    path: '/add/shop',
    component: AddGoods,
  },
];

export default routerConfig;
