import { Component, createSignal, createEffect } from 'solid-js';
import { useNavigate, revalidate } from "@solidjs/router";
import { Box, Typography, Button, Dialog, Divider, DialogContent, DialogTitle, Radio, RadioGroup, FormControlLabel } from '@suid/material';
import { AlertsStore, CartItem, getGood, getOrders, Good } from '../lib/store';
import { ordersApi } from '../lib/axios/api';
import OrderItemCard from './OrderItemCard';

export const OrderModal: Component<{ show: boolean, onClose: () => void, user_id: number, items: CartItem[] }> = (props) => {
  const [step, setStep] = createSignal(1);
  const [totalPrices, setTotalPrices] = createSignal<number[]>(Array(props.items.length).fill(0));
  const [goods, setGoods] = createSignal<Good[]>([]);
  const [updatedItems, setUpdatedItems] = createSignal<CartItem[]>(props.items);
  const [paymentMethod, setPaymentMethod] = createSignal('alipay');
  const navigate = useNavigate();

  const { newErrorAlert } = AlertsStore();

  createEffect(async () => {
    const goodsData = await Promise.all(props.items.map(item => getGood(item.id)));
    setGoods(goodsData);
    const initialPrices = goodsData.map((good, index) => good.price * props.items[index].quantity);
    setTotalPrices(initialPrices);
  });

  const handleNextStep = () => {
    setStep(v => v+1);
  };

  const handlePreviousStep = () => {
    setStep(v => v-1);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setUpdatedItems(items => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, quantity };
        }
        return item;
      });
    });
    setTotalPrices(prices => {
      const newPrices = prices.map((price, index) => {
        const item = props.items[index];
        if (item.id === id) {
          const good = goods().find(g => g.id === id);
          return (good?.price || 0) * quantity;
        }
        return price;
      });
      return newPrices;
    });
  };

  const calculateTotalPrice = () => {
    return totalPrices().reduce((acc, price) => acc + price, 0);
  };

  const handlePaymentSuccess = () => {
    // console.log(updatedItems());
    // createOrder(props.user_id, updatedItems());
    ordersApi.create(props.user_id, updatedItems()).then((res) => {
      revalidate(getOrders.key)
    }).catch((err) => {
      console.log(err)
      newErrorAlert(`订单创建失败：${err}`)
      props.onClose
    })
    setStep(3);
  };

  return (
    <Dialog open={props.show} onClose={props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: '1.5rem', textAlign: 'center', backgroundColor: '#e0f7fa', fontWeight: 'bold' }}>
        {step() === 1 && '创建订单'}
        {step() === 2 && '支付'}
        {step() === 3 && '付款成功'}
      </DialogTitle>
      <DialogContent sx={{ marginTop: '10px'}}>
      {step() === 1 && (
          <Box>
            <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>商品信息</Typography>
            <Box>
              {props.items.map(good => (
                <OrderItemCard
                  id={good.id}
                  initialQuantity={good.quantity}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </Box>
            <Divider sx={{ marginY: 2 }} />
            <Box>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>商品总价: ¥{calculateTotalPrice()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
              <Button onClick={handleNextStep} variant="contained" color="primary" sx={{ width: '80%', marginBottom: 1 }} disabled={calculateTotalPrice() <= 0}>提交订单</Button>
              <Button onClick={props.onClose} color="secondary" sx={{ width: '80%' }}>取消</Button>
            </Box>
          </Box>
        )}
        {step() === 2 && (
          // <Box>
          //   <Typography variant="h6">只存在于虚拟的支付页面</Typography>
          // </Box>
          <Box> 
            <Typography variant="h4" color="error" sx={{ textAlign: 'center', marginTop: 1 }}>¥{calculateTotalPrice()}</Typography>
            <RadioGroup value={paymentMethod()} onChange={(event) => setPaymentMethod(event.target.value)} sx={{ marginTop: 2 }}>
              <FormControlLabel value="alipay" control={<Radio />} label="支付宝支付" />
              <FormControlLabel value="wechat" control={<Radio />} label="微信支付" />
            </RadioGroup>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
              <Button onClick={handlePaymentSuccess} variant="contained" color="primary" sx={{ width: '80%', marginBottom: 1 }}>确认支付</Button>
              <Button onClick={handlePreviousStep} color="secondary" sx={{ width: '80%' }}>返回上一步</Button>
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
              <Button onClick={() => navigate('/orders')} variant="contained" color="primary" sx={{ width: '80%', marginBottom: 1 }}>查看订单</Button>
              <Button onClick={() => navigate('/')} color="secondary" sx={{ width: '80%' }}>返回主页</Button>
            </Box>
          </Box>
        )}

      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
