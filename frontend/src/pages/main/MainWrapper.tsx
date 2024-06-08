import { RouteSectionProps, useNavigate } from "@solidjs/router";
import { Component } from "solid-js";

import { createSignal } from "solid-js"
import { Container, BottomNavigation, BottomNavigationAction } from "@suid/material"
import HomeIcon from "@suid/icons-material/Home"
import CategoryIcon from "@suid/icons-material/Category"
import ShoppingCartIcon from "@suid/icons-material/ShoppingCart"
import AccountCircleIcon from "@suid/icons-material/AccountCircle"

const MainWrapper: Component<RouteSectionProps> = (props) => {
  const [value, setValue] = createSignal(0)
  const navigate = useNavigate()

  const handleNavigationChange = (event: any, newValue: any) => {
    setValue(newValue)
    switch (newValue) {
      case 0:
        navigate("/")
        break
      case 1:
        navigate("/category")
        break
      case 2:
        navigate("/cart")
        break
      case 3:
        navigate("/me")
        break
      default:
        navigate("/")
        break
    }
  }

  return (
    <Container sx={{width:'100%', padding:'0 25px'}}>
      {props.children}
      <BottomNavigation style={{ width: "100%" }} />
      <BottomNavigation value={value()} onChange={handleNavigationChange} showLabels style={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}>
        <BottomNavigationAction label="首页" icon={<HomeIcon />} />
        <BottomNavigationAction label="分类" icon={<CategoryIcon />} />
        <BottomNavigationAction label="购物车" icon={<ShoppingCartIcon />} />
        <BottomNavigationAction label="我的" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Container>
  )
};

export default MainWrapper;