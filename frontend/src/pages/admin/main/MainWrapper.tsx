import { AppBar, Avatar, Box, Button, Divider, Icon, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from '@suid/material';
import { Home, Logout, PersonAdd, Settings } from "@suid/icons-material";
import { AdminLoginInfoStore, LoginInfoStore } from '../../../lib/store';
import { Component, createSignal, onMount } from 'solid-js';
import { RouteSectionProps, useNavigate } from '@solidjs/router';
import SideBar from '../../../components/Admin/SideBar';
import { blue, deepOrange, deepPurple, grey, purple } from '@suid/material/colors';

function AccountMenu() {
  const [anchorEl, setAnchorEl] = createSignal<null | HTMLElement>(null);
  const open = () => Boolean(anchorEl());
  const handleClose = () => setAnchorEl(null);

  const { manager, logout } = AdminLoginInfoStore();
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <IconButton
          title="Account settings"
          onClick={(event) => setAnchorEl(event.currentTarget)}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open() ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open() ? "true" : undefined}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: manager()?.id == 0 ? deepOrange[500] : grey[500],
              fontSize: 16,
            }}
          >
            {manager()?.id == 0 ? "SM" : "M"}
          </Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl()}
        id="account-menu"
        open={open()}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            ["& .MuiAvatar-root"]: {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        <MenuItem>User ID: {manager()?.id}</MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => {
          logout()
          navigate(`/admin/login`)
        }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

const MainWrapper: Component<RouteSectionProps> = (props) => {
  const navigate = useNavigate();
  const { manager } = AdminLoginInfoStore()

  onMount(() => {
    console.log("[Admin/MainWrapper]: onMount")
    if (!manager()) {
      navigate('/admin/login');
    }
  })

  return <>
    <div class='max-h-full h-full w-full flex flex-col items-center overflow-hidden'>
      <AppBar position='sticky' sx={{ zIndex: 7 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/admin')}
          >
            <Home />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            商城管理后台
          </Typography>

          <AccountMenu />
        </Toolbar>
      </AppBar>

      <div class='grow flex w-full h-10'>
        <SideBar />
        <div class="max-h-full m-4 w-full flex flex-col gap-4 overflow-y-auto">
          {props.children}
        </div>
      </div>
    </div>
  </>
}

export default MainWrapper;