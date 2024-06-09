import { cache, revalidate } from "@solidjs/router";
import { AlertColor } from "@suid/material/Alert";
import { createStore } from "solid-js/store";
import { Trie } from "./trie";

const adminLoginInfoStore = createStore<{manager?: Manager}>()
const adminLoginInfoStoreInit = () => {
  const [_, _setAdminLoginInfo] = adminLoginInfoStore;

  console.log("[AdminLoginInfoStore/init]")
  const managerString = localStorage.getItem('manager')
  if (!managerString) return

  console.log('[AdminLoginInfoStore/init]: loading from localStorage')
  const manager = JSON.parse(managerString) as unknown as Manager
  _setAdminLoginInfo({ manager })
}
adminLoginInfoStoreInit();

export const AdminLoginInfoStore = () => {
  const [adminLoginInfo, _setAdminLoginInfo] = adminLoginInfoStore;

  const manager = () => adminLoginInfo.manager

  const setManager = (manager: Manager) => {
    _setAdminLoginInfo({ manager })
    localStorage.setItem('manager', JSON.stringify(manager))
  }

  const logout = () => {
    _setAdminLoginInfo({ manager: undefined })
    localStorage.removeItem('manager')
  }

  return { manager, setManager, logout }
}

const loginInfoStore = createStore<{user?: User}>()
const loginInfoStoreInit = () => {
  const [_, _setLoginInfo] = loginInfoStore;

  console.log("[LoginInfoStore/init]")
  const s = localStorage.getItem('manager')
  if (!s) return

  console.log('[LoginInfoStore/init]: loading from localStorage')
  const user = JSON.parse(s) as unknown as User
  _setLoginInfo({ user })
}
loginInfoStoreInit();

export const LoginInfoStore = () => {
  const [loginInfo, _setLoginInfo] = loginInfoStore;

  const user = () => loginInfo.user

  const setUser = (user: User) => {
    _setLoginInfo({ user })
    localStorage.setItem('user', JSON.stringify(user))
  }

  const logout = () => {
    _setLoginInfo({ user: undefined })
    localStorage.removeItem('user')
  }

  return { user, setUser, logout }
}

export type Alert = {
  type: AlertColor,
  msg: string
}

const alertsStore = createStore<Alert[]>([])
export const AlertsStore = () => {
  const [alerts, setAlerts] = alertsStore;

  const addAlert = (alert: Alert) => {
    setAlerts([...alerts, alert])
  }
  const delAlert = (index: number) => {
    setAlerts(alerts.filter((alert, i) => i != index))
  }

  const newErrorAlert = (msg: string) => {
    addAlert({ type: 'error', msg })
  }
  const newWarningAlert = (msg: string) => {
    addAlert({ type: 'warning', msg })
  }
  const newInfoAlert = (msg: string) => {
    addAlert({ type: 'info', msg })
  }
  const newSuccessAlert = (msg: string) => {
    addAlert({ type: 'success', msg })
  }
  return { alerts, addAlert, delAlert, newErrorAlert, newWarningAlert, newInfoAlert, newSuccessAlert }
}

// Manager
export type Manager = {
  id: number,
  username: string,
  usergroup: number
}

export const getManagers = cache(async () => {
  const res = await managersApi.getAll();
  // console.log("cache: getManagers: ", res)
  return res
}, "managers");

export const getManager = cache(async (id: number) => {
  return await managersApi.getById(id);
}, "manager");

// User
export type User = {
  id: number,
  nickname: string,
  avatar: string,
  username: string,
}

export const getUsers = cache(async () => {
  return await usersApi.getAll();
}, "users");

export const getUser = cache(async (id: number) => {
  return await usersApi.getById(id);
}, "user");

// MenuItem
export type MenuItem = {
  id: number,
  name: string,
  icon: string,
  url: string,
  enable: boolean
}

export const getMenuItems = cache(async () => {
  return await menuItemsApi.getAll()
}, "menuItems");

// Usergroup
export type Usergroup = {
  id: number,
  name: string,
  access: number[]
}

export const getUsergroups = cache(async () => {
  return await userGroupsApi.getAll();
}, "usergroups");

