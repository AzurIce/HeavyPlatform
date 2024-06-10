import { Component, createSignal, createEffect, Switch, Match, Show } from "solid-js";
import { getUser, LoginInfoStore, User } from "../../lib/store";
import { Box, Typography, Avatar, Button } from "@suid/material";
import { createAsync, useNavigate } from "@solidjs/router";

const LoginedUserInfo: Component<{ userId: number }> = ({ userId }) => {
  const user = createAsync(() => getUser(userId));

  return <>
    <Show when={user() != undefined}>
      <Box class="flex items-center mb-4">
        <Avatar src={user()!.avatar} alt={user()!.nickname} class="w-24 h-24 mr-4" />
        <Box>
          <Typography variant="h6">{user()!.nickname}</Typography>
          <Typography variant="body1">@{user()!.username}</Typography>
        </Box>
      </Box>
      <Typography variant="body2">ID: {user()!.id}</Typography>
    </Show>
  </>
}

const NotLoginedUserInfo: Component = () => {
  return <>
  </>
}

const Me: Component = () => {
  const navigate = useNavigate();
  const { user, logout, openLoginModal, showLoginModal } = LoginInfoStore();


  const handleLogout = () => {
    // 处理登出逻辑
  };

  return (
    <Box class="p-4">
      {showLoginModal()}
      <Switch>
        <Match when={user() == undefined}><NotLoginedUserInfo /></Match>
        <Match when={user() != undefined}><LoginedUserInfo userId={user()!.id} /></Match>
      </Switch>
      <>
        {/* 这里可以添加更多用户信息 */}
        <Button variant="contained" color="secondary" onClick={logout}>登出</Button>
      </>
      <Button onClick={user() == undefined ? openLoginModal : () => { navigate(`/orders`) }}>我的订单</Button>
    </Box>
  );
};

export default Me;
