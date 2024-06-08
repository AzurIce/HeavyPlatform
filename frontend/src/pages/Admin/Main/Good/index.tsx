import { Add, Delete, Edit, Restore } from "@suid/icons-material";
import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Card, CardMedia, CardActions, useTheme, Modal, InputLabel, TextField, Select, MenuItem, InputAdornment } from "@suid/material";
import { Component, For, Setter, Show, Signal, createEffect, createSignal } from "solid-js";
import { createAsync, revalidate } from "@solidjs/router";
import { AlertsStore, Good, GoodCategory, getGoodCategories, getGood, getGoods, resetAllData, getGoodsByGroupId, getGoodGroupIds } from "../../../../lib/store";

import { goodCategoriesApi, goodsApi } from "../../../../lib/axios/api";
import { CreateGoodModal, DeleteGoodCategoryModalButton, GoodGroupCard, UpdateGoodModal } from "./components";


const GoodPage: Component = () => {
  return <>
    <GoodCategoryPaper />
    <GoodPaper />
    {/* <UserGroupPaper />
    <ManagerAcountPaper /> */}
  </>
}

const GoodPaper: Component = () => {
  const createShow = createSignal(false);
  const [getCreateShow, setCreateShow] = createShow;
  const updateTarget = createSignal<Good | undefined>();
  const [getUpdateTarget, setUpdateTarget] = updateTarget;

  // const goods = createAsync(() => getGoods());
  const data = createAsync(() => getGoodGroupIds())
  // const menuItems = createAsync(() => getMenuItems());

  return <>
    <CreateGoodModal open={createShow} />
    <UpdateGoodModal target={updateTarget} />
    {/* <UpdateUsergroupModal target={updateTarget} /> */}

    <Paper sx={{
      padding: 2,
      display: "flex",
      flexDirection: "column",
      gap: 2
    }}>
      <Typography variant="h6">商品列表</Typography>
      <ButtonGroup>
        <Button onClick={() => { setCreateShow(true) }}>添加商品<Add /></Button>
        <Button onClick={() => { resetAllData() }} color="error">重置数据库<Restore /></Button>
      </ButtonGroup>
      <div class="flex flex-col w-full gap-2">
        <For each={data()}>{(item) =>
          <>
            <GoodGroupCard id={item} setUpdateTarget={setUpdateTarget} />
          </>
        }</For>
      </div>
    </Paper>
  </>
}

const GoodCategoryPaper: Component = () => {
  const createShow = createSignal(false);
  const [getCreateShow, setCreateShow] = createShow;
  const updateTarget = createSignal<GoodCategory | undefined>();
  const [getUpdateTarget, setUpdateTarget] = updateTarget;

  const categories = createAsync(() => getGoodCategories());

  return <>
    <CreateGoodCategoryModal open={createShow} />
    <UpdateGoodCategoryModal target={updateTarget} />

    <Paper sx={{
      padding: 2,
      display: "flex",
      flexDirection: "column",
      gap: 2
    }}>
      <Typography variant="h6">商品分类</Typography>
      <ButtonGroup>
        <Button onClick={() => { setCreateShow(true) }}>添加分类<Add /></Button>
        <Button onClick={() => { resetAllData() }} color="error">重置数据库<Restore /></Button>
      </ButtonGroup>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>分类名</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <For each={categories()}>
              {(item) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell>
                    <span class="text-md">{item.name}</span>
                  </TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <Button onClick={() => setUpdateTarget(item)} disabled={item.id == 0}>
                        <Edit />
                      </Button>
                      <DeleteGoodCategoryModalButton target={() => item} disabled={() => item.id == 0}><Delete /></DeleteGoodCategoryModalButton>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              )}
            </For>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </>
};

const CreateGoodCategoryModal: Component<{ open: Signal<boolean> }> = (props) => {
  const [open, setOpen] = props.open
  const theme = useTheme()

  const [name, setName] = createSignal("");
  const { newErrorAlert, newWarningAlert, newSuccessAlert } = AlertsStore();

  const onSubmit = () => {
    if (name() == "") {
      newWarningAlert("名称不能为空")
      return
    }

    goodCategoriesApi.create(name()).then((res) => {
      newSuccessAlert("创建成功")
      revalidate(getGoods.key)
      onCancel()
    }).catch((err) => {
      console.log(err)
      newErrorAlert(`创建失败：${err}`)
    })
  }

  const onCancel = () => {
    setName("");
    setOpen(false);
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
          添加商品分类
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

const UpdateGoodCategoryModal: Component<{ target: Signal<GoodCategory | undefined> }> = (props) => {
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

export default GoodPage;