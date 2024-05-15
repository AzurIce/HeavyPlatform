import { Route } from "@solidjs/router";
import Login from "./Login";
import MainWrapper from "./main/MainWrapper";
import Main from "./main/Main";

const AdminRoute = () => <>
  <Route path="/admin">
    <Route path="/login" component={Login} />
    <Route path="/" component={MainWrapper}>
      <Route path="/" component={Main} />
    </Route>
  </Route>;
</>

export default AdminRoute;