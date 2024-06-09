import { revalidate } from "@solidjs/router"
import { MenuItem, getMenuItems, getUsergroup, getUsergroups } from "../../../lib/store"
import { DeleteButton } from "../common"
import { menuItemsApi } from "../../../lib/axios/api"

const onRevalidate = (id: number) => {
  revalidate(getMenuItems.key)
  revalidate(getUsergroups.key)
  revalidate(getUsergroup.key)
}

export const DeleteMenuItemModalButton = DeleteButton<MenuItem>("菜单项", menuItemsApi.delete, onRevalidate);
