import { Container, AppBar, Toolbar, Box, TextField, useTheme, Grid, CardMedia } from "@suid/material"
import { Component, For, createEffect, createSignal, onCleanup } from "solid-js"
import GoodCard from "../../components/GoodCard"
import { createAsync } from "@solidjs/router"
import { getGood, getGoods } from "../../lib/store"
import { transform } from "@suid/vite-plugin"

interface GridGoodCardProps {
  id: number
}

interface CarouselProps {
  ids: number[]
}

// CSS 动画样式
const boxSx = {
};

const Carousel: Component<CarouselProps> = ({ ids }) => {
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [isLoaded, setIsLoaded] = createSignal(false);

  const nextImage = () => {
    setIsLoaded(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ids.length);
  };

  const prevImage = () => {
    setIsLoaded(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + ids.length) % ids.length);
  };

  const good = createAsync(() => getGood(ids[currentIndex()]));

  // 自动翻页
  createEffect(() => {
    const intervalId = setInterval(nextImage, 3000); // 每3秒翻页一次
    onCleanup(() => clearInterval(intervalId)); // 组件卸载时清除定时器
  });

  return (
    <Box sx={{...boxSx, position: 'relative', width: '100%', minHeight: '200px', '& img': {
      position: 'absolute',
      top: 0,
      left: '30%',
      width: '40%',
      height: '100%',
    }}}>
      <For each={ids}>
        {(id, index) => (
          <CardMedia
            component="img"
            src={good()?.imgs[0]}
            alt="carousel-img"
            sx={{
              opacity: index() === currentIndex() ? 1 : 0,
              zIndex: index() === currentIndex() ? 1 : 0,
            }}
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </For>
      <Box sx={{ position: 'absolute', top: '50%', left: '10px', cursor: 'pointer' }} onClick={prevImage}>{"<"}</Box>
      <Box sx={{ position: 'absolute', top: '50%', right: '10px', cursor: 'pointer' }} onClick={nextImage}>{">"}</Box>
    </Box>
  );
};

const Main = () => {
  const goods = createAsync(() => getGoods())

  const carouselIds = [
    0, 1, 2
  ]

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth placeholder="搜索" variant="outlined" style={{ margin: "16px 0 0 0" }} />
        </Grid>

        <Grid item xs={12}>
          <Carousel ids={carouselIds} />
        </Grid>

        <For each={goods()}>{(item) =>
          <Grid item xs={6}>
            <GoodCard id={item.id} />
          </Grid>
        }</For>

      </Grid>
    </Container>
  )
}

export default Main