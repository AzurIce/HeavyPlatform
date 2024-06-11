import { Component, createSignal, createEffect } from 'solid-js';
import { useNavigate, revalidate, createAsync } from "@solidjs/router";
import { Box, Typography, Button, Dialog, Divider, DialogContent, DialogTitle, Radio, RadioGroup, FormControlLabel } from '@suid/material';
import { AlertsStore, CartItem, getGood, getGoods, getOrders, Good } from '../lib/store';
import { ordersApi } from '../lib/axios/api';
import OrderItemCard from './OrderItemCard';

export const OrderModal: Component<{ show: boolean, onClose: () => void, user_id: number, items: CartItem[], cntChange?: boolean, onDone?: () => void }> = (props) => {
  const onDone = props.onDone || (() => { });
  const cntChange = props.cntChange || false;
  const [step, setStep] = createSignal(1);
  const goods = createAsync(() => getGoods());
  const total = () => {
    return updatedItems().reduce((acc, item) => {
      const price = goods() == undefined ? 0 : goods()![item.good_id].price;
      return acc + item.quantity * price;
    }, 0)
  }

  const [updatedItems, setUpdatedItems] = createSignal<CartItem[]>(props.items);
  createEffect(() => {
    setUpdatedItems(props.items);
  })
  const [paymentMethod, setPaymentMethod] = createSignal('alipay');
  const [orderId, setOrderId] = createSignal<number | null>(null);
  const navigate = useNavigate();

  const { newErrorAlert } = AlertsStore();

  const handleQuantityChange = (id: number, quantity: number) => {
    setUpdatedItems(items => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const handlePaymentSuccess = () => {
    ordersApi.create(props.user_id, updatedItems()).then((id) => {
      onDone();
      revalidate(getOrders.key);
      setOrderId(id); // Save the created order ID
      setStep(3);
    }).catch((err) => {
      console.log(err);
      newErrorAlert(`订单创建失败：${err}`);
      props.onClose();
    });
  };

  return (
    <Dialog open={props.show} onClose={props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: '1.5rem', textAlign: 'center', backgroundColor: '#e0f7fa', fontWeight: 'bold' }}>
        {step() === 1 && '创建订单'}
        {step() === 2 && '支付'}
        {step() === 3 && '付款成功'}
      </DialogTitle>
      <DialogContent sx={{ marginTop: '10px' }}>
        {step() === 1 && (
          <Box>
            <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>商品信息</Typography>
            <Box>
              {props.items.map(good => (
                <OrderItemCard
                  id={good.good_id}
                  quantity={good.quantity}
                  onQuantityChange={(quantity) => handleQuantityChange(good.id, quantity)}
                  cntChange={cntChange}
                />
              ))}
            </Box>
            <Divider sx={{ marginY: 2 }} />
            <Box>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>商品总价: ¥{total()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
              <Button onClick={() => setStep(v => v + 1)} variant="contained" color="primary" sx={{ width: '80%', marginBottom: 1 }} disabled={total() <= 0}>提交订单</Button>
              <Button onClick={props.onClose} color="secondary" sx={{ width: '80%' }}>取消</Button>
            </Box>
          </Box>
        )}
        {step() === 2 && (
          <Box>
            <Typography variant="h4" color="error" sx={{ textAlign: 'center', marginTop: 1 }}>¥{total()}</Typography>
            <RadioGroup value={paymentMethod()} onChange={(event) => setPaymentMethod(event.target.value)} sx={{ marginTop: 2 }}>
              <FormControlLabel value="alipay" control={<Radio />} label="支付宝支付" />
              <FormControlLabel value="wechat" control={<Radio />} label="微信支付" />
            </RadioGroup>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
              <Button onClick={handlePaymentSuccess} variant="contained" color="primary" sx={{ width: '80%', marginBottom: 1 }}>确认支付</Button>
              <Button onClick={() => setStep(v => v - 1)} color="secondary" sx={{ width: '80%' }}>返回上一步</Button>
            </Box>
          </Box>
        )}
        {step() === 3 && (
          <Box>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              🎉 付款成功喵 🎉
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1 }}>
              感谢您的购买喵~ 💖 小猫娘会尽快处理您的订单喵~ 💖
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
              <Button onClick={() => navigate(`/orders/${orderId()}`)} variant="contained" color="primary" sx={{ width: '80%', marginBottom: 1 }}>查看订单</Button>
              <Button onClick={() => navigate('/')} color="secondary" sx={{ width: '80%' }}>返回主页</Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
