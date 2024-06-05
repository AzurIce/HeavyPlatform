import { Add, Delete, Edit, Restore } from "@suid/icons-material";
import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Switch } from "@suid/material";
import { Component, For, createSignal } from "solid-js";
import { createAsync, revalidate } from "@solidjs/router";
import { MenuItem, getMenuItems } from "../../../../lib/store";

import { resetDb } from "../../../../lib/db";
import CreateMenuItemModal from "../../../../components/Admin/MenuItem/CreateMenuItemModal";
import UpdateMenuItemModal from "../../../../components/Admin/MenuItem/UpdateMenuItemModal";
import { DeleteMenuItemModalButton } from "../../../../components/Admin/MenuItem";
import { updateMenuItem } from "../../../../lib/axios/api";
import { Icon } from "@iconify-icon/solid";

const MenuItemPage: Component = () => {
  const createShow = createSignal(false);
  const [getCreateShow, setCreateShow] = createShow;
  const updateTarget = createSignal<MenuItem | undefined>();
  const [getUpdateTarget, setUpdateTarget] = updateTarget;

  const menuItems = createAsync(() => getMenuItems());

  const onToggleItemDisplay = (item: MenuItem) => {
    updateMenuItem(item.id, item.name, item.icon, item.url, !item.enable).then((res) => {
      revalidate(getMenuItems.key);
    }).catch((err) => {
      console.log(err)
      // TODO: Alert
    })
  }

  return <>
    <CreateMenuItemModal open={createShow} />
    <UpdateMenuItemModal target={updateTarget} />

    <Paper sx={{
      padding: 2,
      display: "flex",
      flexDirection: "column",
      gap: 2
    }}>
      <Typography variant="h6">菜单项列表</Typography>
      <ButtonGroup>
        <Button onClick={() => { setCreateShow(true) }}>添加菜单项<Add /></Button>
        <Button onClick={() => { resetDb() }} color="error">重置数据库<Restore /></Button>
      </ButtonGroup>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>显示名称</TableCell>
              <TableCell>是否启用</TableCell>
              <TableCell>图标</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <For each={menuItems()}>
              {(item) => <>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell>
                    <span class="text-md">{item.name}</span>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Switch checked={item.enable} onChange={() => onToggleItemDisplay(item)} />
                  </TableCell>
                  <TableCell>
                    <Icon icon={`tabler:${item.icon}`} height={20} />
                  </TableCell>
                  <TableCell>
                    <span class="text-md">{item.url}</span>
                  </TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <Button onClick={() => setUpdateTarget(item)} disabled={item.id == 0}>
                        <Edit />
                      </Button>
                      <DeleteMenuItemModalButton target={() => item} disabled={() => item.id == 0}><Delete /></DeleteMenuItemModalButton>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              </>}
            </For>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </>
};

export default MenuItemPage;