export const getUsergroup = cache(async (id: number) => {
  return await userGroupsApi.getById(id);
}, "usergroup");

export type Good = {
  id: number,
  parent_id: number,
  category_id: number,
  name: string,
  price: number,
  imgs: string[],        // 详情页首部的图片
  description: string,   // 对应副标题位置的描述
  specification: string, // 参数，偷懒，直接整个 string 得了
  detail: string         // 详细信息
}

export type GoodCategory = {
  id: number,
  name: string,
}

export const getGoods = cache(async () => {
  return await goodsApi.getAll();
}, "goods")

export const getGood = cache(async (id: number) => {
  return await goodsApi.getById(id);
}, "good")

export const getGoodsByGroupId = cache(async (id: number) => {
  return await goodsApi.getByGroupId(id);
}, "goodsByGroupId");

export const getGoodGroupIds = cache(async () => {
  return await goodsApi.getAllGroupId();
}, "goodGroupIds")


export const getGoodCategories = cache(async () => {
  return await goodCategoriesApi.getAll();
}, "categories")

export const getGoodCategorie = cache(async (id: number) => {
  return await goodCategoriesApi.getById(id);
}, "categorie")


// CartItem
export type CartItem = {
  id: number,
  good_id: number,
  user_id: number,
  quantity: number,
}

export const getCartItems = cache(async () => {
  return await cartItemsApi.getAll();
}, "cartItems")

export const getCartItem = cache(async (id: number) => {
  return await cartItemsApi.getById(id);
}, "cartItem")

export const createCartItem = cache(async (user_id: number, good_id: number, quantity: number) => {
  await cartItemsApi.create(user_id, good_id, quantity);
  // 更新缓存中的数据，确保缓存的一致性
  const updatedCartItems = await cartItemsApi.getAll();
  cache.set("cartItems", updatedCartItems);
}, "createCartItem");

export const deleteCartItem = cache(async (id: number) => {
  await cartItemsApi.delete(id);
  // 更新缓存中的数据，确保缓存的一致性
  const updatedCartItems = await cartItemsApi.getAll();
  cache.set("cartItems", updatedCartItems);
}, "deleteCartItem");



// Order
export type Order = {
  id: number,
  user_id: number,
  items: CartItem[]
}

export const getOrders = cache(async () => {
  return await ordersApi.getAll();
}, "orders")

export const getOrder = cache(async (id: number) => {
  return await ordersApi.getById(id);
}, "order")

export const createOrder = cache(async (user_id: number, items: CartItem[]) => {
  await ordersApi.create(user_id, items);
  // 更新缓存中的数据，确保缓存的一致性
  const updatedOrders = await ordersApi.getAll();
  cache.set("orders", updatedOrders);
}, "createOrder");

export const deleteOrder = cache(async (id: number) => {
  await ordersApi.delete(id);
  // 更新缓存中的数据，确保缓存的一致性
  const updatedOrders = await ordersApi.getAll();
  cache.set("orders", updatedOrders);
}, "deleteOrder");


// Icons trie for icon searching
import { icons as tablerIcons } from '@iconify-json/tabler'
import { resetDb } from "./db";
import { cartItemsApi, goodCategoriesApi, goodsApi, managersApi, menuItemsApi, ordersApi, userGroupsApi, usersApi } from "./axios/api";
import { useMediaQuery } from "@suid/material";

const iconsTrie = new Trie();
const _icons = Object.keys(tablerIcons.icons).map(iconName => `${iconName}`);
_icons.forEach(icon => iconsTrie.insert(icon, icon));

export const searchIcons = (prefix: string): string[] => {
  if (prefix.length == 0) {
    return _icons;
  }
  return iconsTrie.search(prefix)
}

export const resetAllData = () => {
  resetDb()
  revalidate(getManagers.key)
  revalidate(getManager.key)
  revalidate(getMenuItems.key)
  revalidate(getUsergroups.key)
  revalidate(getUsergroup.key)
  revalidate(getGoods.key)
  revalidate(getGood.key)
  revalidate(getGoodsByGroupId.key)
  revalidate(getGoodCategories.key)
}
export const isMobile = useMediaQuery("(max-width: 600px)")
