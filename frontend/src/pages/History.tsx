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
            全部订单
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button color="error" onClick={clean}>清空历史</Button>
          <For each={history()}>{(item) =>
            <GoodCard id={item} />
          }</For>
        </Box>
      </Container>
    </Box>
  </>
}