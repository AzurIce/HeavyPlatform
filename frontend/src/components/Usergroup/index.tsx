import { revalidate } from "@solidjs/router"
import { Manager, Usergroup, getManagers, getUsergroup, getUsergroups } from "../../lib/store"
import { deleteManager, deleteUsergroup } from "../../lib/axios/api"
import { DeleteButton } from "../common"

const onRevalidate = (id: number) => {
  revalidate(getUsergroups.key)
  revalidate(getUsergroup.keyFor(id))
}

export const DeleteUsergroupModalButton = DeleteButton<Usergroup>("用户组", deleteUsergroup, onRevalidate);
