import type { Component } from 'solid-js';
import { Router, Route } from "@solidjs/router";

import Main from './pages/Main';
import NotFound from './pages/NotFound';

const App: Component = () => {
  return <>
    <Router>
      <Route path="/" component={Main}/>
      <Route path="*404" component={NotFound}/>
    </Router>
  </>;
};

export default App;
