import { Box, Button, Checkbox, InputLabel, Modal, TextField, Typography, useTheme } from "@suid/material"
import { For, Signal, createSignal } from "solid-js"
import { createUsergroup } from "../../../lib/axios/api"
import { createAsync, revalidate } from "@solidjs/router"
import { AlertsStore, getMenuItems, getUsergroups } from "../../../lib/store"

export default function CreateUsergroupModal(props: { open: Signal<boolean> }) {
  const [open, setOpen] = props.open
  const theme = useTheme()

  const menuItems = createAsync(() => getMenuItems());

  const [name, setName] = createSignal("")
  const [access, setAccess] = createSignal<number[]>([])

  const { newErrorAlert, newWarningAlert, newSuccessAlert } = AlertsStore()

  const onSubmit = () => {
      if (name() == "") {
        newWarningAlert("名称不能为空");
        return;
      }

    createUsergroup(name(), access()).then((res) => {
      newSuccessAlert("创建成功")
      revalidate(getUsergroups.key)
      onCancel()
    }).catch((err) => {
      console.log(err)
      newErrorAlert(`创建失败：${err}`)
    })
  }

  const onCancel = () => {
    setName("")
    setAccess([])
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
          添加用户组
        </Typography>

        <div class='flex flex-col gap-2'>
          <InputLabel>名称</InputLabel>
          <TextField
            size='small'
            label="名称"
            value={name()}
            onChange={(_event, value) => {
              setName(value)
            }} />
          <InputLabel>可访问菜单项</InputLabel>
          <div class="max-w-100 overflow-y-scroll">
            <For each={menuItems()}>{(item) =>
              <>
                <div class="flex items-center">
                  <Checkbox
                    checked={access().find(i => i == item.id) != undefined}
                    onChange={(event, checked) => {
                      if (checked) {
                        setAccess([...access(), item.id])
                      } else {
                        setAccess(access().filter(i => i != item.id))
                      }
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <span>{item.name}</span>
                </div>
              </>}
            </For>
          </div>
        </div>

        <div class="flex gap-4">
          <Button variant="contained" onClick={onSubmit}>提交</Button>
          <Button variant="outlined" onClick={onCancel}>取消</Button>
        </div>
      </Box>
    </Modal>
  </>
}