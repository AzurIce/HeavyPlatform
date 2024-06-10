import { For, createEffect } from "solid-js"
import { createSignal } from "solid-js"
import { getGood, getGoodsByGroupId, LoginInfoStore } from "../../lib/store"
import { createAsync, useNavigate, useParams } from "@solidjs/router"
import LoginModal from "../../components/LoginModal"
import { Card, CardMedia, Box, Typography, Button, Container } from "@suid/material"
import OrderModal from "../../components/OrderModal"

const GoodDetailPage: Component = () => {
  const params = useParams()
  const { user } = LoginInfoStore()
  // FIXME: 处理用户没有登录的情况
  const currentUser = user()!.id
  const good = createAsync(() => getGood(Number(params.id)))
  const goodsInTheSameGroup = createAsync(() => getGoodsByGroupId(Number(good()?.parent_id)))
  const [currentImage, setCurrentImage] = createSignal(good()?.imgs[0])
  
  const [cur, setCur] = createSignal(0);
  const [loginModalOpen, setLoginModalOpen] = createSignal(false)
  const [showOrderModal, setShowOrderModal] = createSignal(false)
        
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

  const handleBuyClick = () => {
    setLoginModalOpen(true)
  }

  const handleBuynowClick = () => {
    setShowOrderModal(true)
  }

  const handleOrderModalClose = () => {
    setShowOrderModal(false)
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
        <div class="flex flex-wrap gap-4">
          <For each={goodsInTheSameGroup()}>{(item, index) => (
            <Button onClick={() => navigate(`/goods/${item.id}`)} variant={index() == cur() ? "contained" : "outlined"}
              sx={{flexShrink: 0}}>{item.name}</Button>
          )}</For>
        </div>
        <Typography variant="h5" component="div" color="error">
          ¥{good()?.price}
        </Typography>
        
        <Button variant="contained" color="primary" onClick={handleBuyClick}>
        <Button onClick={handleBuynowClick} variant="contained" color="primary">
          
          立即购买
        </Button>
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
      {showOrderModal() && good() && (
        <OrderModal 
          show={showOrderModal()} 
          onClose={handleOrderModalClose} 
          user_id={currentUser}
          items={[{ id: good()!.id, good_id: good()!.id, user_id: currentUser, quantity: 1 }]} 
        />
      )}
    </>
  )
}

export default GoodDetailPage
