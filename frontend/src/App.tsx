import { type Component } from 'solid-js';
import { Router, Route } from "@solidjs/router";

import NotFound from './pages/NotFound';
import AdminRoute from './pages/Admin/AdminRoute';
import Login from './pages/Login';
import Playground from './pages/Playground';
import AlertList from './components/AlertList';

// Main
import MainWrapper from './pages/Main/MainWrapper';
import Main from './pages/Main';
import Category from './pages/Main/Category';
import Cart from './pages/Main/Cart';
import Me from './pages/Main/Me';

// Details pages
import CategoriesWrapper from './pages/Categories/CategoriesWrapper';
import Categories from './pages/Categories';
import GoodsWrapper from './pages/Goods/GoodsWrapper';
import Goods from './pages/Goods';

// TODO: Orders

const App: Component = () => {
  return <>
    <AlertList />
    <Router>
      <Route path="/login" component={Login} />

      <Route path="/" component={MainWrapper}>
        <Route path="/" component={Main} />
        <Route path="/category" component={Category} />
        <Route path="/cart" component={Cart} />
        <Route path="/me" component={Me} />
      </Route>

      <Route path="/categories" component={CategoriesWrapper}>
        <Route path="/:id" component={Categories} />
      </Route>

      <Route path="/goods" component={GoodsWrapper}>
        <Route path="/:id" component={Goods} />
      </Route>

      <AdminRoute />

      <Route path="/playground" component={Playground} />
      <Route path="*404" component={NotFound} />
    </Router>
  </>;
};

export default App;
