import { createAsync } from "@solidjs/router";
import { Component, For, Setter, Show, createSignal } from "solid-js";
import { Good, getGoodsByGroupId } from "../../../../../lib/store";
import { Button, Card } from "@suid/material";
import { Add } from "@suid/icons-material";
import { GoodCard } from ".";

export const GoodGroupCard: Component<{ id: number, setUpdateTarget: Setter<Good | undefined> }> = (props) => {
  const goods = createAsync(() => getGoodsByGroupId(props.id));
  const [cur, setCur] = createSignal(0);

  return <>
    <Card sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Show when={goods() != undefined && goods()!.length > 0}>
        <div class="flex gap-1 overflow-x-auto">
          <For each={goods()}>{(item, index) => <>
            <Button onClick={() => setCur(index())} variant={index() == cur() ? "contained" : "outlined"}
              sx={{flexShrink: 0}}>{item.name}</Button>
          </>}</For>
          {/* <Button onClick={() => { }} variant="outlined"><Add /></Button> */}
        </div>
        <div class="flex flex-col w-full gap-2">
          <GoodCard id={goods()![cur()].id} setUpdateTarget={props.setUpdateTarget} />
        </div>
      </Show>
    </Card>
  </>
}