import { RouteSectionProps, useNavigate } from "@solidjs/router";
import { Component, For, Match, Switch } from "solid-js";

import { createSignal } from "solid-js"
import { Container, BottomNavigation, BottomNavigationAction, Paper, AppBar, IconButton, Toolbar, Typography, Button } from "@suid/material"
import HomeIcon from "@suid/icons-material/Home"
import CategoryIcon from "@suid/icons-material/Category"
import ShoppingCartIcon from "@suid/icons-material/ShoppingCart"
import AccountCircleIcon from "@suid/icons-material/AccountCircle"
import { Dynamic } from "solid-js/web";
import { isMobile } from "../../lib/store";
import { Home } from "@suid/icons-material";

const navigates = [
  { path: "/", label: "首页", icon: HomeIcon },
  { path: "/category", label: "分类", icon: CategoryIcon },
  { path: "/cart", label: "购物车", icon: ShoppingCartIcon },
  { path: "/me", label: "我的", icon: AccountCircleIcon },
];

const MobileNavigation: Component = () => {
  const [value, setValue] = createSignal(0)
  const navigate = useNavigate()

  return <Paper sx={{ width: "100%", order: 9999 }} elevation={3}>
    <BottomNavigation
      showLabels
      value={value()}
      onChange={(e, v) => {
        setValue(v)
        navigate(navigates[v].path)
      }}
      style={{}}
    >
      <For each={navigates}>{(item) =>
        <BottomNavigationAction
          label={item.label}
          icon={<Dynamic component={item.icon} />}
        />
      }</For>
    </BottomNavigation>
  </Paper>
}

const MainWrapper: Component<RouteSectionProps> = (props) => {
  const navigate = useNavigate();

  return <>
    <div class='max-h-full h-full w-full flex flex-col items-center overflow-hidden bg-[#f6f6f6]'>
      <Switch>
        <Match when={isMobile()}>
          <MobileNavigation />
        </Match>
        <Match when={!isMobile()}>
          <AppBar position='sticky' sx={{ zIndex: 7, order: -9999 }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => navigate('/')}
              >
                <Home />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                重量化商城
              </Typography>
              <For each={navigates}>{(item) =>
                <Button color="inherit" onClick={() => navigate(item.path)}>{item.label}</Button>
              }</For>
            </Toolbar>
          </AppBar>
        </Match>
      </Switch>

      <div class='grow flex w-full h-10'>
        <div class="max-h-full w-full overflow-y-auto">
          {props.children}
        </div>
      </div>
    </div>
  </>
};

export default MainWrapper;