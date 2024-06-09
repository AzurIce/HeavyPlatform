import { Component, createEffect } from "solid-js"
import { createSignal } from "solid-js"
import { Card, CardMedia, Box, Typography, Button, Container } from "@suid/material"
import { getGood, LoginInfoStore } from "../../lib/store"
import { createAsync, useNavigate, useParams } from "@solidjs/router"
import OrderModal from "../../components/OrderModal"

const GoodDetailPage: Component = () => {
  const params = useParams()
  const { user } = LoginInfoStore()
  // FIXME: 处理用户没有登录的情况
  const currentUser = user()!.id
  const good = createAsync(() => getGood(Number(params.id)))
  const [currentImage, setCurrentImage] = createSignal(good()?.imgs[0])
  const [showOrderModal, setShowOrderModal] = createSignal(false)
  const navigate = useNavigate()

  createEffect(() => {
    if (good()) {
      setCurrentImage(good()?.imgs[0])
    }
  })

  const handleBackClick = () => {
    navigate(-1)
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
        <Typography variant="h5" component="div" color="error">
          ¥{good()?.price}
        </Typography>
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
