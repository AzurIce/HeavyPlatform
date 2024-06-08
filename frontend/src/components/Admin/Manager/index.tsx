import { revalidate } from "@solidjs/router"
import { Manager, getManagers } from "../../../lib/store"
import { DeleteButton } from "../common"
import { managersApi } from "../../../lib/axios/api"

const onRevalidate = (id: number) => {
  revalidate(getManagers.key)
}

export const DeleteManagerModalButton = DeleteButton<Manager>("管理员账号", managersApi.delete, onRevalidate);
