import { Component, createSignal, createEffect, Switch, Match, Show } from "solid-js";
import { getUser, LoginInfoStore, User } from "../../lib/store";
import { Box, Typography, Avatar, Button, Grid, Card, CardContent, useTheme } from "@suid/material";
import { createAsync, useNavigate } from "@solidjs/router";
import { Comment, CreditCard, CurrencyExchange, Inbox, Receipt, ReceiptLong } from "@suid/icons-material";

const LoginedUserInfo: Component<{ userId: number }> = ({ userId }) => {
  const user = createAsync(() => getUser(userId));
  const { logout } = LoginInfoStore();

  return (
    <Show when={user() != undefined}>
      <div class="flex items-center p-4 w-full gap-2">
        <Avatar src={user()!.avatar} alt={user()!.nickname} />
        <div class="flex flex-col">
          <div class="flex gap-2">
            <span>{user()!.nickname}</span>
            <span class="text-xs text-[#999999]">ID: {user()!.id}</span>
          </div>
          <span>@{user()!.username}</span>
        </div>
      </div>
    </Show>
  );
};

const NotLoginedUserInfo: Component = () => {
  const { openLoginModal } = LoginInfoStore();
  return (
    <Box class="flex flex-col items-center p-4 shadow-md rounded bg-white w-full">
      <Typography variant="h6" class="mb-4">您尚未登录</Typography>
      <Button variant="contained" color="primary" onClick={openLoginModal}>登录</Button>
    </Box>
  );
};

const Me: Component = () => {
  const navigate = useNavigate();
  const { user, showLoginModal, logout } = LoginInfoStore();
  const theme = useTheme();

  const handleMyOrders = () => {
    if (user() != undefined) {
      navigate(`/orders`);
    } else {
      showLoginModal();
    }
  };

  return (
    <div class='flex flex-col h-full p-4 gap-4'>
      {user() == undefined}
      <Card sx={{ display: 'flex', flexDirection: 'column', backgroundColor: theme.palette.background.default }}>
        <Switch>
          <Match when={user() == undefined}><NotLoginedUserInfo /></Match>
          <Match when={user() != undefined}><LoginedUserInfo userId={user()!.id} /></Match>
        </Switch>
      </Card>

      <Show when={user() != undefined}>
        <Button color="error" variant="contained" onClick={logout}>登出</Button>
      </Show>

      <Card sx={{ display: 'flex' }}>
        <div class="flex-1 flex flex-col gap-2 items-center p-4 hover:bg-[#cccccc] cursor-pointer">
          <CreditCard />
          <span>代付款</span>
        </div>
        <div class="flex-1 flex flex-col gap-2 items-center p-4 hover:bg-[#cccccc] cursor-pointer">
          <Inbox />
          <span>待收货/使用</span>
        </div>
        <div class="flex-1 flex flex-col gap-2 items-center p-4 hover:bg-[#cccccc] cursor-pointer">
          <Comment />
          <span>待评价</span>
        </div>
        <div class="flex-1 flex flex-col gap-2 items-center p-4 hover:bg-[#cccccc] cursor-pointer">
          <CurrencyExchange />
          <span>退款/售后</span>
        </div>
        <div class="flex-1 flex flex-col gap-2 items-center p-4 hover:bg-[#cccccc] cursor-pointer" onClick={handleMyOrders}>
          <ReceiptLong color="warning" />
          <span>我的订单</span>
        </div>
      </Card>

      <Card sx={{ display: 'flex' }}>
        <div class="flex-1 flex flex-col gap-2 items-center p-4 hover:bg-[#cccccc] cursor-pointer">
          <span class="text-xl font-bold">0</span>
          <span>余额</span>
        </div>
        <div class="flex-1 flex flex-col gap-2 items-center p-4 hover:bg-[#cccccc] cursor-pointer">
          <span class="text-xl font-bold">14</span>
          <span>优惠券</span>
        </div>
        <div class="flex-1 flex flex-col gap-2 items-center p-4 hover:bg-[#cccccc] cursor-pointer">
          <span class="text-xl font-bold">20</span>
          <span>商品收藏</span>
        </div>
        <div class="flex-1 flex flex-col gap-2 items-center p-4 hover:bg-[#cccccc] cursor-pointer">
          <span class="text-xl font-bold">25</span>
          <span>店铺关注</span>
        </div>
        <div class="flex-1 flex flex-col gap-2 items-center p-4 hover:bg-[#cccccc] cursor-pointer">
          <span class="text-xl font-bold">126</span>
          <span>浏览记录</span>
        </div>
      </Card>


      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Grid container spacing={2}>
          {[
            { label: '我的银行卡', icon: '💳', clickable: false },
            { label: '天天赚红包', icon: '🧧', clickable: false },
            { label: '地址管理', icon: '📍', clickable: false },
            { label: '客服中心', icon: '💬', clickable: false },
            { label: '意见反馈', icon: '✉️', clickable: false },
            { label: '商家入驻', icon: '🏪', clickable: false },
            { label: '试用领取', icon: '📦', clickable: false },
            { label: '问医生', icon: '🧪', clickable: false },
          ].map(option => (
            <Grid item xs={3}>
              <Card
                variant="outlined"
                class="h-full cursor-pointer flex flex-col items-center justify-center text-center"
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
