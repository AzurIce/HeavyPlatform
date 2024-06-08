import { Box, Button, FormControlLabel, Modal, Switch, TextField, Typography, useTheme } from "@suid/material"
import { Signal, createEffect, createSignal } from "solid-js"
import { revalidate } from "@solidjs/router"
import { AlertsStore, MenuItem, getMenuItems } from "../../../lib/store"
import IconInput from "../../IconInput"
import { menuItemsApi } from "../../../lib/axios/api"

export default function UpdateMenuItemModal(props: { target: Signal<MenuItem | undefined> }) {
  const [target, setTarget] = props.target
  const theme = useTheme()

  const [name, setName] = createSignal("")
  const [icon, setIcon] = createSignal("tabler:file-unknown")
  const [url, setUrl] = createSignal("")
  const [display, setDisplay] = createSignal(true)

  createEffect(() => {
    if (target() != undefined) {
      setName(target()!.name)
      setIcon(target()!.icon)
      setUrl(target()!.url)
      setDisplay(target()!.enable)
    }
  })

  const { newErrorAlert, newWarningAlert, newSuccessAlert } = AlertsStore();

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

    menuItemsApi.update(target()!.id, name(), icon(), url(), display()).then((res) => {
      newSuccessAlert("更新成功")
      revalidate(getMenuItems.key)
      onCancel()
    }).catch((err) => {
      console.log(err)
      newErrorAlert(`更新失败：${err}`)
      // TODO: Alert
    })
  }

  const onCancel = () => {
    setName("")
    setIcon("file-unknown")
    setUrl("")
    setDisplay(true)
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
          修改菜单项
        </Typography>

        <div class='flex flex-col gap-2'>
          <TextField
            size='small'
            label="显示名称"
            value={name()}
            onChange={(_event, value) => {
              setName(value)
            }} />
          <IconInput icon={icon} setIcon={setIcon}/>
          <FormControlLabel
            control={<Switch checked={display()} onChange={() => { setDisplay((x) => !x) }} />}
            label="是否启用"
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