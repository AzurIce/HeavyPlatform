import { cartItemsDb, goodCategoriesDb, goodsDb, managersDb, menuItemsDb, ordersDb, usergroupsDb as userGroupsDb, usersDb } from '../../db';
import { Good, GoodCategory, Manager, MenuItem, User, Usergroup, CartItem, Order } from '../../store'

// Managers
export const managersApi = {
  login: async function (username: string, password: string): Promise<Manager> {
    const manager = await managersDb.getByUsername(username);
    if (manager?.password != password) {
      return Promise.reject("username or password incorrect");
    }
    return Promise.resolve(manager);
  },

  getAll: async function (): Promise<Manager[]> {
    return await managersDb.getAll();
  },

  getByUsername: async function (username: string): Promise<Manager> {
    return await managersDb.getByUsername(username);
  },

  getById: async function (id: number): Promise<Manager> {
    return await managersDb.getById(id);
  },

  create: async function (username: string, password: string, usergroup?: number): Promise<number> {
    return await managersDb.create(username, password, usergroup || 0);
  },

  update: async function (id: number, username: string, usergroup: number): Promise<void> {
    return await managersDb.update(id, username, usergroup);
  },

  updatePassword: async function (id: number, password: string): Promise<void> {
    return await managersDb.updatePassword(id, password);
  },

  delete: async function (id: number): Promise<void> {
    return await managersDb.delete(id);
  }
}

// MenuItems
export const menuItemsApi = {
  getAll: async function (): Promise<MenuItem[]> {
    return await menuItemsDb.getAll();
  },

  create: async function (name: string, icon: string, url: string): Promise<number> {
    return await menuItemsDb.create(name, icon, url);
  },

  update: async function (id: number, name: string, icon: string, url: string, display: boolean): Promise<void> {
    return await menuItemsDb.update(id, name, icon, url, display);
  },

  delete: async function (id: number): Promise<void> {
    return await menuItemsDb.delete(id);
  },
}

// Usergroups
export const userGroupsApi = {
  getAll: async function (): Promise<Usergroup[]> {
    return await userGroupsDb.getAll();
  },

  getById: async function (id: number): Promise<Usergroup> {
    return await userGroupsDb.getById(id);
  },

  delete: async function (id: number): Promise<void> {
    return await userGroupsDb.delete(id);
  },

  create: async function (name: string, access: number[]): Promise<number> {
    return await userGroupsDb.create(name, access);
  },

  update: async function (id: number, name: string, access: number[]): Promise<void> {
    return await userGroupsDb.update(id, name, access);
  },
}

// Users
export const usersApi = {
  login: async function (username: string, password: string): Promise<User> {
    const user = await usersDb.getByUsername(username);
    if (user?.password != password) {
      return Promise.reject("username or password incorrect");
    }
    return Promise.resolve(user);
  },

  getAll: async function (): Promise<User[]> {
    return await usersDb.getAll();
  },

  getByUsername: async function (username: string): Promise<User> {
    return await usersDb.getByUsername(username);
  },

  getById: async function (id: number): Promise<User> {
    return await usersDb.getById(id);
  },

  create: async function (username: string, password: string, nickname: string, avatar: string): Promise<number> {
    return await usersDb.create(username, password, nickname, avatar);
  },

  update: async function (id: number, username: string, nickname: string, avatar: string): Promise<void> {
    return await usersDb.update(id, username, nickname, avatar);
  },

  updatePassword: async function (id: number, password: string): Promise<void> {
    return await usersDb.updatePassword(id, password);
  },

  delete: async function (id: number): Promise<void> {
    return await usersDb.delete(id);
  }
}

// Goods
export const goodsApi = {
  getAll: async function (): Promise<Good[]> {
    return await goodsDb.getAll();
  },

  getAllGroupId: async function (): Promise<number[]> {
    return Array.from(new Set((await goodsDb.getAll()).map(good => good.parent_id)));
  },

  getByGroupId: async function (id: number): Promise<Good[]> {
    return await goodsDb.getByGroupId(id);
  },

  getById: async function (id: number): Promise<Good> {
    return await goodsDb.getById(id);
  },

  delete: async function (id: number): Promise<void> {
    return await goodsDb.delete(id);
  },

  create: async function (
    name: string,
    price: number,
    imgs: string[],
    description: string,
    specification: string,
    detail: string,
    category_id?: number
  ): Promise<number> {
    return await goodsDb.create(name, price, imgs, description, specification, detail, category_id || 0);
  },

  update: async function (
    id: number,
    name: string,
    price: number,
    imgs: string[],
    description: string,
    specification: string,
    detail: string,
    category_id?: number
  ): Promise<void> {
    return await goodsDb.update(id, name, price, imgs, description, specification, detail, category_id || 0);
  },
}

// Categories
export const goodCategoriesApi = {
  getAll: async function (): Promise<GoodCategory[]> {
    return await goodCategoriesDb.getAll();
  },

  getById: async function (id: number): Promise<GoodCategory> {
    return await goodCategoriesDb.getById(id);
  },

  delete: async function (id: number): Promise<void> {
    return await goodCategoriesDb.delete(id);
  },

  create: async function (name: string): Promise<number> {
    return await goodCategoriesDb.create(name);
  },

  update: async function (id: number, name: string): Promise<void> {
    return await goodCategoriesDb.update(id, name);
  },
}

// CartItems
export const cartItemsApi = {
  getAll: async function (): Promise<CartItem[]> {
    return await cartItemsDb.getAll();
  },

  getById: async function (id: number): Promise<CartItem> {
    return await cartItemsDb.getById(id);
  },

  delete: async function (id: number): Promise<void> {
    return await cartItemsDb.delete(id);
  },

  create: async function (user_id: number, good_id: number, quantity: number): Promise<number> {
    return await cartItemsDb.create(user_id, good_id, quantity);
  },

  update: async function (id: number, quantity: number): Promise<void> {
    return await cartItemsDb.update(id, quantity);
  },
}

// Orders
export const ordersApi = {
  getAll: async function (): Promise<Order[]> {
    return await ordersDb.getAll();
  },

  getById: async function (id: number): Promise<Order> {
    return await ordersDb.getById(id);
  },

  delete: async function (id: number): Promise<void> {
    return await ordersDb.delete(id);
  },

  create: async function (user_id: number, items: CartItem[]): Promise<number> {
    return await ordersDb.create(user_id, items);
  },
}