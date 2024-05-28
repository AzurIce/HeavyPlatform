import { managers } from '../../db';
import { Manager } from '../../store'

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

export async function getManagers(): Promise<Manager[]> {
  return await managers.getAll();
}

export async function deleteManager(id: number): Promise<void> {
  return await managers.delete(id);
}