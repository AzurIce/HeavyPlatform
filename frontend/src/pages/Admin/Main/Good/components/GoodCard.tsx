import { createAsync } from "@solidjs/router";
import { Component, Setter, Show } from "solid-js";
import { Good, getGood, getGoodCategorie as getGoodCategory, getGoodCategories } from "../../../../../lib/store";
import { Button, ButtonGroup, Card, CardActions, CardMedia, Chip } from "@suid/material";
import { Delete, Edit } from "@suid/icons-material";
import { DeleteGoodModalButton } from ".";

const CategoryChip: Component<{id: number}> = (props) => {
  const category = createAsync(() => getGoodCategory(props.id));
  return <>
    <Chip label={category()?.name} />
  </>
}

export const GoodCard: Component<{ id: number, setUpdateTarget: Setter<Good | undefined> }> = (props) => {
  const { setUpdateTarget } = props;
  const good = createAsync(() => getGood(props.id))

  return <>
    <Card sx={{ display: "flex", padding: 2, gap: 2, alignItems: "center" }}>
      <CardMedia component="img" src={good()?.imgs[0]} alt="good-img" sx={{ width: 80 }} />
      <div class="flex flex-col flex-1">
        <div class="flex gap-2">
          <Show when={good() != undefined}>
            <span class="font-bold text-lg">{good()?.name}</span>
            <span class="text-xs text-[#999999]">id: {good()?.id}</span>
            <CategoryChip id={good()!.category_id} />
          </Show>
        </div>
        <span class="text-sm text-[#999999]">{good()?.description}</span>
        <span>规格参数：{good()?.specification}</span>
        <span>详细信息：{good()?.detail}</span>
      </div>
      <span class="max-w-20 overflow-hidden text-ellipsis">价格：¥{good()?.price}</span>
      <CardActions>
        <Show when={good() != undefined}>
          <ButtonGroup>
            <Button onClick={() => setUpdateTarget(good()!)}>
              <Edit />
            </Button>
            <DeleteGoodModalButton target={() => good()!}>
              <Delete />
            </DeleteGoodModalButton>
          </ButtonGroup>
        </Show>
      </CardActions>
    </Card>
  </>
}
