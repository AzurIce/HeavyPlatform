import { Add, Delete, Edit, Restore } from "@suid/icons-material";
import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@suid/material";
import { Component, For, createSignal } from "solid-js";
import { createAsync } from "@solidjs/router";
import { Good, GoodCategory, getGoodCategories, resetAllData, getGoodGroupIds } from "../../../../lib/store";

import { CreateGoodCategoryModal, CreateGoodModal, DeleteGoodCategoryModalButton, GoodGroupCard, UpdateGoodCategoryModal, UpdateGoodModal } from "./components";


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

export default GoodPage;