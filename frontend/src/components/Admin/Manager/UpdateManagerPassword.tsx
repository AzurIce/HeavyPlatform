import { Box, Button, InputLabel, Modal, TextField, Typography, useTheme } from "@suid/material"
import { Signal, createEffect, createSignal } from "solid-js"
import { managersApi } from "../../../lib/axios/api"
import { createAsync, revalidate } from "@solidjs/router"
import { AlertsStore, Manager, getManager, getManagers, getUsergroups } from "../../../lib/store"

export default function UpdateManagerPasswordModal(props: { target: Signal<Manager | undefined> }) {
  const [target, setTarget] = props.target
  const theme = useTheme()

  createEffect(() => {
    if (target() != undefined) {
      setUsername(target()!.username)
    }
  })

  const usergroups = createAsync(() => getUsergroups())

  const [username, setUsername] = createSignal("")
  const [password, setPassword] = createSignal("")

  const { newErrorAlert, newWarningAlert, newSuccessAlert } = AlertsStore()

  const onSubmit = () => {
    if (username() == "" || password() == "") {
      if (username() == "") {
        newWarningAlert("用户名不能为空");
      } else if (password() == "") {
        newWarningAlert("密码不能为空");
      }
      return;
    }

    managersApi.updatePassword(target()!.id, password()).then((res) => {
      newSuccessAlert("更新成功")
      revalidate(getManagers.key)
      revalidate(getManager.keyFor(target()!.id))
      onCancel()
    }).catch((err) => {
      console.log(err)
      newErrorAlert(`更新失败：${err}`)
    })
  }

  const onCancel = () => {
    setPassword("")
    setTarget()
  }

  return <>
    <Modal
      open={target() != undefined}
      onClose={() => { onCancel() }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          // width: "60%",
          maxWidth: "1000px",
          bgcolor: theme.palette.background.paper,
          boxShadow: "24px",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          修改管理员账号信息
        </Typography>

        <div class='flex flex-col gap-2'>
          <InputLabel>用户名</InputLabel>
          <TextField
            size='small'
            label="用户名"
            value={username()}
            onChange={(_event, value) => {
              setUsername(value)
            }} 
            disabled/>
            
          <InputLabel>密码</InputLabel>
          <TextField
            size='small'
            label="密码"
            value={password()}
            onChange={(_event, value) => {
              setPassword(value)
            }}
          />

          {/* <InputLabel id="usergroup-select">用户组</InputLabel>
          <Select
            value={usergroup()}
            label="用户组"
            onChange={(e) => setUsergroup(e.target.value)}
            disabled
          >
            <For each={usergroups()}>{(item) =>
              <>
                <MenuItem value={item.id}>{item.name}</MenuItem>
              </>}
            </For>
          </Select> */}
        </div>

        <div class="flex gap-4">
          <Button variant="contained" onClick={onSubmit}>提交</Button>
          <Button variant="outlined" onClick={onCancel}>取消</Button>
        </div>
      </Box>
    </Modal>
  </>
}