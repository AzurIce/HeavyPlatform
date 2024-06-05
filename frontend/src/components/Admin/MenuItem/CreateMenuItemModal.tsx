import { Box, Button, InputLabel, Modal, TextField, Typography, useTheme } from "@suid/material"
import { Signal, createSignal } from "solid-js"
import { createMenuItem } from "../../../lib/axios/api"
import { revalidate } from "@solidjs/router"
import { AlertsStore, getMenuItems } from "../../../lib/store"
import IconInput from "../../IconInput"

export default function CreateManagerModal(props: { open: Signal<boolean> }) {
  const [open, setOpen] = props.open
  const theme = useTheme()

  const [name, setName] = createSignal("")
  const [icon, setIcon] = createSignal("file-unknown")
  const [url, setUrl] = createSignal("")

  const { newErrorAlert, newWarningAlert, newSuccessAlert } = AlertsStore()

  const onSubmit = () => {
    if (name() == "" || icon() == "" || url() == "") {
      if (name() == "") {
        newWarningAlert("名称不能为空");
      } else if (icon() == "") {
        newWarningAlert("图标不能为空");
      } else if (url() == "") {
        newWarningAlert("URL 不能为空");
      }
      return;
    }

    createMenuItem(name(), icon(), url()).then((res) => {
      newSuccessAlert("创建成功")
      revalidate(getMenuItems.key)
      onCancel()
    }).catch((err) => {
      console.log(err)
      newErrorAlert(`创建失败：${err}`)
    })
  }

  const onCancel = () => {
    setName("")
    setIcon("file-unknown")
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
          <InputLabel>显示名称</InputLabel>
          <TextField
            size='small'
            label="显示名称"
            value={name()}
            onChange={(_event, value) => {
              setName(value)
            }} />

          <InputLabel>图标</InputLabel>
          <IconInput icon={icon} setIcon={setIcon} />

          <InputLabel>URL</InputLabel>
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