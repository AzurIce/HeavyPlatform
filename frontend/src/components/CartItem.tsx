import { Component } from "solid-js";
import { CartItemType, GoodType } from "../lib/cart";
import { Checkbox, Button, TextField, Card, CardMedia, CardContent, Typography } from '@suid/material';

interface CartItemProps {
  item: CartItemType;
  good: GoodType;
  onRemove: () => void;
  onSelect: (checked: boolean) => void;
  onQuantityChange: (quantity: number) => void;
  quantity: number;
  selected: boolean;
}

const CartItem: Component<CartItemProps> = ({ item, good, onRemove, onSelect, onQuantityChange, quantity, selected }) => {
  return (
    <Card class="flex items-center gap-4 p-4">
      <Checkbox checked={selected} onChange={(e) => onSelect(e.currentTarget.checked)} />
      <CardMedia
        component="img"
        src={good.imgs[0]}
        alt={good.name}
        class="w-24 h-24 object-cover"
      />
      <CardContent class="flex-grow">
        <Typography variant="h6">{good.name}</Typography>
        <Typography variant="body2">价格: {good.price} 元</Typography>
        <div style={{ display: 'flex', 'align-items': 'center' }}>
          <Typography variant="body2">数量: </Typography>
          <TextField
            type="number"
            value={quantity}
            onChange={(e) => onQuantityChange(parseInt(e.currentTarget.value) || 1)}
            inputProps={{ min: 1 }}
            size="small"
            class="ml-2"
          />
        </div>
      </CardContent>
      <Button variant="contained" color="secondary" onClick={onRemove}>移除</Button>
    </Card>
  );
};

export default CartItem;
