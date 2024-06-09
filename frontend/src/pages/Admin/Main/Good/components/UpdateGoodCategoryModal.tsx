import { Component, Signal, createEffect, createSignal } from "solid-js";
import { AlertsStore, GoodCategory, getGoodCategorie, getGoodCategories } from "../../../../../lib/store";
import { Box, Button, InputLabel, Modal, TextField, Typography, useTheme } from "@suid/material";
import { goodCategoriesApi } from "../../../../../lib/axios/api";
import { revalidate } from "@solidjs/router";

export const UpdateGoodCategoryModal: Component<{ target: Signal<GoodCategory | undefined> }> = (props) => {
  const [target, setTarget] = props.target
  const theme = useTheme()

  const [name, setName] = createSignal("");
  createEffect(() => {
    if (target() != undefined) {
      setName(target()!.name);
    }
  })
  const { newErrorAlert, newWarningAlert, newSuccessAlert } = AlertsStore();

  const onSubmit = () => {
    if (name() == "") {
      newWarningAlert("名称不能为空")
      return
    }

    goodCategoriesApi.update(target()!.id, name()).then((res) => {
      newSuccessAlert("更新成功")
      revalidate(getGoodCategories.key)
      revalidate(getGoodCategorie.keyFor(target()!.id))
      onCancel()
    }).catch((err) => {
      console.log(err)
      newErrorAlert(`更新失败：${err}`)
    })
  }

  const onCancel = () => {
    setName("")
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
          width: "60%",
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
          添加商品
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
        </div>

        <div class="flex gap-4">
          <Button variant="contained" onClick={onSubmit}>提交</Button>
          <Button variant="outlined" onClick={onCancel}>取消</Button>
        </div>
      </Box>
    </Modal>
  </>
}
