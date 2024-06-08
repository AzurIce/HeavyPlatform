import { useMatch, useNavigate } from "@solidjs/router";
import { Dashboard, List, ManageAccounts, Sell } from "@suid/icons-material";
import { IconButton } from "@suid/material";
import { Component } from "solid-js";

const SideBarItem: Component<{ icon: Component, route: string }> = (props) => {
  const { icon, route } = props;
  const navigate = useNavigate();
  const match = useMatch(() => route);

  return <IconButton
    size="large"
    edge="start"
    color="inherit"
    aria-label="menu"
    sx={{ ml: 0, mr: 0, color: match() ? '#1976d2' : '#777777' }}
    onClick={() => navigate(route)}
  >
    {icon({})}
  </IconButton>
}

const SideBar: Component = () => {
  return <>
    <aside class="border-0 border-r border-solid border-slate-200 p-2 flex flex-col items-center">
      <SideBarItem icon={Dashboard} route="/admin" />
      <SideBarItem icon={List} route="/admin/menu-item" />
      <SideBarItem icon={ManageAccounts} route="/admin/account" />
      <SideBarItem icon={Sell} route="/admin/good" />
    </aside>
  </>
};

export default SideBar;