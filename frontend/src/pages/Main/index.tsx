import { Container, AppBar, Toolbar, Box, TextField, useTheme, Grid, CardMedia } from "@suid/material"
import { Component, For, createEffect, createSignal, onCleanup, onMount } from "solid-js"
import GoodCard from "../../components/GoodCard"
import { createAsync, useNavigate } from "@solidjs/router"
import { getGood, getGoods } from "../../lib/store"
import { transform } from "@suid/vite-plugin"

interface CarouselProps {
  ids: number[]
}

const Carousel: Component<CarouselProps> = ({ ids }) => {
  const [currentIndex, setCurrentIndex] = createSignal(0)
  const [isLoaded, setIsLoaded] = createSignal(false)
  const navigate = useNavigate()

  const nextImage = () => {
    setIsLoaded(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ids.length)
  }

  const prevImage = () => {
    setIsLoaded(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + ids.length) % ids.length)
  }

  const good = createAsync(() => getGood(ids[currentIndex()]))

  // 自动翻页
  onMount(() => {
    const intervalId = setInterval(nextImage, 3000) // 每3秒翻页一次
    onCleanup(() => clearInterval(intervalId)) // 组件卸载时清除定时器
  })

  // Router Navigation
  const handleClick = () => {
    navigate(`/goods/${ids[currentIndex()]}`)
  }

  return (
    <Box sx={{
      alignItems: "center",
      transition: "background-color 0.3s ease",
      position: 'relative',
      width: '100%',
      minHeight: '200px',
      border: 'solid 2px rgba(0, 0, 0, 0.2)',
      borderRadius: '8px',
      "&:hover": {
        cursor: "pointer",
        backgroundColor: "#eeeeee", // 灰色背景
      },
      '& img': {
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
            onClick={handleClick}
          />
        )}
      </For>
      <Box sx={{ position: 'absolute', top: '10%', left: '10px', cursor: 'pointer', width: 'auto', height: '80%', display: 'flex', alignItems: 'center',
        userSelect: 'none', "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.3)", },
      }} onClick={prevImage}>&nbsp;&nbsp;&nbsp;&nbsp;{"<"}&nbsp;&nbsp;&nbsp;&nbsp;</Box>
      <Box sx={{ position: 'absolute', top: '10%',right: '10px', cursor: 'pointer', width: 'auto', height: '80%', display: 'flex', alignItems: 'center',
        userSelect: 'none', "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.3)", },
      }} onClick={nextImage}>&nbsp;&nbsp;&nbsp;&nbsp;{">"}&nbsp;&nbsp;&nbsp;&nbsp;</Box>
    </Box>
  )
}

const Main = () => {
  const goods = createAsync(() => getGoods())

  const carouselIds = [0, 1, 2]

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth placeholder="搜索" variant="outlined" sx={{ margin: "16px 0 0 0", border: 'solid 2px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }} />
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
    </Box>
  )
}

export default Main