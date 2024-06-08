import { Component } from 'solid-js';
import { createAsync } from "@solidjs/router";
import { getGood } from '../lib/store';
import { Card, CardMedia } from '@suid/material';

export const GoodCard: Component<{id: number}> = (props) => {
  const { id } = props;
  const good = createAsync(() => getGood(id))

  return <>
    <Card sx={{ display: "flex", flexDirection: "column", padding: 2, gap: 2, alignItems: "center", minHeight: "200px"}}>
      <CardMedia component="img" src={good()?.imgs[0]} alt="good-img" sx={{ width: '90%' }} />
      <div class="flex flex-col flex-1">
        <div class="flex gap-2">
          <span class="font-bold text-lg">{good()?.name}</span>
          <span class="text-xs text-[#999999]">id: {good()?.id}</span>
        </div>
      </div>
      <span>价格：{good()?.price}¥</span>
    </Card>
  </>
}

export default GoodCard