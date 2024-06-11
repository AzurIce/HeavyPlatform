import { type Component } from 'solid-js';
import { Router, Route } from "@solidjs/router";

import NotFound from './pages/NotFound';
import AdminRoute from './pages/Admin/AdminRoute';
import Playground from './pages/Playground';
import AlertList from './components/AlertList';

// Main
import MainWrapper from './pages/Main/MainWrapper';
import Main from './pages/Main';
import Category from './pages/Main/Category';
import Cart from './pages/Main/Cart';
import Me from './pages/Main/Me';

// Details pages
import GoodsWrapper from './pages/Goods/GoodsWrapper';
import Goods from './pages/Goods';
import OrdersWrapper from './pages/Orders/OrderWrapper';
import Orders from './pages/Orders';
import LoginModal from './components/LoginModal';

import History from './pages/History';

const App: Component = () => {
  return <>
    <AlertList />
    <LoginModal />
    <Router>
      <Route path="/" component={MainWrapper}>
        {/* 主页：轮播图+搜索框+商品列表 */}
        <Route path="/" component={Main} />
        {/* 分类：分类菜单+商品列表 */}
        <Route path="/category" component={Category} />
        {/* 购物车 */}
        <Route path="/cart" component={Cart} />
        {/* 我的 */}
        <Route path="/me" component={Me} />
      </Route>

      <Route path="/goods" component={GoodsWrapper}>
        {/* 商品详情页 */}
        <Route path="/:id" component={Goods} />
      </Route>

      <Route path="/orders" component={OrdersWrapper}>
        {/* 订单列表页 */}
        <Route path="/" component={Orders} />
        <Route path="/:id" component={Orders} />
      </Route>

      <Route path="/history" component={History} />

      <AdminRoute />

      <Route path="/playground" component={Playground} />
      <Route path="*404" component={NotFound} />
    </Router>
  </>;
};

export default App;
