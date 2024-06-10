import { createAsync, useNavigate, useParams } from "@solidjs/router";
import { Component, For } from "solid-js";
import { getGoods, getOrder, getOrders, LoginInfoStore, Good, Order, CartItem } from "../../lib/store";
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Card, CardContent, Divider, Button, AppBar, Toolbar, Container, IconButton } from "@suid/material";
import NotFound from "../NotFound";
import OrderCard from "../../components/OrderCard";
import { Home } from "@suid/icons-material";

const Orders: Component = () => {
  const navigate = useNavigate();
  const orders = createAsync(() => getOrders());
  const { user } = LoginInfoStore();
  const currentUser = user()?.id;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/')}
          >
            <Home />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            全部订单
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <For each={orders()?.filter(order => order.user_id === currentUser)}>{(item) =>
            <OrderCard id={item.id} />
          }</For>
        </Box>
      </Container>
    </Box>
  );
};

const OrderDetailPage: Component = () => {
  const params = useParams();
  const navigate = useNavigate();
  const order = createAsync(() => getOrder(Number(params.id)));
  const goods = createAsync(() => getGoods());

  const handleBackClick = () => {
    navigate('/orders');
  };

  const calculateTotalAmount = () => {
    return order()?.items.reduce((total, item) => {
      const good = goods()?.find(g => g.id === item.good_id);
      return total + (good?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <Box>
      {order() === undefined ? (
        <NotFound />
      ) : (
        <Card elevation={0} sx={{ display: "flex", flexDirection: "column", gap: 2, padding: '15px', border: 'solid 2px rgba(0,0,0,0.2)', margin: '20px 20px' }}>
          <CardContent>
            <Box sx={{ position: 'relative', marginBottom: 2 }}>
              <Button onClick={handleBackClick} color="primary" sx={{ position: 'absolute', left: 0, minWidth: 'auto', padding: 0 }}>
                返回
              </Button>
              <Typography variant="h4" sx={{ textAlign: 'center' }}>
                订单详情
              </Typography>
            </Box>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="h6">订单 ID: {order()?.id}</Typography>
            <Typography variant="h6">用户 ID: {order()?.user_id}</Typography>
            <Typography variant="h6" sx={{ marginTop: 2 }}>商品列表:</Typography>
            <List>
              {order()?.items.map(item => {
                const good = goods()?.find(g => g.id === item.good_id);
                return (
                  <ListItem sx={{ alignItems: 'flex-start' }}>
                    <ListItemAvatar>
                      <Avatar src={good?.imgs[0]} alt={good?.name} sx={{ width: 56, height: 56, marginRight: 2 }} />
                    </ListItemAvatar>
                    <ListItemText 
                      primary={`${good?.name} - 数量: ${item.quantity}`} 
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="textPrimary">
                            价格: ¥{good?.price}
                          </Typography>
                          <Typography component="span" variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}>
                            总价: ¥{(good?.price || 0) * item.quantity}
                          </Typography>
                        </>
                      } 
                    />
                  </ListItem>
                );
              })}
            </List>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="h5" sx={{ textAlign: 'right' }}>
              总金额: ¥{calculateTotalAmount()}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

const OrdersIndex: Component = () => {
  const params = useParams();

  return (
    <Box>
      {!params.id ? <Orders /> : <OrderDetailPage />}
    </Box>
  );
};

export default OrdersIndex;
