import { Component, createSignal, createEffect, Switch, Match } from 'solid-js';
import { useNavigate, revalidate, createAsync } from "@solidjs/router";
import { Box, Typography, Button, Dialog, Divider, DialogContent, DialogTitle, Radio, RadioGroup, FormControlLabel } from '@suid/material';
import { AlertsStore, CartItem, getCartItems, getGood, getOrders, Good } from '../lib/store';
import { cartItemsApi, ordersApi } from '../lib/axios/api';
import OrderItemCard from './OrderItemCard';

export const AddToCartModal: Component<{ show: boolean, onClose: () => void, user_id: number, good_id: number }> = (props) => {
  const { onClose } = props;

  const good = createAsync(() => getGood(props.good_id));
  const [quantity, setQuantity] = createSignal(1);
  const totalPrice = () => (good()?.price || 0) * quantity();

  const [step, setStep] = createSignal(1);
  const navigate = useNavigate();

  const { newErrorAlert } = AlertsStore();

  const onSubmit = () => {
    cartItemsApi.create(props.user_id, props.good_id, quantity()).then(() => {
      revalidate(getCartItems.key);
      setStep(2)
    })
  };

  return (
    <Dialog open={props.show} onClose={props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: '1.5rem', textAlign: 'center', backgroundColor: '#e0f7fa', fontWeight: 'bold' }}>
        <Switch>
          <Match when={step() == 1}>添加到购物车</Match>
          <Match when={step() == 2}>添加成功</Match>
        </Switch>
      </DialogTitle>
      <DialogContent sx={{ marginTop: '10px' }}>
        <Switch>
          <Match when={step() == 1}>
            <Box>
              <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>商品信息</Typography>
              <Box>
                <OrderItemCard
                  id={props.good_id}
                  onQuantityChange={(v) => setQuantity(v)}
                />
              </Box>
              <Divider sx={{ marginY: 2 }} />
              <Box>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>商品总价: ¥{totalPrice()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
                <Button onClick={onSubmit} variant="contained" color="primary" sx={{ width: '80%', marginBottom: 1 }} disabled={totalPrice() <= 0}>添加到购物车</Button>
                <Button onClick={props.onClose} color="secondary" sx={{ width: '80%' }}>取消</Button>
              </Box>
            </Box>
          </Match>
          <Match when={step() == 2}>
            <Box>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                已添加至购物车
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
                <Button onClick={() => navigate(`/cart`)} variant="contained" color="primary" sx={{ width: '80%', marginBottom: 1 }}>查看购物车</Button>
                <Button onClick={onClose} color="secondary" sx={{ width: '80%' }}>继续购物</Button>
              </Box>
            </Box>
          </Match>

        </Switch>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartModal;
