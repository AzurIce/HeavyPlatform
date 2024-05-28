// import { Outlet, useNavigate } from '@solidjs/router';
import { AppBar, Button, Icon, IconButton, Toolbar, Typography } from '@suid/material';
import { Home, Menu } from "@suid/icons-material";
import { AdminLoginInfoStore, LoginInfoStore } from '../../../lib/store';
// import { Transition } from 'solid-transition-group';
import { Component, createSignal, onMount } from 'solid-js';
import { RouteSectionProps, useNavigate } from '@solidjs/router';
import SideBar from '../../../components/SideBar';
// import AskSpark from '../../components/AskSpark';


const MainWrapper: Component<RouteSectionProps> = (props) => {
  const navigate = useNavigate();
  const { manager } = AdminLoginInfoStore()
  const [submitModalOpen, setSubmitModalOpen] = createSignal(false);

  onMount(() => {
    console.log("[Admin/MainWrapper]: onMount")
    if (!manager()) {
      navigate('/admin/login');
    }
  })

  return (
    <div class='h-full w-full flex flex-col items-center'>
      <AppBar position='sticky' sx={{ zIndex: 7 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/')}
          >
            <Menu />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            商城管理后台
          </Typography>

        </Toolbar>
      </AppBar>
      <div class='flex-1 flex w-full'>
        <SideBar />
        <div class="m-4 w-full flex flex-col gap-4">
          {props.children}
        </div>
      </div>
    </div>
    // </Transition>
  );
}

export default MainWrapper;