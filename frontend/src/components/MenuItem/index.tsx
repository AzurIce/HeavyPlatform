import { revalidate } from "@solidjs/router"
import { MenuItem, getMenuItems } from "../../lib/store"
import { deleteMenuItem } from "../../lib/axios/api"
import { DeleteButton } from "../common"

const onRevalidate = (id: number) => {
  revalidate(getMenuItems.key)
}

export const DeleteMenuItemModalButton = DeleteButton<MenuItem>("菜单项", deleteMenuItem, onRevalidate);
