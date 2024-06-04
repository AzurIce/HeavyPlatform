import { LocalStoragePreset } from "lowdb/browser";

import 寻访凭证 from "../../assets/寻访凭证.png";
import 中坚寻访凭证 from "../../assets/中坚寻访凭证.png";

// Delete only sets the corresponding index to undefined,
// in this way we can make sure the id of the manager is corresponding to it's index
type Data = {
  usergroups: (Usergroup | undefined)[]
  managers: (Manager | undefined)[]
  menuItems: (MenuItem | undefined)[]

  goods: (Good | undefined)[]
  goodCategories: (GoodCategory | undefined)[]
}

const defaultData: Data = {
  usergroups: [{ id: 0, name: "默认用户组", access: [0] }],
  managers: [{ id: 0, usergroup: 0, username: "admin", password: "admin" }],
  menuItems: [{ id: 0, name: "主页", icon: "file-unknown", url: "/", enable: true }],
  goods: [
    // 【明日方舟 - 0】寻访凭证 & 中坚寻访凭证
    {
      id: 0,
      parent_id: 0,
      category_id: 0,
      name: "寻访凭证",
      price: 10,
      imgs: [寻访凭证],
      description: "罗德岛人事部颁发的许可书，可从猎头公司招聘一位干员。",
      specification: "获得方式：采购中心、任务奖励",
      detail: "相比罗德岛，猎头公司有着更广的人脉与资源。他们或许比罗德岛更擅长从各个领域发掘人才，而这也是人事部愿意支付高额佣金的唯一原因。"
    },
    {
      id: 1,
      parent_id: 0,
      category_id: 0,
      name: "中坚寻访凭证",
      price: 7,
      imgs: [中坚寻访凭证],
      description: "罗德岛人事部特别批发的许可书，可以招揽一位中坚人才。",
      specification: "获得方式：采购中心、任务奖励",
      detail: "罗德岛的发展离不开中坚力量的辅助与支持，该寻访条目可以协助博士在一定范围内招揽特定的人才。"
    },
    // 【犹格索托斯的庭院 - 1】商人星野
    {
      id: 2,
      parent_id: 2,
      category_id: 1,
      name: "犹格索托斯的庭院 商人星野",
      price: 7,
      imgs: [中坚寻访凭证],
      description: "已经......回不去了......",
      specification: "不会真的有人会买店老板吧",
      detail: "只要钱到位，老板也可以买下来"
    },
  ],
  goodCategories: [{
    id: 0,
    name: "明日方舟",
    goods: [0]
  }]
};

const db = LocalStoragePreset<Data>("db", defaultData);

export const resetDb = () => {
  db.data = defaultData;
  db.write();
}

const getAll = async function <T>(target: { data: () => (T | undefined)[] }): Promise<T[]> {
  const elements = target.data().filter((el) => el != undefined) as T[];
  return elements;
}

const getById = async function <T>(target: { data: () => (T | undefined)[] }, id: number): Promise<T> {
  console.log()
  const element = target.data()[id];
  if (element == undefined) {
    return Promise.reject("record not exist");
  }
  return element;
}

const deleteById = async function <T>(target: { data: () => (T | undefined)[] }, id: number): Promise<void> {
  if (await getById(target, id) == undefined) {
    return Promise.reject("record not exist");
  }

  target.data()[id] = undefined;
  db.write();
}

const newId = async function <T extends { id: number }>(target: { data: () => (T | undefined)[] }): Promise<number> {
  let id = target.data().findIndex((el) => el == undefined);
  return id == -1 ? target.data().length : id;
}

const create = async function <T extends { id: number }>(target: { data: () => (T | undefined)[] }, element: T): Promise<void> {
  target.data().push(element);
  db.write();
}

const update = async function <T extends { id: number }>(target: { data: () => (T | undefined)[] }, element: T): Promise<void> {
  if (await getById(target, element.id) == undefined) {
    return Promise.reject("good not exist");
  }

  // ! we can't update the object attribute only, we need to replace this object
  target.data()[element.id] = { ...element }
  db.write();
}

// ------------------------------------- //

// good
export type Good = {
  id: number,
  parent_id: number | undefined,
  category_id: number | undefined,
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
  goods: number[],
}

