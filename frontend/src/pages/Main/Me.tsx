import { Component, createSignal, createEffect, Switch, Match, Show } from "solid-js";
import { getUser, LoginInfoStore, User } from "../../lib/store";
import { Box, Typography, Avatar, Button, Grid, Card, CardContent, useTheme } from "@suid/material";
import { createAsync, useNavigate } from "@solidjs/router";

const LoginedUserInfo: Component<{ userId: number }> = ({ userId }) => {
  const user = createAsync(() => getUser(userId));
  const { logout } = LoginInfoStore();

  return (
    <Show when={user() != undefined}>
      <Box class="flex flex-col items-center p-4 w-full h-full">
        <Avatar src={user()!.avatar} alt={user()!.nickname} class="w-24 h-24 mb-4" />
        <Typography variant="h6">{user()!.nickname}</Typography>
        <Typography variant="body1" color="textSecondary">@{user()!.username}</Typography>
        <Typography variant="body2" color="textSecondary">ID: {user()!.id}</Typography>
        <Box class="flex flex-col items-center justify-center mt-4 w-full">
          <Button variant="contained" color="secondary" onClick={logout}>登出</Button>
        </Box>
      </Box>
    </Show>
  );
};

const NotLoginedUserInfo: Component = () => {
  const { openLoginModal } = LoginInfoStore();
  return (
    <Box class="flex flex-col items-center p-4 shadow-md rounded bg-white w-full h-full">
      <Typography variant="h6" class="mb-4">您尚未登录</Typography>
      <Button variant="contained" color="primary" onClick={openLoginModal}>登录</Button>
    </Box>
  );
};

const Me: Component = () => {
  const navigate = useNavigate();
  const { user, showLoginModal } = LoginInfoStore();
  const theme = useTheme();

  const handleButtonClick = (clickable: boolean) => {
    if (clickable && user() != undefined) {
      navigate(`/orders`);
    } else if (user() == undefined) {
      alert('您尚未登录');
    } else {
      alert('该功能尚未实现');
    }
  };

  return (
    <div class='flex h-full'>
      {showLoginModal()}
      
      <Card sx={{ display: 'flex', flexDirection: 'column', width: '20%', minWidth: 100, height: '90vh', backgroundColor: theme.palette.background.default }}>
        <Switch>
          <Match when={user() == undefined}><NotLoginedUserInfo /></Match>
          <Match when={user() != undefined}><LoginedUserInfo userId={user()!.id} /></Match>
        </Switch>
      </Card>

      <Box sx={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        {/* 余额、福包、推荐码展示 */}
        <Box class="flex justify-around mb-4" style={{ height: '25%' }}>
          <Card class="flex-1 mx-2 p-4 bg-purple-200 flex flex-col items-center justify-center text-center">
            <Typography variant="h4">💰</Typography>
            <Typography variant="body1">我的余额</Typography>
            
          </Card>
          <Card class="flex-1 mx-2 p-4 bg-blue-200 flex flex-col items-center justify-center text-center">
          <Typography variant="h4">🏷️</Typography>
          <Typography variant="body1">我的优惠券</Typography>
          
          </Card>
          <Card class="flex-1 mx-2 p-4 bg-orange-200 flex flex-col items-center justify-center text-center">
          <Typography variant="h4">📦</Typography>
          <Typography variant="body1">待收货/使用</Typography>
          
          </Card>
        </Box>

        {/* 功能选项展示 */}
        <Grid container spacing={2} style={{ height: '75%' }}>
          {[
            { label: '我的订单', icon: '📋', clickable: true },
            { label: '我的银行卡', icon: '💳', clickable: false },
            { label: '浏览记录', icon: '📄', clickable: false },
            { label: '天天赚红包', icon: '🎁', clickable: false },
            { label: '地址管理', icon: '📍', clickable: false },
            { label: '客服中心', icon: '💬', clickable: false },
            { label: '意见反馈', icon: '✉️', clickable: false },
            { label: '商家入驻', icon: '🏪', clickable: false },
          ].map(option => (
            <Grid item xs={6}>
              <Card 
                variant="outlined" 
                class="h-full cursor-pointer flex flex-col items-center justify-center text-center"
                onClick={() => handleButtonClick(option.clickable)}
              >
                <CardContent class="flex items-center justify-center p-4">
                  <Typography variant="h6" class="flex items-center gap-2">
                    <span>{option.icon}</span> {option.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      

    </div>
  );
};

export default Me;
