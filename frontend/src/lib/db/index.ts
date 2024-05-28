import { LocalStoragePreset } from "lowdb/browser";

// Delete only sets the corresponding index to undefined,
// in this way we can make sure the id of the manager is corresponding to it's index
type Data = {
  managers: (Manager | undefined)[]
}

const defaultData: Data = {
  managers: [{ id: 0, username: "admin", password: "admin" }]
};

const db = LocalStoragePreset<Data>("db", defaultData);

export const resetDb = () => {
  db.data = defaultData;
  db.write();
}

// Type definations
type Manager = {
  id: number,
  username: string,
  password: string,
}

const managers = {
  getAll: async function(): Promise<Manager[]> {
    const managers = db.data.managers.filter((manager) => manager !== undefined) as Manager[];
    return managers;
  },
  getByUsername: async function (username: string): Promise<Manager | undefined> {
    const manager = db.data.managers.find((manager) => manager?.username == username);
    return manager;
  },

  getById: async function (id: number): Promise<Manager | undefined> {
    const manager = db.data.managers[id];
    return manager;
  },

  create: async function (username: string, password: string): Promise<void> {
    if (await this.getByUsername(username) !== undefined) {
      return Promise.reject("username already exists");
    }

    let id = db.data.managers.find((el) => el === undefined)?.id || db.data.managers.length;

    const manager: Manager = { id, username, password };
    db.data.managers.push(manager);
    db.write();
  },

  update: async function (id: number, username: string, password: string): Promise<void> {
    if (await this.getById(id) === undefined) {
      return Promise.reject("manager not exist");
    }

    db.data.managers[id] = { id, username, password };
    db.write();
  },

  delete: async function (id: number): Promise<void> {
    if (await this.getById(id) === undefined) {
      return Promise.reject("manager not exist");
    }

    db.data.managers[id] = undefined;
    db.write();
  }
}

export { managers };