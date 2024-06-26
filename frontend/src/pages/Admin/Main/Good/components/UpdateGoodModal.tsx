import { Box, Button, InputAdornment, InputLabel, MenuItem, Modal, Select, TextField, Typography, useTheme } from "@suid/material";
import { Component, For, Signal, createEffect, createSignal } from "solid-js";
import { AlertsStore, Good, getGoodCategories, getGoodGroupIds, getGoods, getGoodsByGroupId } from "../../../../../lib/store";
import { createAsync, revalidate } from "@solidjs/router";
import { createStore } from "solid-js/store";
import { goodsApi } from "../../../../../lib/axios/api";
import ImgInput from "../../../../../components/ImgInput";

const GoodGroupGoods: Component<{ id: number }> = (props) => {
  const goods = createAsync(() => getGoodsByGroupId(props.id));

  return <>
    <div class="flex gap-2">
      <For each={goods()}>{(item) =>
        <span> {item.name} </span>
      }</For>
    </div>
  </>
}

export const UpdateGoodModal: Component<{ target: Signal<Good | undefined> }> = (props) => {
  const [target, setTarget] = props.target
  const theme = useTheme()

  const emptyGood: Good = {
    id: 0,
    parent_id: 0,
    category_id: 0,
    name: "",
    price: 0,
    imgs: [] as string[],
    description: "",
    specification: "",
    detail: "",
  };

  const categories = createAsync(() => getGoodCategories());
  const [price, setPrice] = createSignal("0");
  const [good, setGood] = createStore(emptyGood);
  const imgsSignal = createSignal<string[]>([]);
  const [imgs, setImgs] = imgsSignal;
  createEffect(() => {
    if (target() != undefined) {
      setGood({ ...target()! });
      setPrice(target()!.price.toString());
      setImgs([...target()!.imgs]);
    }
  })
  createEffect(() => {
    setGood("imgs", [...imgs()]);
  })
  createEffect(() => {
    setGood("price", parseFloat(price()))
  })

  const goodGroupIds = createAsync(() => getGoodGroupIds());

  const { newErrorAlert, newWarningAlert, newSuccessAlert } = AlertsStore();

  const onSubmit = () => {
    if (Number.isNaN(good.price)) {
      newWarningAlert("价格不合法")
      return
    }
    // TODO: validate data

    goodsApi.update(good.id, good.name, good.price, good.imgs, good.description, good.specification, good.detail, good.category_id).then((res) => {
      newSuccessAlert("更新成功")
      revalidate(getGoods.key)
      onCancel()
    }).catch((err) => {
      console.log(err)
      newErrorAlert(`更新失败：${err}`)
    })
  }

  const onCancel = () => {
    setGood(emptyGood);
    setPrice("0");
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

          {/* <InputLabel>商品组</InputLabel>
          <Select
            size="small"
            value={good.parent_id}
            label="商品组"
            onChange={(e) => setGood("parent_id", e.target.value)}
          >
            <For each={goodGroupIds()}>{(item) =>
              <>
                <MenuItem value={item}>
                  <GoodGroupGoods id={item} />
                </MenuItem>
              </>}
            </For>
          </Select> */}

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
