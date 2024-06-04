import { Route } from "@solidjs/router";
import LoginPage from "./Login";
import MainWrapper from "./Main/MainWrapper";
import MainPage from "./Main";
import AccountPage from "./Main/Account";
import MenuItemPage from "./Main/MenuItem";

const AdminRoute = () => <>
  <Route path="/admin">
    <Route path="/login" component={LoginPage} />
    <Route path="/" component={MainWrapper}>
      <Route path="/" component={MainPage} />
      <Route path="/menu-item" component={MenuItemPage}></Route>
      <Route path="/account" component={AccountPage}></Route>
    </Route>
  </Route>;
</>

export default AdminRoute;