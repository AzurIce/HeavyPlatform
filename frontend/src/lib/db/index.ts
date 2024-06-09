// import { LocalStoragePreset } from "lowdb/browser";
import { GRBackendWrapper } from "./grBackendWrapper";

import 寻访凭证 from "../../assets/寻访凭证.png";
import 中坚寻访凭证 from "../../assets/中坚寻访凭证.png";
import 商人星野 from "../../assets/商人星野.png";
import 凑阿库娅1 from "../../assets/MinatoAqua1.png";
import 凑阿库娅2 from "../../assets/MinatoAqua2.jpg";
import 凑阿库娅3 from "../../assets/MinatoAqua3.jpg";
import 未花 from "../../assets/未花.png";
import 真纪 from "../../assets/真纪.png";
import 梓 from "../../assets/梓.png";
import 日富美 from "../../assets/日富美.png";
import 玛丽 from "../../assets/玛丽.png";
import 诺瓦 from "../../assets/诺瓦.png";

import 德克萨斯 from "../../assets/德克萨斯.jpeg";

// Delete only sets the corresponding index to undefined,
// in this way we can make sure the id of the manager is corresponding to it's index
type Data = {
  userGroups: (Usergroup | undefined)[]
  managers: (Manager | undefined)[]
  menuItems: (MenuItem | undefined)[]

  users: (User | undefined)[]
  goods: (Good | undefined)[]
  goodCategories: (GoodCategory | undefined)[]
  cartItems: (CartItem | undefined)[]
  orders: (Order | undefined)[]
};

const defaultData: Data = {
  userGroups: [{ id: 0, name: "默认用户组", access: [0] }],
  managers: [{ id: 0, usergroup: 0, username: "admin", password: "admin" }],
  menuItems: [{ id: 0, name: "主页", icon: "file-unknown", url: "/", enable: true }],

  users: [{
    id: 0,
    nickname: "AzurIce",
    avatar: 德克萨斯,
    username: "user",
    password: "user",
  }],
  goods: [
    // 【明日方舟 - 0】寻访凭证 & 中坚寻访凭证
    {
      id: 0,
      parent_id: 0,
      category_id: 1,
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
      category_id: 1,
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
      category_id: 0,
      name: "犹格索托斯的庭院 商人星野",
      price: 999999999,
      imgs: [商人星野],
      description: "已经......回不去了......",
      specification: "不会真的有人会买店老板吧",
      detail: "只要钱到位，老板也可以买下来"
    },
    // 【凑阿库娅】
    {
      id: 3,
      parent_id: 3,
      category_id: 2,
      name: "凑阿库娅的😘照片",
      price: 10,
      imgs: [凑阿库娅1],
      description: "你知道的，我一直是凑阿库娅厨",
      specification: "凑阿库娅可爱捏",
      detail: "凑阿库娅是日本Vtuber，所属Hololive Production。她是第一期ID成员，是Hololive的第一位海外成员"
    },
    {
      id: 4,
      parent_id: 3,
      category_id: 2,
      name: "凑阿库娅在整理头发",
      price: 12,
      imgs: [凑阿库娅2],
      description: "你知道的，我一直是凑阿库娅厨",
      specification: "凑阿库娅可爱捏",
      detail: "凑阿库娅是日本Vtuber，所属Hololive Production。她是第一期ID成员，是Hololive的第一位海外成员"
    },
    {
      id: 5,
      parent_id: 3,
      category_id: 2,
      name: "凑阿库娅的带耳机照片",
      price: 11,
      imgs: [凑阿库娅3],
      description: "你知道的，我一直是凑阿库娅厨",
      specification: "凑阿库娅可爱捏",
      detail: "凑阿库娅是日本Vtuber，所属Hololive Production。她是第一期ID成员，是Hololive的第一位海外成员"
    },
    // 【碧蓝档案】
    {
      id: 6,
      parent_id: 6,
      category_id: 3,
      name: "未花",
      price: 20,
      imgs: [未花],
      description: "你知道的，我一直是未花厨",
      specification: "未花可爱捏",
      detail: ""
    },
    {
      id: 7,
      parent_id: 7,
      category_id: 3,
      name: "真纪",
      price: 21,
      imgs: [真纪],
      description: "你知道的，我一直是真纪厨",
      specification: "真纪可爱捏",
      detail: ""
    },
    {
      id: 8,
      parent_id: 8,
      category_id: 3,
      name: "梓",
      price: 19,
      imgs: [梓],
      description: "你知道的，我一直是梓厨",
      specification: "梓可爱捏",
      detail: ""
    },
    {
      id: 9,
      parent_id: 9,
      category_id: 3,
      name: "日富美",
      price: 21,
      imgs: [日富美],
      description: "你知道的，我一直是日富美厨",
      specification: "日富美可爱捏",
      detail: ""
    },
    {
      id: 10,
      parent_id: 10,
      category_id: 3,
      name: "玛丽",
      price: 20,
      imgs: [玛丽],
      description: "你知道的，我一直是玛丽厨",
      specification: "玛丽可爱捏",
      detail: ""
    },
    {
      id: 11,
      parent_id: 11,
      category_id: 0,
      name: "诺瓦",
      price: 20,
      imgs: [诺瓦],
      description: "你知道的，我一直是诺瓦厨",
      specification: "诺瓦可爱捏",
      detail: "星空列车与白的旅行~"
    },
  ],
  goodCategories: [{
    id: 0,
    name: "默认类别",
  }, {
    id: 1,
    name: "明日方舟",
  }, {
    id: 2,
    name: "凑阿库娅",
  }, {
    id: 3,
    name: "碧蓝档案",
  }],
  cartItems: [{
    id: 0,
    user_id: 0,
    good_id: 2,
    quantity: 1,
  }, {
    id: 1,
    user_id: 0,
    good_id: 0,
    quantity: 300,
  }],
  orders: [{
    id: 0,
    user_id: 0,
    items: [{
      id: 0, // 这里的 id 和 user_id 其实没啥用，只是为了方便从购物车下单（直接加到 items 里）
      user_id: 0,
      good_id: 6,
      quantity: 1,
    }, {
      id: 0, // 这里的 id 和 user_id 其实没啥用，只是为了方便从购物车下单（直接加到 items 里）
      user_id: 0,
      good_id: 7,
      quantity: 1,
    }, {
      id: 0, // 这里的 id 和 user_id 其实没啥用，只是为了方便从购物车下单（直接加到 items 里）
      user_id: 0,
      good_id: 8,
      quantity: 1,
    }, {
      id: 0, // 这里的 id 和 user_id 其实没啥用，只是为了方便从购物车下单（直接加到 items 里）
      user_id: 0,
      good_id: 9,
      quantity: 1,
    },
    ]
  }]
};

