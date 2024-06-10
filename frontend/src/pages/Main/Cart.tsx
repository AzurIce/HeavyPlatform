import { Component, createSignal, For, createEffect } from "solid-js";
import { Box, Typography, Button } from "@suid/material";
import { cartService, CartItemType } from "../../lib/cart";
import CartItem from "../../components/CartItem";

const Cart: Component = () => {
  const [cartItems, setCartItems] = createSignal<CartItemType[]>(cartService.getCartItems());
  const [selectedItems, setSelectedItems] = createSignal<{ [key: number]: boolean }>({});
  const [quantities, setQuantities] = createSignal<{ [key: number]: number }>(cartItems().reduce((acc, item) => {
    acc[item.id] = item.quantity;
    return acc;
  }, {} as { [key: number]: number }));

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
    setCartItems(cartItems().map(item => item.id === itemId ? { ...item, quantity: quantity } : item));
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
    <Box class="p-4">
      <Typography variant="h6" component="div" class="mb-4">
        购物车
      </Typography>
      {cartItems().length === 0 ? (
        <Typography variant="body1" component="div">
          您的购物车是空的。
        </Typography>
      ) : (
        <Box class="flex flex-col gap-4">
          <For each={cartItems()}>
            {(item) => {
              const good = cartService.getGoodById(item.good_id);
              if (!good) return null;
              return (
                <CartItem 
                  item={item} 
                  good={good} 
                  onRemove={() => handleRemoveItem(item.id)} 
                  onSelect={(checked) => handleSelectItem(item.id, checked)}
                  onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                  quantity={quantities()[item.id]}
                  selected={!!selectedItems()[item.id]}
                />
              );
            }}
          </For>
        </Box>
      )}
      <Box class="text-right mt-4">
        <Typography variant="h6" component="div">
          总价: {total()} 元
        </Typography>
        <Button variant="contained" color="primary" class="mt-2">结算</Button>
      </Box>
    </Box>
  );
};

export default Cart;
