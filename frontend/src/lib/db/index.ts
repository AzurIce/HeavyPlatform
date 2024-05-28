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

// Type definations
type Manager = {
  id: number,
  username: string,
  password: string,
}

const managers = {
  getAll: function(): Promise<Manager[]> {
    return Promise.resolve(db.data.managers.filter((manager) => manager !== undefined) as Manager[]);
  },
  getByUsername: function (username: string): Promise<Manager | undefined> {
    const manager = db.data.managers.find((manager) => manager?.username == username);
    return Promise.resolve(manager);
  },

  getById: function (id: number): Promise<Manager | undefined> {
    const manager = db.data.managers[id];
    return Promise.resolve(manager);
  },

  create: function (username: string, password: string): Promise<void> {
    if (this.getByUsername(username) !== undefined) {
      return Promise.reject("username already exists");
    }

    let id = db.data.managers.find((el) => el === undefined)?.id || db.data.managers.length;

    const manager: Manager = { id, username, password };
    db.data.managers.push(manager);
    return Promise.resolve();
  },

  update: function (id: number, username: string, password: string): Promise<void> {
    if (this.getById(id) === undefined) {
      return Promise.reject("manager not exist");
    }

    db.data.managers[id] = { id, username, password };
    return Promise.resolve();
  },

  delete: function (id: number): Promise<void> {
    if (this.getById(id) === undefined) {
      return Promise.reject("manager not exist");
    }

    return Promise.resolve();
  }
}

export { managers };