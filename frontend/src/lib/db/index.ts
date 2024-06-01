import { LocalStoragePreset } from "lowdb/browser";

// Delete only sets the corresponding index to undefined,
// in this way we can make sure the id of the manager is corresponding to it's index
type Data = {
  usergroups: (Usergroup | undefined)[]
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

// Usergroup
type Usergroup = {
  id: number,
  name: string,
  access: number[] // 可以访问的菜单项 id
}

const usergroups = {
  getAll: async function (): Promise<Usergroup[]> {
    let elements = data.usergroups().filter((el) => el != undefined) as Usergroup[];

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

    const element: Usergroup = { id, name, access };
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
  getAll: async function (): Promise<Manager[]> {
    let elements = data.managers().filter((el) => el != undefined) as Manager[];

    elements = elements.map(manager => {
      if (db.data.usergroups[manager.usergroup] == undefined) {
        manager.usergroup = 0;
      }
      return manager;
    });

    db.data.managers = elements;
    db.write();

    return elements;
  },
  getById: async function (id: number): Promise<Manager> {
    let manager = data.managers()[id];
    if (manager == undefined) {
      return Promise.reject("manager not exist");
    }

    if (db.data.usergroups[manager.usergroup] == undefined) {
      manager.usergroup = 0;
      db.data.managers[id] = {...manager, usergroup: 0}
      db.write();
    }

    return manager;
  },
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

  update: async function (id: number, username: string, usergroup: number): Promise<void> {
    let manager = await this.getById(id);
    if (manager == undefined) {
      return Promise.reject("manager not exist");
    }

    const _manager: Manager = { ...manager, username, usergroup }

    db.data.managers[id] = _manager;
    db.write();
  },

  updatePassword: async function (id: number, password: string): Promise<void> {
    let manager = await this.getById(id);
    if (manager == undefined) {
      return Promise.reject("manager not exist");
    }

    // Have to reconstruct the object, otherwise <For> won't react
    const _manager: Manager = { ...manager, password }
    db.data.managers[id] = _manager;
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