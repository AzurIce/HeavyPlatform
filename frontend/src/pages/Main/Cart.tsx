// src/pages/Main/Cart.tsx
import { Component, createSignal, For, createEffect } from "solid-js";
import { Box, Card, Typography, useTheme } from "@suid/material";
import { cartService, CartItemType } from "../../lib/cart";
import CartItem from "../../components/CartItem";

const Cart: Component = () => {
  const [cartItems, setCartItems] = createSignal<CartItemType[]>(cartService.getCartItems());
  const [selectedItems, setSelectedItems] = createSignal<{ [key: number]: boolean }>({});
  const [quantities, setQuantities] = createSignal<{ [key: number]: number }>(cartItems().reduce((acc, item) => {
    acc[item.id] = item.quantity;
    return acc;
  }, {} as { [key: number]: number }));
  const theme = useTheme();

  const handleRemoveItem = (itemId: number) => {
    cartService.removeFromCart(itemId);
    setCartItems(cartService.getCartItems());
    setSelectedItems(prev => {
      const { [itemId]: _, ...rest } = prev;
      return rest;
    });
    setQuantities(prev => {
      const { [itemId]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleSelectItem = (itemId: number, checked: boolean) => {
    setSelectedItems(prev => ({ ...prev, [itemId]: checked }));
  };

  const handleQuantityChange = (itemId: number, quantity: number) => {
    setQuantities(prev => ({ ...prev, [itemId]: quantity }));
  };

  const total = () => {
    return cartItems().reduce((sum, item) => {
      if (selectedItems()[item.id]) {
        const good = cartService.getGoodById(item.good_id);
        if (good) {
          sum += good.price * (quantities()[item.id] || item.quantity);
        }
      }
      return sum;
    }, 0);
  };

  createEffect(() => {
    setQuantities(cartItems().reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {} as { [key: number]: number }));
  });

  return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h6" component="div" sx={{ marginBottom: '16px' }}>
        购物车
      </Typography>
      {cartItems().length === 0 ? (
        <Typography variant="body1" component="div">
          您的购物车是空的。
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <For each={cartItems()}>
            {(item) => {
              const good = cartService.getGoodById(item.good_id);
              if (!good) return null;
              return (
                <Card sx={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: theme.palette.background.default }}>
                  <CartItem 
                    item={item} 
                    good={good} 
                    onRemove={() => handleRemoveItem(item.id)} 
                    onSelect={(checked) => handleSelectItem(item.id, checked)}
                    onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                    quantity={quantities()[item.id]}
                    selected={!!selectedItems()[item.id]}
                  />
                </Card>
              );
            }}
          </For>
        </Box>
      )}
      <Box sx={{ textAlign: 'right', marginTop: '16px' }}>
        <Typography variant="h6" component="div">
          总价: {total()} 元
        </Typography>
      </Box>
    </Box>
  );
};

export default Cart;
