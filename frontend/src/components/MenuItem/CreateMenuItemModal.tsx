import { Box, Button, Modal, TextField, Typography, useTheme } from "@suid/material"
import { Signal, createSignal } from "solid-js"
import { createMenuItem } from "../../lib/axios/api"
import { revalidate } from "@solidjs/router"
import { getMenuItems } from "../../lib/store"

export default function CreateManagerModal(props: { open: Signal<boolean> }) {
  const [open, setOpen] = props.open
  const theme = useTheme()

  const [name, setName] = createSignal("")
  const [icon, setIcon] = createSignal("")
  const [url, setUrl] = createSignal("")

  const onSubmit = () => {
    createMenuItem(name(), icon(), url()).then((res) => {
      revalidate(getMenuItems.key)
      onCancel()
    }).catch((err) => {
      console.log(err)
      // TODO: Alert
    })
  }

  const onCancel = () => {
    setName("")
    setIcon("")
    setUrl("")
    setOpen(false)
  }

  return <>
    <Modal
      open={open()}
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
          添加菜单项
        </Typography>

        <div class='flex flex-col gap-2'>
          <TextField
            size='small'
            label="显示名称"
            value={name()}
            onChange={(_event, value) => {
              setName(value)
            }} />
          <TextField
            size='small'
            label="图标"
            value={icon()}
            onChange={(_event, value) => {
              setIcon(value)
            }}
          />
          <TextField
            size='small'
            label="URL"
            value={url()}
            onChange={(_event, value) => {
              setUrl(value)
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