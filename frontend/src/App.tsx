import type { Component } from 'solid-js';
import { Router, Route } from "@solidjs/router";

import Main from './pages/main/Main';
import NotFound from './pages/NotFound';
import AdminRoute from './pages/admin/AdminRoute';
import Login from './pages/Login';
import MainWrapper from './pages/main/MainWrapper';

const App: Component = () => {
  return <>
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/" component={MainWrapper}>
        <Route path="/" component={Main} />
      </Route>

      <AdminRoute />

      <Route path="*404" component={NotFound} />
    </Router>
  </>;
};

export default App;
