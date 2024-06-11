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
  const { user, openLoginModal } = LoginInfoStore()

  const good = createAsync(() => getGood(Number(params.id)))
  const goodsInTheSameGroup = createAsync(() => getGoodsByGroupId(Number(good()?.parent_id)))
  const [currentImage, setCurrentImage] = createSignal(good()?.imgs[0])

  const [cur, setCur] = createSignal(0);
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

  return (
    <>
      <Card elevation={0} sx={{ display: "flex", flexDirection: "column", alignItems: 'stretch', gap: 2, padding: '30px', border: 'solid 2px rgba(0,0,0,0.2)', margin: '20px 20px' }}>
        <Button onClick={() => navigate(-1)} sx={{ alignSelf: 'flex-start' }}>
          返回
        </Button>
        <CardMedia
          component="img"
          src={currentImage()}
          alt="商品图片"
          sx={{ width: '60%', height: 'auto', objectFit: "contain", margin: 'auto' }}
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
            <Button onClick={() => navigate(`/goods/${item.id}`, { replace: true })} variant={index() == cur() ? "contained" : "outlined"}
              sx={{ flexShrink: 0 }}>{item.name}</Button>
          )}</For>
        </div>

        <Typography variant="h5" component="div" color="error">
          ¥{good()?.price}
        </Typography>

        <div class="flex gap-2">
          <Button onClick={user() == undefined ? openLoginModal : () => setShowAddToCartModal(true)} variant="outlined" color="primary" sx={{ flexGrow: 1 }}>
            加入购物车
          </Button>
          <Button onClick={user() == undefined ? openLoginModal : () => setShowOrderModal(true)} variant="contained" color="primary" sx={{ flexGrow: 1 }}>
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
          cntChange={true}
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
