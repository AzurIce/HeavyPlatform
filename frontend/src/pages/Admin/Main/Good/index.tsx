import { Add, Delete, Edit, Key, Restore } from "@suid/icons-material";
import { Chip, Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Card, CardMedia, CardActions, useTheme, Modal, InputLabel, TextField, Select, MenuItem, InputAdornment } from "@suid/material";
import { Component, For, Setter, Show, Signal, createEffect, createSignal } from "solid-js";
import { createAsync, revalidate } from "@solidjs/router";
import { AdminLoginInfoStore, AlertsStore, Good, Manager, getCategories, getGood, getGoods, getManagers, getUsergroups } from "../../../../lib/store";

import CreateManagerModal from "../../../../components/Admin/Manager/CreateManagerModal";
import UpdateManagerModal from "../../../../components/Admin/Manager/UpdateManagerModal";
import { DeleteManagerModalButton } from "../../../../components/Admin/Manager";
import { resetDb } from "../../../../lib/db";
import { DeleteButton } from "../../../../components/Admin/common";
import { createGood, deleteGood } from "../../../../lib/axios/api";
import { createStore } from "solid-js/store";
import ImgInput from "../../../../components/ImgInput";

const onRevalidate = (id: number) => {
  revalidate(getGoods.key)
  revalidate(getGood.keyFor(id))
}

const DeleteGoodModalButton = DeleteButton<Good>("商品", deleteGood, onRevalidate);