export const goods = {
  data: () => db.data.goods,
  getAll: async function () { return await getAll(this) },
  getById: async function (id: number) { return await getById(this, id) },
  delete: async function (id: number) { await deleteById(this, id); },

  getByGroupId: async function (group_id: number): Promise<Good[]> {
    const goods = await getAll(this);
    return goods.filter((el) => el.parent_id == group_id);
  },
  getByCategoryId: async function (category_id: number): Promise<Good[]> {
    const goods = await getAll(this);
    return goods.filter((el) => el.category_id == category_id);
  },

  create: async function (name: string, price: number, imgs: string[], description: string, specification: string, detail: string, category_id: number): Promise<void> {
    const id = await newId(this);

    const element: Good = { id, parent_id: id, category_id, name, price, imgs, description, specification, detail };
    return await create(this, element);
  },

  update: async function (id: number, name: string, price: number, imgs: string[], description: string, specification: string, detail: string, category_id: number): Promise<void> {
    const element: Good = { id, parent_id: id, category_id, name, price, imgs, description, specification, detail };
    return await update(this, element);
  },

  // join `another_id`'s goodgroup into `id`'s goodgroup
  join: async function (id: number, another_id: number): Promise<void> {
    const parentGood = await this.getById(id);

    const childGoods = await this.getByGroupId(another_id);
    for (let good of childGoods) {
      good.parent_id = parentGood.parent_id;
      await update(this, good);
    }
  },
  disjoin: async function (id: number) {
    const good = await this.getById(id);
    await update(this, good);
  }
}

// MenuItem
type MenuItem = {
  id: number,
  name: string,
  icon: string,
  url: string,
  enable: boolean,
}

export const menuItems = {
  data: () => db.data.menuItems,
  getAll: async function () { return await getAll(this) },
  getById: async function (id: number) { return await getById(this, id) },

  create: async function (name: string, icon: string, url: string): Promise<void> {
    const id = await newId(this);

    const element: MenuItem = { id, name, icon, url, enable: true };
    return await create(this, element);
  },

  update: async function (id: number, name: string, icon: string, url: string, enable: boolean): Promise<void> {
    // if (id == 0) return Promise.reject("cannot modify default menuItem")
    const element: MenuItem = { id, name, icon, url, enable };
    return await update(this, element);
  },

  delete: async function (id: number): Promise<void> {
    if (id == 0) return Promise.reject("cannot delete default menuItem")
    await deleteById(this, id);
    for (let usergroup of usergroups.data()) {
      if (usergroup != undefined) {
        usergroup.access = usergroup.access.filter((id) => db.data.menuItems[id] != undefined)
      }
    }
    db.write();
  }
}

// Usergroup
type Usergroup = {
  id: number,
  name: string,
  access: number[] // 可以访问的菜单项 id
}

export const usergroups = {
  data: () => db.data.usergroups,
  getAll: async function () { return await getAll(this); },
  getById: async function (id: number) { return await getById(this, id); },

  create: async function (name: string, access: number[]): Promise<void> {
    for (let id of access) {
      if (await menuItems.getById(id) == undefined) {
        return Promise.reject("menu item not exist");
      }
    }
    const id = await newId(this);

    const element: Usergroup = { id, name, access };
    return await create(this, element);
  },

  update: async function (id: number, name: string, access: number[]): Promise<void> {
    for (let id of access) {
      if (await menuItems.getById(id) == undefined) {
        return Promise.reject("menu item not exist");
      }
    }

    const element: Usergroup = { id, name, access };
    return await update(this, element);
  },

  delete: async function (id: number): Promise<void> {
    if (id == 0) return Promise.reject("cannot delete default usergroup")
    await deleteById(this, id);

    for (let manager of managers.data()) {
      if (manager != undefined && manager.usergroup == id) {
        manager.usergroup = 0;
      }
    }
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

export const managers = {
  data: () => db.data.managers,
  getAll: async function () { return await getAll(this) },
  getById: async function (id: number) { return await getById(this, id) },
  getByUsername: async function (username: string): Promise<Manager | undefined> {
    const manager = db.data.managers.find((manager) => manager?.username == username);
    return manager;
  },

  create: async function (username: string, password: string, usergroup: number): Promise<void> {
    if (await this.getByUsername(username) != undefined) {
      return Promise.reject("username already exists");
    }
    const id = await newId(this);

    const manager: Manager = { id, username, password, usergroup: usergroup || 0 };
    return await create(this, manager);
  },

  update: async function (id: number, username: string, usergroup: number): Promise<void> {
    let manager = await this.getById(id);
    if (manager == undefined) {
      return Promise.reject("manager not exist");
    }

    const _manager: Manager = { ...manager, username, usergroup }
    return await update(this, _manager);
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