// const db = LocalStoragePreset<Data>("db", defaultData);
const db = new GRBackendWrapper<Data>("db", defaultData);

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
    return Promise.reject("item not exist");
  }

  // ! we can't update the object attribute only, we need to replace this object
  target.data()[element.id] = { ...element }
  db.write();
}

// ------------------------------------- //

// CartItem
export type CartItem = {
  id: number,
  good_id: number,
  user_id: number,
  quantity: number,
}

export type Order = {
  id: number,
  user_id: number,
  items: CartItem[]
}

export const cartItemsDb = {
  data: () => db.data.cartItems,
  getAll: async function () { return await getAll(this) },
  getById: async function (id: number) { return await getById(this, id) },
  delete: async function (id: number) { await deleteById(this, id); },

  create: async function (user_id: number, good_id: number, quantity: number): Promise<void> {
    const id = await newId(this);

    const element: CartItem = { id, user_id, good_id, quantity };
    return await create(this, element);
  },

  update: async function (id: number, quantity: number): Promise<void> {
    const cartItem = await this.getById(id);
    const _cartItem = { ...cartItem, quantity };

    return await update(this, _cartItem);
  },
}

export const ordersDb = {
  data: () => db.data.orders,
  getAll: async function () { return await getAll(this) },
  getById: async function (id: number) { return await getById(this, id) },
  delete: async function (id: number) { await deleteById(this, id); },

  create: async function (user_id: number, items: CartItem[]): Promise<void> {
    const id = await newId(this);

    const element: Order = { id, user_id, items };
    return await create(this, element);
  },
}

// good
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

