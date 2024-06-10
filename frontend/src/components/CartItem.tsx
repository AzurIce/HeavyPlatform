import { Component, createSignal, createEffect } from "solid-js";
import { createAsync } from "@solidjs/router";
import { getGood, Good } from "../lib/store";
import { Card, CardMedia, CardContent, Typography, Button, TextField } from '@suid/material';

interface CartItemProps {
  cartItem: {
    id: number;
    good_id: number;
    user_id: number;
    quantity: number;
  };
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
}

const CartItem: Component<CartItemProps> = ({ cartItem, onRemove, onQuantityChange }) => {
  const good = createAsync(() => getGood(cartItem.good_id));
  const [quantity, setQuantity] = createSignal(cartItem.quantity);

  const handleQuantityChange = (event: Event) => {
    const newQuantity = parseInt((event.target as HTMLInputElement).value, 10) || 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  return (
    <Card class="flex items-center gap-4 p-4">
      {good() && (
        <>
          <CardMedia
            component="img"
            src={good()?.imgs[0]}
            alt={good()?.name}
            class="w-24 h-48 object-contain max-w-xs"
          />
          <CardContent class="flex-grow">
            <Typography variant="h6">{good()?.name}</Typography>
            <Typography variant="body2">价格: {good()?.price} 元</Typography>
            <div style={{ display: 'flex', 'align-items': 'center' }}>
              <Typography variant="body2">数量: </Typography>
              <TextField
                type="number"
                value={quantity()}
                onChange={handleQuantityChange}
                inputProps={{ min: 1 }}
                size="small"
                class="ml-2"
              />
            </div>
          </CardContent>
          <Button variant="contained" color="secondary" onClick={onRemove}>移除</Button>
        </>
      )}
    </Card>
  );
};

export default CartItem;
