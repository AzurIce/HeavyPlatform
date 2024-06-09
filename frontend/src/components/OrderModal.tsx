import { Component, createSignal, createEffect } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import { isMobile, CartItem, getGood, Good } from '../lib/store';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@suid/material';
import OrderItemCard from './OrderItemCard';

export const OrderModal: Component<{ show: boolean, onClose: () => void, user_id: number, items: CartItem[] }> = (props) => {
  const [step, setStep] = createSignal(1);
  const [totalPrices, setTotalPrices] = createSignal<number[]>(Array(props.items.length).fill(0));
  const [goods, setGoods] = createSignal<Good[]>([]);
  const navigate = useNavigate();

  createEffect(async () => {
    const goodsData = await Promise.all(props.items.map(item => getGood(item.id)));
    setGoods(goodsData);
    const initialPrices = goodsData.map((good, index) => good.price * props.items[index].quantity);
    setTotalPrices(initialPrices);
  });

  const handleNextStep = () => {
    setStep(step() + 1);
  };

  const handleTotalPriceChange = (id: number, totalPrice: number) => {
    setTotalPrices(prices => {
      const newPrices = prices.map((price, index) => {
        if (props.items[index].id === id) {
          return totalPrice;
        }
        return price;
      });
      return newPrices;
    });
  };

  const calculateTotalPrice = () => {
    return totalPrices().reduce((acc, price) => acc + price, 0);
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
                <OrderItemCard id={good.id} initialQuantity={good.quantity} onTotalPriceChange={handleTotalPriceChange} />
              ))}
            </Box>
            <Box mt={2}>
              <Typography variant="h6">总价格: ¥{calculateTotalPrice()}</Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="secondary">取消</Button>
        <Button onClick={handleNextStep} color="primary">下一步</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderModal;
