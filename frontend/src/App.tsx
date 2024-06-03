import { type Component } from 'solid-js';
import { Router, Route } from "@solidjs/router";

import Main from './pages/Main';
import NotFound from './pages/NotFound';
import AdminRoute from './pages/Admin/AdminRoute';
import Login from './pages/Login';
import MainWrapper from './pages/Main/MainWrapper';
import Playground from './pages/Playground';
import AlertList from './components/AlertList';

const App: Component = () => {
  return <>
    <AlertList />
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/" component={MainWrapper}>
        <Route path="/" component={Main} />
      </Route>

      <AdminRoute />

      <Route path="/playground" component={Playground} />
      <Route path="*404" component={NotFound} />
    </Router>
  </>;
};

export default App;
