
import { Component, createSignal, createEffect, For, Show, onMount, ErrorBoundary } from "solid-js";
import { createAsync, revalidate, useNavigate } from "@solidjs/router";
import { Box, Typography, Button } from "@suid/material";
import { getCartItems, getGood, CartItem, Good, getGoods, LoginInfoStore, AlertsStore, getOrders } from "../../lib/store";
import CartItemCard from "../../components/CartItemCard";
import { cartItemsApi, ordersApi } from "../../lib/axios/api";
import OrderModal from "../../components/OrderModal";

const Cart: Component = () => {
  const { user, openLoginModal } = LoginInfoStore();
  const { newInfoAlert } = AlertsStore();
  const navigate = useNavigate();

  onMount(() => {
    if (user() == undefined) {
      navigate(`/`);
      newInfoAlert("请先登录")
    }
  })

  const goods = createAsync(() => getGoods());
  const cartItems = createAsync(() => getCartItems());
  const curCartItems = () => {
    return cartItems()?.filter(item => item.user_id === user()?.id);
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

  const [selectedIds, setSelectedIds] = createSignal<number[]>([]);

  const handleCheckItemChanged = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds(), id]);
    } else {
      setSelectedIds(selectedIds().filter(item => item !== id));
    }
  }

  const selectedCartItems = () => {
    return curCartItems()?.filter(item => selectedIds().findIndex(i => i === item.id) !== -1) || []
  }

  const onDone = () => {
    Promise.all(selectedCartItems().map((item) => cartItemsApi.delete(item.id))).then(() => {
      revalidate(getCartItems.key)
      revalidate(getOrders.key)
    })
  }

  const [show, setShow] = createSignal(false);

  return (
    <Box class="p-4">
      <OrderModal show={show()} onClose={() => setShow(false)} user_id={user()!.id} items={selectedCartItems()} onDone={onDone} />
      <Typography variant="h6" component="div" class="mb-4">
        购物车
      </Typography>
      <Show when={cartItems() != undefined}>
        <Box class="flex flex-col gap-4">
          <ErrorBoundary fallback={() => <>???</>}>
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
                  selected={selectedCartItems().findIndex(i => i.id === item.id) !== -1}
                />
              )}</For>
          </ErrorBoundary>
        </Box>
      </Show>

      <Box class="text-right mt-4">
        <Typography variant="h6" component="div">
          总价: {total()} 元
        </Typography>
        <Button variant="contained" color="primary" class="mt-2" onClick={user() == undefined ? openLoginModal : () => setShow(true)}>结算</Button>
      </Box>
    </Box>
  );
};

export default Cart;
