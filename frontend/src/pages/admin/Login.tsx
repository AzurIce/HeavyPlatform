import { A, useNavigate } from "@solidjs/router";
import { Box, Button, TextField } from "@suid/material";
import { Component, createSignal } from "solid-js";
import { AdminLoginInfoStore, AlertsStore } from "../../lib/store";
import { managersApi } from "../../lib/axios/api";

interface CoreLoginPageProps {
  modalClose: ((value: boolean) => void) | undefined;
}

export const CoreLoginPage: Component<CoreLoginPageProps> = (props) => {
  const navigate = useNavigate();

  const { setManager } = AdminLoginInfoStore();
  // const { setLoginInfo } = LoginInfoStore()
  const { newSuccessAlert, newWarningAlert, newErrorAlert } = AlertsStore()

  const [username, setUsername] = createSignal('')
  const [password, setPassword] = createSignal('')

  function onLogin() {
    console.log("[Login]: onLogin")
    managersApi.login(username(), password()).then((res) => {
      console.log(`[Login]: login success:`, res)

      newSuccessAlert('登录成功')
      setManager(res)
      setTimeout(() => {
        if (props.modalClose) {
          props.modalClose(false)
        } else {
          navigate('/admin')
        }
      }, 100)
    }).catch((err) => {
      console.error(err)
      newErrorAlert('登录失败，请检查用户名和密码是否正确')
    })
  }

  return (
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
          [`& ${A}`]: { fontSize: '0.25rem' },
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
          {/* <Button size='large' onClick={() => navigate('/register')}>没有账号？</Button> */}
        </div>
      </Box>
    </div>
  )
}

const LoginPage: Component = () => {
  return (
    <div class='h-full w-full flex items-center justify-center'>
      <CoreLoginPage modalClose={undefined}/>
    </div>
  )
}

export default LoginPage;