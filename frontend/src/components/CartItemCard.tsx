import { Component, createSignal, createEffect, Show } from "solid-js";
import { createAsync, revalidate } from "@solidjs/router";
import { getCartItem, getCartItems, getGood, Good } from "../lib/store";
import { Card, CardMedia, CardContent, Typography, Button, TextField, Checkbox } from '@suid/material';
import { cartItemsApi } from "../lib/axios/api";
import { CheckBox } from "@suid/icons-material";

interface CartItemProps {
  id: number;
  onRemove: () => void;
  onCheckedChanged: (id: number, checked: boolean) => void;
}

const CartItemCard: Component<CartItemProps> = ({ id, onRemove, onCheckedChanged }) => {
  const cartItem = createAsync(() => getCartItem(id))
  const [good, setGood] = createSignal<Good | undefined>(undefined)
  createEffect(() => {
    if (cartItem() != undefined) {
      getGood(cartItem()!.good_id).then(setGood)
    }
  })

  const [quantity, setQuantity] = createSignal(0)
  createEffect(() => {
    if (cartItem() != undefined) {
      setQuantity(cartItem()!.quantity)
    }
  })

  const handleQuantityChange = (id: number, quantity: number) => {
    cartItemsApi.update(id, quantity).then((res) => {
      // TODO: toast
      revalidate(getCartItems.key)
      revalidate(getCartItem.keyFor(id))
    })
  }

  const [checked, setChecked] = createSignal(false);


  return (
    <Show when={cartItem() != undefined && good() != undefined}>
      <Card sx={{
        display: 'flex',
        maxHeight: 200,
      }}>
        <Checkbox
          checked={checked()}
          onChange={(event, checked) => {
            setChecked(checked);
            onCheckedChanged(cartItem()!.id, checked);
          }}
          inputProps={{ "aria-label": "controlled" }}
        />
        <CardMedia
          component="img"
          src={(good()!).imgs[0]}
          alt={good()?.name}
          sx={{
            maxWidth: 120,
            objectFit: "contain",
          }}
        />
        <CardContent class="flex-grow flex flex-col">
          <Typography variant="h6" sx={{textOverflow: 'ellipsis'}}>{good()?.name}</Typography>
          <Typography variant="body2">价格: {good()?.price} 元</Typography>
          <div class="flex items-center gap-2">
            <Typography variant="body2">数量: </Typography>
            <TextField
              type="number"
              value={quantity()}
              onChange={(e, v) => {
                const x = parseInt(v)
                if (!Number.isNaN(x)) {
                  setQuantity(x)
                  handleQuantityChange(cartItem()!.id, x)
                }
              }}
              inputProps={{ min: 1 }}
              size="small"
              class="ml-2"
            />
          </div>
        </CardContent>
        <Button variant="contained" color="secondary" onClick={onRemove}>移除</Button>
      </Card>
    </Show>
  );
};

export default CartItemCard;