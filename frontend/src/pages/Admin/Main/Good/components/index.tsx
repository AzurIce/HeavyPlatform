import { revalidate } from "@solidjs/router"
import { Good, GoodCategory, getGood, getGoodCategorie, getGoodCategories, getGoods } from "../../../../../lib/store"
import { DeleteButton } from "../../../../../components/Admin/common"
import { goodCategoriesApi, goodsApi } from "../../../../../lib/axios/api"

export { CreateGoodCategoryModal } from "./CreateGoodCategoryModal"
export { UpdateGoodCategoryModal } from "./UpdateGoodCategoryModal"
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
  revalidate(getGoodCategorie.keyFor(id))
}

export const DeleteGoodModalButton = DeleteButton<Good>("商品", goodsApi.delete, onRevalidateGood);
export const DeleteGoodCategoryModalButton = DeleteButton<GoodCategory>("商品分类", goodCategoriesApi.delete, onRevalidateGoodCategory);