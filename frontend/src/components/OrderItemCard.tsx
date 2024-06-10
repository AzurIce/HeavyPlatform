import { Component, createSignal, Show, onMount } from 'solid-js';
import { createAsync } from "@solidjs/router";
import { getGood, isMobile } from '../lib/store';
import { Box, Card, CardMedia, Typography, IconButton, useTheme } from '@suid/material';
import AddIcon from '@suid/icons-material/Add';
import RemoveIcon from '@suid/icons-material/Remove';

const OrderItemCard: Component<{ id: number, initialQuantity: number, onQuantityChange: (id: number, quantity: number) => void }> = (props) => {
  const { id, initialQuantity, onQuantityChange } = props;
  const good = createAsync(() => getGood(id));
  const theme = useTheme();
  const [quantity, setQuantity] = createSignal(initialQuantity);

  const updateQuantity = () => {
    onQuantityChange(id, quantity());
  };

  const handleIncrease = () => {
    const newQuantity = quantity() + 1;
    setQuantity(newQuantity);
    updateQuantity();
  };

  const handleDecrease = () => {
    if (quantity() > 0) {
      const newQuantity = quantity() - 1;
      setQuantity(newQuantity);
      updateQuantity();
    }
  };

  onMount(() => {
    updateQuantity();
  });

  return (
    <Card
      elevation={1}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        margin: 1,
        borderRadius: '8px',
        transition: 'background-color 0.3s ease',
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#eeeeee", // 灰色背景
        }
      }}
    >
      <CardMedia
        component="img"
        src={good()?.imgs[0]}
        alt="商品图片"
        sx={{ width: isMobile() ? 80 : 100, height: isMobile() ? 80 : 100, marginRight: 2 }}
      />
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">{good()?.name}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
          <IconButton onClick={handleDecrease} disabled={quantity() === 0}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1" sx={{ marginX: 2 }}>{quantity()}</Typography>
          <IconButton onClick={handleIncrease}>
            <AddIcon />
          </IconButton>
        </Box>
        <Show when={good()?.price} fallback={<div>Loading...</div>}>
          <Typography variant="body1">价格: ¥{(good()?.price || 0) * quantity()}</Typography>
        </Show>
      </Box>
    </Card>
  );
};

export default OrderItemCard;
