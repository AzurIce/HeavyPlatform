import { Route } from "@solidjs/router";
import Login from "./Login";
import MainWrapper from "./Main/MainWrapper";
import Main from "./Main";
import Account from "./Account";

const AdminRoute = () => <>
  <Route path="/admin">
    <Route path="/login" component={Login} />
    <Route path="/" component={MainWrapper}>
      <Route path="/" component={Main} />
      <Route path="/account" component={Account}></Route>
    </Route>
  </Route>;
</>

export default AdminRoute;