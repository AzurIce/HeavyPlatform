import { revalidate } from "@solidjs/router"
import { Manager, getManagers } from "../../../lib/store"
import { deleteManager } from "../../../lib/axios/api"
import { DeleteButton } from "../common"

const onRevalidate = (id: number) => {
  revalidate(getManagers.key)
}

export const DeleteManagerModalButton = DeleteButton<Manager>("管理员账号", deleteManager, onRevalidate);
