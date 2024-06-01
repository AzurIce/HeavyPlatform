import { managers, menuItems, usergroups } from '../../db';
import { Manager, MenuItem, Usergroup } from '../../store'

export async function login(username: string, password: string): Promise<Manager> {
  const manager = await managers.getByUsername(username);
  if (manager?.password != password) {
    return Promise.reject("username or password incorrect");
  }
  return Promise.resolve(manager);
}

// Managers
export async function createManager(username: string, password: string): Promise<void> {
  return await managers.create(username, password);
}

export async function updateManager(id: number, username: string, usergroup: number): Promise<void> {
  return await managers.update(id, username, usergroup);
}

export async function updateManagerPassword(id: number, password: string): Promise<void> {
  return await managers.updatePassword(id, password);
}

export async function getManagerAll(): Promise<Manager[]> {
  return await managers.getAll();
}

export async function getManagerById(id: number): Promise<Manager> {
  const manager = await managers.getById(id);
  if (manager == undefined) {
    return Promise.reject("usergroup not exist");
  } else {
    return manager;
  }
}

export async function deleteManager(id: number): Promise<void> {
  return await managers.delete(id);
}

// MenuItems
export async function createMenuItem(name: string, icon: string, url: string): Promise<void> {
  return await menuItems.create(name, icon, url);
}

export async function updateMenuItem(id: number, name: string, icon: string, url: string, display: boolean): Promise<void> {
  return await menuItems.update(id, name, icon, url, display);
}

export async function getMenuItemAll(): Promise<MenuItem[]> {
  return await menuItems.getAll();
}

export async function deleteMenuItem(id: number): Promise<void> {
  return await menuItems.delete(id);
}

// Usergroups
export async function createUsergroup(name: string, access: number[]): Promise<void> {
  return await usergroups.create(name, access);
}

export async function updateUsergroup(id: number, name: string, access: number[]): Promise<void> {
  return await usergroups.update(id, name, access);
}

export async function getUsergroupById(id: number): Promise<Usergroup> {
  const usergroup = await usergroups.getById(id);
  if (usergroup == undefined) {
    return Promise.reject("usergroup not exist");
  } else {
    return usergroup;
  }
}

export async function getUsergroupAll(): Promise<Usergroup[]> {
  return await usergroups.getAll();
}

export async function deleteUsergroup(id: number): Promise<void> {
  return await usergroups.delete(id);
}