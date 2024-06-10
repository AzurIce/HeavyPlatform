
import { Component, createSignal, createEffect, For, Show } from "solid-js";
import { createAsync, revalidate } from "@solidjs/router";
import { Box, Typography, Button } from "@suid/material";
import { getCartItems, getGood, CartItem, Good, getGoods } from "../../lib/store";
import CartItemCard from "../../components/CartItemCard";
import { cartItemsApi } from "../../lib/axios/api";

const Cart: Component = () => {
  const userId = 0; // 假设当前用户ID为0

  const goods = createAsync(() => getGoods());
  const cartItems = createAsync(() => getCartItems());
  const curCartItems = () => {
    return cartItems()?.filter(item => item.user_id === userId);
  }
  const total = () => {
    return selectedCartItems().reduce((acc, item) => {
      return acc + item.quantity * goods()![item.good_id].price;
    }, 0)
  }

  const handleRemoveItem = (id: number) => {
    cartItemsApi.delete(id).then((res) => {
      // TODO: toast
    })
    revalidate(getCartItems.key)
  };

  const [selectedCartItems, setSelectedCartItems] = createSignal<CartItem[]>([]);

  const handleCheckItemChanged = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedCartItems([...selectedCartItems(), curCartItems()!.find(item => item.id === id)!]);
    } else {
      setSelectedCartItems(selectedCartItems().filter(item => item.id !== id));
    }
  }

  return (
    <Box class="p-4">
      <Typography variant="h6" component="div" class="mb-4">
        购物车
      </Typography>
      <Show when={cartItems() != undefined}>
        <Box class="flex flex-col gap-4">
          <For each={curCartItems()}
            fallback={
              <Typography variant="body1" component="div">
                您的购物车是空的。
              </Typography>
            }>{item => (
              <CartItemCard
                id={item.id}
                onRemove={() => handleRemoveItem(item.id)}
                onCheckedChanged={handleCheckItemChanged}
              />
            )}</For>
        </Box>
      </Show>

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