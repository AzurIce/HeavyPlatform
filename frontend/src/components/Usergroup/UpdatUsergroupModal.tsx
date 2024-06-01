import { Box, Button, Checkbox, Modal, TextField, Typography, useTheme } from "@suid/material"
import { For, Signal, createEffect, createSignal } from "solid-js"
import { updateUsergroup } from "../../lib/axios/api"
import { createAsync, revalidate } from "@solidjs/router"
import { AlertsStore, Usergroup, getMenuItems, getUsergroup, getUsergroups } from "../../lib/store"

export default function UpdateUsergroupModal(props: { target: Signal<Usergroup | undefined> }) {
  const [target, setTarget] = props.target;
  const theme = useTheme();

  createEffect(() => {
    if (target() != undefined) {
      setName(target()!.name);
      setAccess(target()!.access);
    }
  })

  const menuItems = createAsync(() => getMenuItems());

  const [name, setName] = createSignal("")
  const [access, setAccess] = createSignal<number[]>([])

  const { newErrorAlert, newWarningAlert, newSuccessAlert } = AlertsStore()

  const onSubmit = () => {
    if (name() == "") {
      newWarningAlert("名称不能为空");
      return;
    }
    updateUsergroup(target()!.id, name(), access()).then((res) => {
      newSuccessAlert("更新成功")
      revalidate(getUsergroups.key);
      revalidate(getUsergroup.keyFor(target()!.id));
      onCancel();
    }).catch((err) => {
      console.log(err);
      newErrorAlert(`更新失败：${err}`)
    })
  }

  const onCancel = () => {
    setAccess([]);
    setTarget();
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
            value={name()}
            onChange={(_event, value) => {
              setName(value)
            }} />
          <For each={menuItems()}>{(item) =>
            <>
              <div class="flex">
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

        <div class="flex gap-4">
          <Button variant="contained" onClick={onSubmit}>提交</Button>
          <Button variant="outlined" onClick={onCancel}>取消</Button>
        </div>
      </Box>
    </Modal>
  </>
}