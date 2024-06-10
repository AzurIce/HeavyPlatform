import { Component, createSignal, createEffect, For } from "solid-js";
import { Box, Typography, Button } from "@suid/material";
import { getCartItems, getGood, CartItem as CartItemType, Good } from "../../lib/store";
import CartItem from "../../components/CartItem";

const Cart: Component = () => {
  const userId = 0; // 假设当前用户ID为0
  const [cartItems, setCartItems] = createSignal<CartItemType[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [quantities, setQuantities] = createSignal<{ [key: number]: number }>({});
  const [goods, setGoods] = createSignal<{ [key: number]: Good }>({});

  createEffect(() => {
    getCartItems().then(async items => {
      const filteredItems = items.filter(item => item.user_id === userId);
      setCartItems(filteredItems);

      const initialQuantities = filteredItems.reduce((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {} as { [key: number]: number });
      setQuantities(initialQuantities);

      const goodPromises = filteredItems.map(item => getGood(item.good_id));
      const goodsArray = await Promise.all(goodPromises);
      const goodsMap = goodsArray.reduce((acc, good) => {
        acc[good.id] = good;
        return acc;
      }, {} as { [key: number]: Good });
      setGoods(goodsMap);

      setLoading(false);
    });
  });

  const handleRemoveItem = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleQuantityChange = (itemId: number, quantity: number) => {
    setQuantities(prev => ({ ...prev, [itemId]: quantity }));
    setCartItems(prevItems =>
      prevItems.map(item => (item.id === itemId ? { ...item, quantity: quantity } : item))
    );
  };

  const total = () => {
    return cartItems().reduce((sum, item) => {
      const good = goods()[item.good_id];
      return good ? sum + good.price * quantities()[item.id] : sum;
    }, 0);
  };

  return (
    <Box class="p-4">
      <Typography variant="h6" component="div" class="mb-4">
        购物车
      </Typography>
      {loading() ? (
        <Typography variant="body1" component="div">
          加载中...
        </Typography>
      ) : cartItems().length === 0 ? (
        <Typography variant="body1" component="div">
          您的购物车是空的。
        </Typography>
      ) : (
        <Box class="flex flex-col gap-4">
          <For each={cartItems()}>{item => (
            <CartItem
              cartItem={item}
              onRemove={() => handleRemoveItem(item.id)}
              onQuantityChange={quantity => handleQuantityChange(item.id, quantity)}
            />
          )}</For>
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
