import { useNavigate } from "@solidjs/router"
import { ArrowBack } from "@suid/icons-material"
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@suid/material"
import { Component, For } from "solid-js"
import { HistoryStore } from "../lib/store"
import GoodCard from "../components/GoodCard"

const History: Component = () => {
  const navigate = useNavigate();

  const { history, clean } = HistoryStore();

  return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate(-1)}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            历史记录
          </Typography>
        </Toolbar>
      </AppBar>
      <div class="flex flex-col p-4 gap-4">
        <Button color="error" variant="outlined" onClick={clean}>清空历史</Button>
        <div class="flex flex-wrap gap-4">
          <For each={history()}>{(item) =>
            <GoodCard id={item} />
          }</For>
        </div>
      </div>
    </Box>
  </>
}

export default History