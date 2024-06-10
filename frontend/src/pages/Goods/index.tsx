import { Component, For, Show, createEffect } from "solid-js"
import { createSignal } from "solid-js"
import { getGood, getGoodsByGroupId, LoginInfoStore } from "../../lib/store"
import { createAsync, useNavigate, useParams } from "@solidjs/router"
import LoginModal from "../../components/LoginModal"
import { Card, CardMedia, Box, Typography, Button, Container } from "@suid/material"
import OrderModal from "../../components/OrderModal"
import AddToCartModal from "../../components/AddToCartModal"

const GoodDetailPage: Component = () => {
  const params = useParams()
  const { user } = LoginInfoStore()
  // FIXME: 处理用户没有登录的情况
  const good = createAsync(() => getGood(Number(params.id)))
  const goodsInTheSameGroup = createAsync(() => getGoodsByGroupId(Number(good()?.parent_id)))
  const [currentImage, setCurrentImage] = createSignal(good()?.imgs[0])

  const [cur, setCur] = createSignal(0);
  const [loginModalOpen, setLoginModalOpen] = createSignal(false)
  const [showOrderModal, setShowOrderModal] = createSignal(false)
  const [showAddToCartModal, setShowAddToCartModal] = createSignal(false)

  const navigate = useNavigate()

  createEffect(() => {
    if (good()) {
      setCurrentImage(good()?.imgs[0])
    }
    const goods = goodsInTheSameGroup()
    if (goods) {
      for (let i = 0; i < goods.length; i++) {
        if (goods[i].id == Number(params.id)) {
          setCur(i)
          break
        }
      }
    }
  })

  const handleBackClick = () => {
    navigate('/')
  }

  const handleBuynowClick = () => {
    if (user() == undefined) {
      setLoginModalOpen(true)
      return;
    }
    setShowOrderModal(true)
  }

  const handleAddToCart = () => {
    if (user() == undefined) {
      setLoginModalOpen(true)
      return;
    }
    setShowAddToCartModal(true)
  }


  return (
    <>
      <Card elevation={0} sx={{ display: "flex", flexDirection: "column", gap: 2, padding: '30px', border: 'solid 2px rgba(0,0,0,0.2)', margin: '20px 20px' }}>
        <LoginModal isOpen={loginModalOpen} setIsOpen={setLoginModalOpen} />
        <Button onClick={handleBackClick} sx={{ alignSelf: 'flex-start' }}>
          返回
        </Button>
        <CardMedia
          component="img"
          src={currentImage()}
          alt="商品图片"
          sx={{ width: '100%', height: 'auto' }}
        />
        <Typography variant="h6" component="div">
          {good()?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {good()?.description}
        </Typography>

        {/* 商品组 */}
        <div class="flex flex-wrap gap-4">
          <For each={goodsInTheSameGroup()}>{(item, index) => (
            <Button onClick={() => navigate(`/goods/${item.id}`)} variant={index() == cur() ? "contained" : "outlined"}
              sx={{ flexShrink: 0 }}>{item.name}</Button>
          )}</For>
        </div>

        <Typography variant="h5" component="div" color="error">
          ¥{good()?.price}
        </Typography>

        <div class="flex gap-2">
          {/* TODO: 购物车 */}
          <Button onClick={handleAddToCart} variant="outlined" color="primary" sx={{ flexGrow: 1 }}>
            加入购物车
          </Button>
          <Button onClick={handleBuynowClick} variant="contained" color="primary" sx={{ flexGrow: 1 }}>
            立即购买
          </Button>
        </div>

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" component="div">
            规格参数
          </Typography>
          <Typography variant="body2" color="text.secondary" whiteSpace="pre-line">
            {good()?.specification}
          </Typography>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" component="div">
            详细信息
          </Typography>
          <Typography variant="body2" color="text.secondary" whiteSpace="pre-line">
            {good()?.detail}
          </Typography>
        </Box>
      </Card>
      <Show when={good() && user() != undefined}>
        <OrderModal
          show={showOrderModal()}
          onClose={() => setShowOrderModal(false)}
          user_id={user()!.id}
          items={[{ id: good()!.id, good_id: good()!.id, user_id: user()!.id, quantity: 1 }]} />
        <AddToCartModal
          show={showAddToCartModal()}
          onClose={() => setShowAddToCartModal(false)}
          user_id={user()!.id}
          good_id={good()!.id} />
      </Show>
    </>
  )
}

export default GoodDetailPage
