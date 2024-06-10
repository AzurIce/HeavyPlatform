import { Modal, Button, Box, TextField } from "@suid/material";
import { Component, createSignal } from "solid-js";
import { AlertsStore, LoginInfoStore } from "../lib/store";
import { usersApi } from "../lib/axios/api";
import { useNavigate } from "@solidjs/router";

interface LoginModalProps {
  // isOpen: () => boolean;
  // setIsOpen: (value: boolean) => void;
}

const LoginModal: Component<LoginModalProps> = (props) => {
  const { setUser, showLoginModal, closeLoginModal } = LoginInfoStore();
  const { newSuccessAlert } = AlertsStore();

  const [username, setUsername] = createSignal('')
  const [password, setPassword] = createSignal('')

  function onLogin() {
    console.log("[Login]: onLogin")
    usersApi.login(username(), password()).then((res) => {
      console.log(`[Login]: login success:`, res)
      newSuccessAlert('登录成功')
      setUser(res)
      closeLoginModal();
    }).catch((err) => {
      console.error(err)
    })
  }

  return (
    <>
      <Modal
        open={showLoginModal()}
        onClose={() => closeLoginModal()}
        sx={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}
      >
        <div
          class="flex flex-col gap-3 p-8 items-center
        min-w-[400px]
        w-max
        h-fit
        top-1/2
        rounded-xl
        bg-white bg-opacity-90
        z-3
        shadow-xl
      "
        >
          <span class="mb-3 text-2xl">
            商城管理后台登录
          </span>
          <Box
            component="form"
            sx={{
              maxWidth: 764,
              [`& ${TextField}`]: { m: 1, width: "25ch" },
              textAlign: "center",
            }}
            noValidate
            autocomplete="off"
          >
            <div class='flex flex-col'>
              <TextField
                label="用户名"
                value={username()}
                onChange={(_event, value) => {
                  setUsername(value)
                }}
              />
              <TextField
                label="密码"
                type="password"
                value={password()}
                onChange={(_event, value) => {
                  setPassword(value)
                }}

              />
            </div>
            <div class='flex gap-2 items-center justify-center'>
              <Button size='large' variant='contained' onClick={onLogin}>登录</Button>
              <Button size='large' variant='text' onClick={closeLoginModal}>取消</Button>
              {/* <Button size='large' onClick={() => navigate('/register')}>没有账号？</Button> */}
            </div>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;