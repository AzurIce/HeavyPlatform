import { managers, menuItems } from '../../db';
import { Manager, MenuItem } from '../../store'

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

export async function updateManager(id: number, username: string, password: string): Promise<void> {
  return await managers.update(id, username, password);
}

export async function getManagerAll(): Promise<Manager[]> {
  return await managers.getAll();
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