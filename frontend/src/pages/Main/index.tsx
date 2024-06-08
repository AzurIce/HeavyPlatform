import { Box, TextField, Grid } from "@suid/material"
import { For, Match, Switch } from "solid-js"
import GoodCard from "../../components/GoodCard"
import { createAsync } from "@solidjs/router"
import { getGoods, isMobile } from "../../lib/store"
import Carousel from "../../components/Carousel"

const Main = () => {
  const goods = createAsync(() => getGoods())

  const carouselIds = [0, 1, 2]

  return <>
    <TextField placeholder="搜索" variant="outlined" sx={{backgroundColor: "white"}}/>

    <Carousel ids={carouselIds} />

    <div class="flex flex-wrap gap-4 justify-between">
      <For each={goods()}>{(item) =>
        <GoodCard id={item.id} />
      }</For>
    </div>
  </>
}

export default Main