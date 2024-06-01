import { LocalStoragePreset } from "lowdb/browser";

// Delete only sets the corresponding index to undefined,
// in this way we can make sure the id of the manager is corresponding to it's index
type Data = {
  usergroups: (UserGroup | undefined)[]
  managers: (Manager | undefined)[]
  menuItems: (MenuItem | undefined)[]
}

const defaultData: Data = {
  usergroups: [{ id: 0, name: "默认用户组", access: [0] }],
  managers: [{ id: 0, usergroup: 0, username: "admin", password: "admin" }],
  menuItems: [{ id: 0, name: "主页", icon: "file-unknown", url: "/", enable: true }]
};

const db = LocalStoragePreset<Data>("db", defaultData);

export const resetDb = () => {
  db.data = defaultData;
  db.write();
}

const getAll = function <T>(data: () => (T | undefined)[]): () => Promise<T[]> {
  return async () => {
    const elements = data().filter((el) => el != undefined) as T[];
    return elements;
  }
}
const getById = function <T>(data: () => T[]): (id: number) => Promise<T> {
  return async (id: number) => {
    const element = data()[id];
    return element;
  }
}

type UserGroup = {
  id: number,
  name: string,
  access: number[] // 可以访问的菜单项 id
}

const data = {
  usergroups: () => db.data.usergroups,
  managers: () => db.data.managers,
  menuItems: () => db.data.menuItems,
}

// MenuItem
type MenuItem = {
  id: number,
  name: string,
  icon: string,
  url: string,
  enable: boolean,
}

const menuItems = {
  getAll: getAll(data.menuItems),
  getById: getById(data.menuItems),

  create: async function (name: string, icon: string, url: string): Promise<void> {
    let id = db.data.menuItems.find((el) => el == undefined)?.id || db.data.menuItems.length;

    const element: MenuItem = { id, name, icon, url, enable: true };
    db.data.menuItems.push(element);
    db.write();
  },

  update: async function (id: number, name: string, icon: string, url: string, display: boolean): Promise<void> {
    if (await this.getById(id) == undefined) {
      return Promise.reject("menuItem not exist");
    }

    db.data.menuItems[id] = { id, name, icon, url, enable: display };
    db.write();
  },

  delete: async function (id: number): Promise<void> {
    if (id == 0) return Promise.reject("cannot delete default menuItem")
    if (await this.getById(id) == undefined) {
      return Promise.reject("menuItem not exist");
    }

    db.data.menuItems[id] = undefined;
    db.write();
  }
}

const usergroups = {
  getAll: async function (): Promise<UserGroup[]> {
    let elements = data.usergroups().filter((el) => el != undefined) as UserGroup[];

    elements = elements.map(usergroup => {
      usergroup.access = usergroup.access.filter((id) => db.data.menuItems[id] != undefined)
      return usergroup;
    });

    db.data.usergroups = elements;
    db.write();

    return elements;
  },
  getById: getById(data.usergroups),

  create: async function (name: string, access: number[]): Promise<void> {
    for (let id of access) {
      if (await menuItems.getById(id) == undefined) {
        return Promise.reject("menu item not exist");
      }
    }

    let id = db.data.usergroups.find((el) => el == undefined)?.id || db.data.usergroups.length;
    console.log("candidate id: ", id)

    const element: UserGroup = { id, name, access };
    db.data.usergroups.push(element);
    db.write();
  },

  update: async function (id: number, name: string, access: number[]): Promise<void> {
    if (await this.getById(id) == undefined) {
      return Promise.reject("usergroup not exist");
    }
    for (let id of access) {
      if (await menuItems.getById(id) == undefined) {
        return Promise.reject("menu item not exist");
      }
    }

    db.data.usergroups[id] = { id, name, access };
    db.write();
  },

  delete: async function (id: number): Promise<void> {
    if (id == 0) return Promise.reject("cannot delete default usergroup")
    if (await this.getById(id) == undefined) {
      return Promise.reject("manager not exist");
    }

    db.data.usergroups[id] = undefined;
    db.write();
  }
}

// Type definations
type Manager = {
  id: number,
  usergroup: number,
  username: string,
  password: string,
}

const managers = {
  getAll: getAll(data.managers),
  getById: getById(data.managers),
  getByUsername: async function (username: string): Promise<Manager | undefined> {
    const manager = db.data.managers.find((manager) => manager?.username == username);
    return manager;
  },

  create: async function (username: string, password: string, usergroup?: number): Promise<void> {
    if (await this.getByUsername(username) != undefined) {
      return Promise.reject("username already exists");
    }

    let id = db.data.managers.find((el) => el == undefined)?.id || db.data.managers.length;

    const manager: Manager = { id, username, password, usergroup: usergroup || 0 };
    db.data.managers.push(manager);
    db.write();
  },

  update: async function (id: number, username: string, password: string, usergroup: number): Promise<void> {
    if (await this.getById(id) == undefined) {
      return Promise.reject("manager not exist");
    }

    db.data.managers[id] = { id, username, password, usergroup };
    db.write();
  },

  delete: async function (id: number): Promise<void> {
    if (id == 0) return Promise.reject("cannot delete default manager")
    if (await this.getById(id) == undefined) {
      return Promise.reject("manager not exist");
    }

    db.data.managers[id] = undefined;
    db.write();
  }
}


export { managers, menuItems, usergroups };