import { revalidate } from "@solidjs/router"
import { Good, GoodCategory, getGood, getGoodCategories, getGoods } from "../../../../../lib/store"
import { DeleteButton } from "../../../../../components/Admin/common"
import { goodCategoriesApi, goodsApi } from "../../../../../lib/axios/api"

export { GoodGroupCard } from "./GoodGroupCard"
export { GoodCard } from "./GoodCard"
export { CreateGoodModal } from "./CreateGoodModal"
export { UpdateGoodModal } from "./UpdateGoodModal"

const onRevalidateGood = (id: number) => {
  revalidate(getGoods.key)
  revalidate(getGood.keyFor(id))
}

const onRevalidateGoodCategory = (id: number) => {
  revalidate(getGoodCategories.key)
}

export const DeleteGoodModalButton = DeleteButton<Good>("商品", goodsApi.delete, onRevalidateGood);
export const DeleteGoodCategoryModalButton = DeleteButton<GoodCategory>("商品分类", goodCategoriesApi.delete, onRevalidateGoodCategory);