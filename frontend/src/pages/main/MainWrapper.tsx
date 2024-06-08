import { RouteSectionProps, useNavigate } from "@solidjs/router";
import { Component, For } from "solid-js";

import { createSignal } from "solid-js"
import { Container, BottomNavigation, BottomNavigationAction } from "@suid/material"
import HomeIcon from "@suid/icons-material/Home"
import CategoryIcon from "@suid/icons-material/Category"
import ShoppingCartIcon from "@suid/icons-material/ShoppingCart"
import AccountCircleIcon from "@suid/icons-material/AccountCircle"
import { Dynamic } from "solid-js/web";

const MainWrapper: Component<RouteSectionProps> = (props) => {
  const [value, setValue] = createSignal(0)
  const navigate = useNavigate()

  const navigates = [
    { path: "/", label: "首页", icon: HomeIcon },
    { path: "/category", label: "分类", icon: CategoryIcon },
    { path: "/cart", label: "购物车", icon: ShoppingCartIcon },
    { path: "/me", label: "我的", icon: AccountCircleIcon },
  ];

  return (
    <Container sx={{ width: '100%', padding: '0 25px' }}>
      {props.children}
      <BottomNavigation
        value={value()}
        onChange={(e, v) => {
          setValue(v)
          navigate(navigates[v].path)
        }}
        style={{ position: "fixed", bottom: 0, left: 0, width: "100%" }} showLabels
      >
        <For each={navigates}>{(item) =>
          <BottomNavigationAction
            label={item.label}
            icon={<Dynamic component={item.icon} />}
          />
        }</For>
      </BottomNavigation>
    </Container>
  )
};

export default MainWrapper;