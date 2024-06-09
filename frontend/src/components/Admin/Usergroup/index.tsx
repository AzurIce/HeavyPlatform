import { revalidate } from "@solidjs/router"
import { Manager, Usergroup, getManager, getManagers, getUsergroup, getUsergroups } from "../../../lib/store"
import { DeleteButton } from "../common"
import { userGroupsApi } from "../../../lib/axios/api"

const onRevalidate = (id: number) => {
  revalidate(getUsergroups.key)
  revalidate(getUsergroup.keyFor(id))
  revalidate(getManagers.key)
  revalidate(getManager.key)
}

export const DeleteUsergroupModalButton = DeleteButton<Usergroup>("用户组", userGroupsApi.delete, onRevalidate);
