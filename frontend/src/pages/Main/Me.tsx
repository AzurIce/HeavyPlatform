import { Component, createSignal, createEffect, Switch, Match, Show } from "solid-js";
import { getUser, LoginInfoStore, User } from "../../lib/store";
import { Box, Typography, Avatar, Button } from "@suid/material";
import { createAsync, useNavigate } from "@solidjs/router";

const LoginedUserInfo: Component<{ userId: number }> = ({ userId }) => {
  const user = createAsync(() => getUser(userId));
  const { logout } = LoginInfoStore();
  const navigate = useNavigate();

  return <>
    <Show when={user() != undefined}>
      <Box class="flex items-center mb-4">
        <Avatar src={user()!.avatar} alt={user()!.nickname} class="w-24 h-24 mr-4" />
        <Box>
          <Typography variant="h6">{user()!.nickname}</Typography>
          <Typography variant="body1">@{user()!.username}</Typography>
          <Typography variant="body2">ID: {user()!.id}</Typography>
          <Button variant="contained" color="secondary" onClick={logout}>登出</Button>
          <Button onClick={() => { navigate(`/orders`) }}>我的订单</Button>
        </Box>
      </Box>
      
    </Show>
  </>
}

const NotLoginedUserInfo: Component = () => {
  const {  openLoginModal } = LoginInfoStore();
  return (
    <Box class="flex flex-col items-center">
      <Typography variant="h6" class="mb-4">您尚未登录</Typography>
      <Button variant="contained" color="primary" onClick={openLoginModal}>登录</Button>
    </Box>
  );
}

const Me: Component = () => {
  const navigate = useNavigate();
  const { user,  showLoginModal } = LoginInfoStore();


  return (
    <Box class="p-4">
      {showLoginModal()}
      <Switch>
        <Match when={user() == undefined}><NotLoginedUserInfo /></Match>
        <Match when={user() != undefined}><LoginedUserInfo userId={user()!.id} /></Match>
      </Switch>
    </Box>
  );
};

export default Me;
