import { Add, Delete, Edit, Restore } from "@suid/icons-material";
import { Chip, Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@suid/material";
import { Component, For, Show, createEffect, createSignal } from "solid-js";
import { createAsync } from "@solidjs/router";
import { AdminLoginInfoStore, LoginInfoStore, Manager, Usergroup, getManagers, getMenuItems, getUsergroup, getUsergroups } from "../../../lib/store";

import CreateManagerModal from "../../../components/Manager/CreateManagerModal";
import UpdateManagerModal from "../../../components/Manager/UpdateManagerModal";
import { DeleteManagerModalButton } from "../../../components/Manager";
import { resetDb } from "../../../lib/db";
import CreateUsergroupModal from "../../../components/Usergroup/CreateUsergroupModal";
import UpdateUsergroupModal from "../../../components/Usergroup/UpdatUsergroupModal";
import { DeleteUsergroupModalButton } from "../../../components/Usergroup";

const AccountPage: Component = () => {
  return <>
    <UserGroupPaper />
    <ManagerAcountPaper />
  </>
}

const UserGroupPaper: Component = () => {
  const createShow = createSignal(false);
  const [getCreateShow, setCreateShow] = createShow;
  const updateTarget = createSignal<Usergroup | undefined>();
  const [getUpdateTarget, setUpdateTarget] = updateTarget;

  const usergroups = createAsync(() => getUsergroups());
  const menuItems = createAsync(() => getMenuItems());

  return <>
    <CreateUsergroupModal open={createShow} />
    <UpdateUsergroupModal target={updateTarget} />
    {/* <DeleteManagerModal target={deleteTarget} /> */}

    <Paper sx={{
      padding: 2,
      display: "flex",
      flexDirection: "column",
      gap: 2
    }}>
      <Typography variant="h6">用户组列表</Typography>
      <ButtonGroup>
        <Button onClick={() => { setCreateShow(true) }}>添加用户组<Add /></Button>
        <Button onClick={() => { resetDb() }}>重置数据库<Restore /></Button>
      </ButtonGroup>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>名称</TableCell>
              <TableCell>可访问菜单项</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <For each={usergroups()}>
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
                  <TableCell sx={{ maxWidth: 10 }}>
                    <Show when={menuItems() != undefined}>
                      <div class="flex overflow-x-scroll">
                        <For each={item.access}>{(id) => <>
                          <Chip label={menuItems()!.find(item => item.id == id)!.name} size="small" sx={{ marginRight: 1 }} />
                        </>}</For>
                      </div>
                    </Show>
                  </TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <Button onClick={() => setUpdateTarget(item)} disabled={item.id == 0}>
                        <Edit />
                      </Button>
                      <DeleteUsergroupModalButton target={() => item} disabled={() => item.id == 0}>
                        <Delete />
                      </DeleteUsergroupModalButton>
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
}

const UsergroupCell: Component<{id: number}> = (props) => {
  const usergroup = createAsync(() => getUsergroup(props.id));
  return <>
    <Show when={usergroup() != undefined}>
      <span>{usergroup()!.name}</span>
    </Show>
  </>
}

const ManagerAcountPaper: Component = () => {
  const createShow = createSignal(false);
  const [getCreateShow, setCreateShow] = createShow;
  const updateTarget = createSignal<Manager | undefined>();
  const [getUpdateTarget, setUpdateTarget] = updateTarget;

  const managers = createAsync(() => getManagers());
  const { manager } = AdminLoginInfoStore();

  return <>
    <CreateManagerModal open={createShow} />
    <UpdateManagerModal target={updateTarget} />
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
                    <UsergroupCell id={item.usergroup} />
                  </TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <Button onClick={() => setUpdateTarget(item)} disabled={item.id == 0 || manager()?.id != 0}>
                        <Edit />
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

export default AccountPage;