import { Component, createSignal, createEffect } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import { isMobile, CartItem, getGood, Good } from '../lib/store';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@suid/material';
import { createOrder } from '../lib/store';
import OrderItemCard from './OrderItemCard';

export const OrderModal: Component<{ show: boolean, onClose: () => void, user_id: number, items: CartItem[] }> = (props) => {
  const [step, setStep] = createSignal(1);
  const [totalPrices, setTotalPrices] = createSignal<number[]>(Array(props.items.length).fill(0));
  const [goods, setGoods] = createSignal<Good[]>([]);
  const [updatedItems, setUpdatedItems] = createSignal<CartItem[]>(props.items);
  const navigate = useNavigate();

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
    createOrder(props.user_id, updatedItems());
    setStep(3);
  };

  return (
    <Dialog open={props.show} onClose={props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: '1.5rem' }}>创建订单</DialogTitle>
      <DialogContent>
        {step() === 1 && (
          <Box>
            <Typography variant="h6">商品信息</Typography>
            <Box>
              {props.items.map(good => (
                <OrderItemCard
                  id={good.id} 
                  initialQuantity={good.quantity} 
                  onQuantityChange={handleQuantityChange} 
                />
              ))}
            </Box>
            <Box mt={2}>
              <Typography variant="h6">总价格: ¥{calculateTotalPrice()}</Typography>
            </Box>
          </Box>
        )}
        {step() === 2 && (
          <Box>
            <Typography variant="h6">只存在于虚拟的支付页面</Typography>
            <Box mt={2}>
              <Typography variant="h6">总价格: ¥{calculateTotalPrice()}</Typography>
            </Box>
          </Box>
        )}
        {step() === 3 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              🎉 付款成功喵 🎉
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1 }}>
              感谢您的购买喵~ 💖 小猫娘会尽快处理您的订单喵~ 💖
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: step() === 3 ? 'center' : 'flex-end' }}>
        {step() === 1 && (
          <>
            <Button onClick={props.onClose} color="secondary">取消</Button>
            <Button onClick={handleNextStep} color="primary" disabled={calculateTotalPrice() <= 0}>立即下单</Button>
          </>
        )}
        {step() === 2 && (
          <>
            <Button onClick={handlePreviousStep} color="secondary">上一步</Button>
            <Button onClick={handlePaymentSuccess} color="primary">立即付款</Button>
          </>
        )}
        {step() === 3 && (
          <>
            <Button onClick={() => navigate('/orders')} color="primary">查看订单</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default OrderModal;
