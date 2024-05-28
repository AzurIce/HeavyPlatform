import { Box, Button, Modal, TextField, Typography, useTheme } from "@suid/material"
import { Signal, createEffect, createSignal } from "solid-js"
import { updateManager } from "../../lib/axios/auth"
import { revalidate } from "@solidjs/router"
import { Manager, getManagers } from "../../lib/store"

export default function UpdateManagerModal(props: { target: Signal<Manager | undefined> }) {
  const [target, setTarget] = props.target
  const theme = useTheme()

  createEffect(() => {
    if (target() != undefined) {
      setUsername(target()!.username)
    }
  })

  const [username, setUsername] = createSignal("")
  const [password, setPassword] = createSignal("")

  const onSubmit = () => {
    updateManager(target()!.id, username()!, password()).then((res) => {
      revalidate(getManagers.key)
      onCancel()
    }).catch((err) => {
      console.log(err)
      // TODO: Alert
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
          <TextField
            size='small'
            label="用户名"
            value={username()}
            onChange={(_event, value) => {
              setUsername(value)
            }} />
          <TextField
            size='small'
            label="密码"
            value={password()}
            onChange={(_event, value) => {
              setPassword(value)
            }}
          />
        </div>

        <div class="flex gap-4">
          <Button variant="contained" onClick={onSubmit}>提交</Button>
          <Button variant="outlined" onClick={onCancel}>取消</Button>
        </div>
      </Box>
    </Modal>
  </>
}