import { cache } from "@solidjs/router";
import { AlertColor } from "@suid/material/Alert";
import { createStore } from "solid-js/store";
import { getManagerAll, getMenuItemAll } from "./axios/api";
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

  return { manager, setManager }
}

interface User {
  id: number,
  username: string,
}

const loginInfoStore = createStore<{ jwt?: string, user?: User }>()
const loginInfoStoreInit = () => {
  const [_, _setLoginInfo] = loginInfoStore;

  console.log("[LoginInfoStore/init]")
  const jwt = localStorage.getItem('jwt')
  const userString = localStorage.getItem('user')
  if (!jwt || !userString) return

  console.log('[LoginInfoStore/init]: loading from localStorage')
  const user = JSON.parse(userString) as unknown as User
  _setLoginInfo({ jwt, user})
}
loginInfoStoreInit();

export const LoginInfoStore = () => {
  const [loginInfo, _setLoginInfo] = loginInfoStore;

  const setLoginInfo = (jwt: string, user: User) => {
    console.log('[LoginInfoStore/setLoginInfo]: ', loginInfo)
    _setLoginInfo(() => {
      return { jwt, user }
    })
    localStorage.setItem('jwt', jwt)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const user = () => {
    return loginInfo.user
  }

  const jwt = () => {
    return loginInfo.jwt
  }

  return { loginInfo, setLoginInfo, user, jwt }
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
}

export const getManagers = cache(async () => {
  return await getManagerAll()
}, "managers");

// MenuItem
export type MenuItem = {
  id: number,
  name: string,
  icon: string,
  url: string,
  enable: boolean
}

export const getMenuItems = cache(async () => {
  return await getMenuItemAll()
}, "menuItems");

// Icons trie for icon searching
import { icons as tablerIcons } from '@iconify-json/tabler'

const iconsTrie = new Trie();
const _icons = Object.keys(tablerIcons.icons).map(iconName => `${iconName}`);
_icons.forEach(icon => iconsTrie.insert(icon, icon));

export const searchIcons = (prefix: string): string[] => {
  if (prefix.length == 0) {
    return _icons;
  }
  return iconsTrie.search(prefix)
}