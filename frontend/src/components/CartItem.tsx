// src/components/CartItem.tsx
import { Component } from "solid-js";
import { CartItemType, GoodType } from "../lib/cart";

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
    <div class="flex items-center gap-4">
      <input type="checkbox" checked={selected} onChange={(e) => onSelect(e.currentTarget.checked)} />
      <img 
        src={good.imgs[0]} 
        alt={good.name} 
        class="w-24 h-24 object-cover" 
      />
      <div class="flex-grow">
        <h3>{good.name}</h3>
        <p>价格: {good.price} 元</p>
        <p>
          数量: 
          <input 
            type="number" 
            value={quantity} 
            onInput={(e) => onQuantityChange(parseInt(e.currentTarget.value) || 1)} 
            min="1" 
            class="ml-2"
          />
        </p>
      </div>
      <button onClick={onRemove}>移除</button>
    </div>
  );
};

export default CartItem;
