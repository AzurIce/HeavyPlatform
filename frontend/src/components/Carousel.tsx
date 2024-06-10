import { createAsync, useNavigate } from "@solidjs/router"
import { Box, Card, CardMedia } from "@suid/material"
import { Component, For, createSignal, onCleanup, onMount } from "solid-js"
import { getGood } from "../lib/store"

interface CarouselProps {
  ids: number[]
}

const Carousel: Component<CarouselProps> = ({ ids }) => {
  const navigate = useNavigate()

  const [curIndex, setCurIndex] = createSignal(0)

  const nextImage = () => {
    setCurIndex((prevIndex) => (prevIndex + 1) % ids.length)
  }

  const prevImage = () => {
    setCurIndex((prevIndex) => (prevIndex - 1 + ids.length) % ids.length)
  }

  const good = createAsync(() => getGood(ids[curIndex()]))

  // 自动翻页
  onMount(() => {
    const intervalId = setInterval(nextImage, 3000) // 每3秒翻页一次
    onCleanup(() => clearInterval(intervalId)) // 组件卸载时清除定时器
  })

  // Router Navigation
  const handleClick = () => {
    navigate(`/goods/${ids[curIndex()]}`)
  }

  return (
    <Card sx={{
      alignItems: "center",
      transition: "background-color 0.3s ease",
      position: 'relative',
      width: '100%',
      minHeight: '200px',
      borderRadius: '8px',
      backgroundColor: 'white',
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
              opacity: index() === curIndex() ? 1 : 0,
              zIndex: index() === curIndex() ? 1 : 0,
            }}
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
    </Card>
  )
}

export default Carousel;