const CreateGoodModal: Component<{ open: Signal<boolean> }> = (props) => {
  const [open, setOpen] = props.open
  const theme = useTheme()

  const emptyGood = {
    category_id: 0,
    name: "",
    price: 0,
    imgs: [] as string[],
    description: "",
    specification: "",
    detail: "",
  };

  const categories = createAsync(() => getCategories());
  const [price, setPrice] = createSignal("0");
  const [good, setGood] = createStore(emptyGood);
  const imgsSignal = createSignal<string[]>([]);
  const [imgs, setImgs] = imgsSignal;
  createEffect(() => {
    setGood("imgs", [...imgs()]);
  })
  createEffect(() => {
    setGood("price", parseFloat(price()))
  })

  const { newErrorAlert, newWarningAlert, newSuccessAlert } = AlertsStore();

  const onSubmit = () => {
      if (Number.isNaN(good.price)) {
        newWarningAlert("价格不合法")
        return
      }
      // TODO: validate data

    createGood(good.name, good.price, good.imgs, good.description, good.specification, good.detail, good.category_id).then((res) => {
      newSuccessAlert("创建成功")
      revalidate(getGoods.key)
      onCancel()
    }).catch((err) => {
      console.log(err)
      newErrorAlert(`创建失败：${err}`)
    })
  }

  const onCancel = () => {
    setGood(emptyGood);
    setPrice("0");
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
          添加菜单项
        </Typography>

        <div class='flex flex-col gap-2'>
          <InputLabel>商品名称</InputLabel>
          <TextField
            size='small'
            label="商品名称"
            value={good.name}
            onChange={(_event, value) => {
              setGood("name", value)
            }} />

          <InputLabel>商品类别</InputLabel>
          <Select
            labelId="usergroup-select"
            size="small"
            value={good.category_id}
            label="商品类别"
            onChange={(e) => setGood("category_id", e.target.value)}
          >
            <For each={categories()}>{(item) =>
              <>
                <MenuItem value={item.id}>{item.name}</MenuItem>
              </>}
            </For>
          </Select>

          <InputLabel>图片</InputLabel>
          <ImgInput imgs={imgsSignal} />

          <InputLabel>商品价格</InputLabel>
          <TextField
            size='small'
            label="商品价格"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">¥</InputAdornment>
              ),
            }}
            value={price()}
            onChange={(_event, value) => {
              setPrice(value)
            }} />

          <InputLabel>描述</InputLabel>
          <TextField
            size='small'
            label="描述"
            value={good.description}
            onChange={(_event, value) => {
              setGood("description", value);
            }}
          />

          <InputLabel>规格参数</InputLabel>
          <TextField
            size='small'
            label="规格参数"
            value={good.specification}
            onChange={(_event, value) => {
              setGood("specification", value);
            }}
          />

          <InputLabel>详细信息</InputLabel>
          <TextField
            size='small'
            label="详细信息"
            value={good.detail}
            onChange={(_event, value) => {
              setGood("detail", value);
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

const GoodPage: Component = () => {
  return <>
    <GoodPaper />
    {/* <UserGroupPaper />
    <ManagerAcountPaper /> */}
  </>
}

const GoodCard: Component<{ id: number, setUpdateTarget: Setter<Good | undefined> }> = (props) => {
  const { id, setUpdateTarget } = props;
  const good = createAsync(() => getGood(id))

  return <>
    <Card sx={{ display: "flex", padding: 2, gap: 2, alignItems: "center" }}>
      <CardMedia component="img" src={good()?.imgs[0]} alt="good-img" sx={{ width: 80 }} />
      <div class="flex flex-col flex-1">
        <div class="flex gap-2">
          <span class="font-bold text-lg">{good()?.name}</span>
          <span class="text-xs text-[#999999]">id: {good()?.id}</span>
        </div>
        <span class="text-sm text-[#999999]">{good()?.description}</span>
        <span>规格参数：{good()?.specification}</span>
        <span>详细信息：{good()?.detail}</span>
      </div>
      <span class="max-w-20 overflow-hidden text-ellipsis">价格：¥{good()?.price}</span>
      <CardActions>
        <Show when={good() != undefined}>
          <ButtonGroup>
            <Button onClick={() => setUpdateTarget(good()!)}>
              <Edit />
            </Button>
            <DeleteGoodModalButton target={() => good()!}>
              <Delete />
            </DeleteGoodModalButton>
          </ButtonGroup>
        </Show>
      </CardActions>
    </Card>
  </>
}

const GoodPaper: Component = () => {
  const createShow = createSignal(false);
  const [getCreateShow, setCreateShow] = createShow;
  const updateTarget = createSignal<Good | undefined>();
  const [getUpdateTarget, setUpdateTarget] = updateTarget;

  const goods = createAsync(() => getGoods());
  // const menuItems = createAsync(() => getMenuItems());

  return <>
    <CreateGoodModal open={createShow} />
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
        <Button onClick={() => { resetDb() }} color="error">重置数据库<Restore /></Button>
      </ButtonGroup>
      <div class="flex flex-col w-full gap-2">
        <For each={goods()}>{(item) =>
          <>
            <GoodCard id={item.id} setUpdateTarget={setUpdateTarget} />
          </>
        }</For>
      </div>
    </Paper>
  </>
}

const GoodCategoryPaper: Component = () => {
  const createShow = createSignal(false);
  const [getCreateShow, setCreateShow] = createShow;
  const updateTarget = createSignal<Manager | undefined>();
  const [getUpdateTarget, setUpdateTarget] = updateTarget;
  const updatePasswordTarget = createSignal<Manager | undefined>();
  const [getUpdatePasswordTarget, setUpdatePasswordTarget] = updatePasswordTarget;

  const usergroups = createAsync(() => getUsergroups());
  const managers = createAsync(() => getManagers());
  const { manager } = AdminLoginInfoStore();

  return <>
    <CreateManagerModal open={createShow} />
    <UpdateManagerModal target={updateTarget} />
    {/* <UpdateManagerPasswordModal target={updatePasswordTarget} /> */}
    {/* <DeleteManagerModal target={deleteTarget} /> */}

    <Paper sx={{
      padding: 2,
      display: "flex",
      flexDirection: "column",
      gap: 2
    }}>
      <Typography variant="h6">用户列表</Typography>
      <ButtonGroup>
        <Button onClick={() => { setCreateShow(true) }}>添加用户<Add /></Button>
        <Button onClick={() => { resetDb() }}>重置数据库<Restore /></Button>
      </ButtonGroup>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>用户名</TableCell>
              <TableCell>用户组</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <For each={managers()}>
              {(item) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell>
                    <span class="text-md">{item.username}</span>
                    <Show when={item.id == 0}>
                      <Chip label="Super Admin" color="error" size="small" sx={{ marginLeft: 1 }} />
                    </Show>
                    <Show when={item.id == manager()?.id}>
                      <Chip label="You" color="primary" size="small" sx={{ marginLeft: 1 }} />
                    </Show>

                  </TableCell>
                  <TableCell component="th" scope="row">
                    <span>{usergroups()!.find(g => g.id == item.usergroup)!.name}</span>
                  </TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <Button onClick={() => setUpdateTarget(item)} disabled={item.id == 0 || manager()?.id != 0}>
                        <Edit />
                      </Button>
                      <Button onClick={() => setUpdatePasswordTarget(item)} disabled={item.id == 0 || manager()?.id != 0}>
                        <Key />
                      </Button>
                      <DeleteManagerModalButton target={() => item} disabled={() => item.id == 0 || manager()?.id != 0}><Delete /></DeleteManagerModalButton>
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

export default GoodPage;