export const goodsDb = {
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

export const goodCategoriesDb = {
  data: () => db.data.goodCategories,
  getAll: async function () { return await getAll(this) },
  getById: async function (id: number) { return await getById(this, id) },
  delete: async function (id: number) {
    if (id == 0) return Promise.reject("cannot delete default category");

    for (let good of goodsDb.data()) {
      if (good != undefined) {
        good.category_id = 0;
      }
    }

    await deleteById(this, id);
  },

  create: async function (name: string): Promise<void> {
    const id = await newId(this);

    const element: GoodCategory = { id, name };
    return await create(this, element);
  },

  update: async function (id: number, name: string): Promise<void> {
    const element: GoodCategory = { id, name };
    return await update(this, element);
  },
}

// MenuItem
type MenuItem = {
  id: number,
  name: string,
  icon: string,
  url: string,
  enable: boolean,
}

export const menuItemsDb = {
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
    for (let usergroup of usergroupsDb.data()) {
      if (usergroup != undefined) {
        usergroup.access = usergroup.access.filter((id) => db.data.menuItems[id] != undefined)
      }
    }
    db.write();
  }
}

// User 前台账号
type User = {
  id: number,
  nickname: string,
  avatar: string,
  username: string,
  password: string,
}

export const usersDb = {
  data: () => db.data.users,
  getAll: async function () { return await getAll(this) },
  getById: async function (id: number) { return await getById(this, id) },
  getByUsername: async function (username: string): Promise<User> {
    const user = this.data().find((user) => user?.username == username);
    if (user == undefined) {
      return Promise.reject("manager not exist");
    }
    return user;
  },

  create: async function (username: string, password: string, nickname: string, avatar: string): Promise<void> {
    try {
      await this.getByUsername(username)
    } catch {
      return Promise.reject("username already exists");
    }
    const id = await newId(this);

    const user: User = { id, username, password, nickname, avatar };
    return await create(this, user);
  },

  update: async function (id: number, username: string, nickname: string, avatar: string): Promise<void> {
    let user = await this.getById(id);
    if (user == undefined) {
      return Promise.reject("user not exist");
    }

    const _user: User = { ...user, username, nickname, avatar }
    return await update(this, _user);
  },

  updatePassword: async function (id: number, password: string): Promise<void> {
    let user = await this.getById(id);
    if (user == undefined) {
      return Promise.reject("user not exist");
    }

    // Have to reconstruct the object, otherwise <For> won't react
    const _user: User = { ...user, password }
    db.data.users[id] = _user;
    db.write();
  },

  delete: async function (id: number): Promise<void> {
    if (id == 0) return Promise.reject("cannot delete default user")
    await deleteById(this, id);
  }
}

// Usergroup
type Usergroup = {
  id: number,
  name: string,
  access: number[] // 可以访问的菜单项 id
}

export const usergroupsDb = {
  data: () => db.data.userGroups,
  getAll: async function () { return await getAll(this); },
  getById: async function (id: number) { return await getById(this, id); },

  create: async function (name: string, access: number[]): Promise<void> {
    for (let id of access) {
      if (await menuItemsDb.getById(id) == undefined) {
        return Promise.reject("menu item not exist");
      }
    }
    const id = await newId(this);

    const element: Usergroup = { id, name, access };
    return await create(this, element);
  },

  update: async function (id: number, name: string, access: number[]): Promise<void> {
    for (let id of access) {
      if (await menuItemsDb.getById(id) == undefined) {
        return Promise.reject("menu item not exist");
      }
    }

    const element: Usergroup = { id, name, access };
    return await update(this, element);
  },

  delete: async function (id: number): Promise<void> {
    if (id == 0) return Promise.reject("cannot delete default usergroup")
    await deleteById(this, id);

    for (let manager of managersDb.data()) {
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

export const managersDb = {
  data: () => db.data.managers,
  getAll: async function () { return await getAll(this) },
  getById: async function (id: number) { return await getById(this, id) },
  getByUsername: async function (username: string): Promise<Manager> {
    const manager = db.data.managers.find((manager) => manager?.username == username);
    if (manager == undefined) {
      return Promise.reject("manager not exist");
    }
    return manager;
  },

  create: async function (username: string, password: string, usergroup: number): Promise<void> {
    try {
      await this.getByUsername(username)
    } catch {
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