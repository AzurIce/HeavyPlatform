
import { createSignal } from "solid-js";


export interface CartItemType {
  id: number;
  user_id: number;
  good_id: number;
  quantity: number;
}

export interface GoodType {
  id: number;
  name: string;
  price: number;
  imgs: string[];
  description: string;
  specification: string;
  detail: string;
}


const initialCartItems: CartItemType[] = [
  { id: 0, user_id: 0, good_id: 1, quantity: 1 },
  { id: 1, user_id: 0, good_id: 0, quantity: 300 },
  { id: 1, user_id: 0, good_id: 6, quantity: 300 }
];


const goods: GoodType[] = [
  {
    id: 0,
    name: "寻访凭证",
    price: 10,
    imgs: ["/src/assets/%E5%AF%BB%E8%AE%BF%E5%87%AD%E8%AF%81.png"],
    description: "罗德岛人事部颁发的许可书，可从猎头公司招聘一位干员。",
    specification: "获得方式：采购中心、任务奖励",
    detail: "相比罗德岛，猎头公司有着更广的人脉与资源。他们或许比罗德岛更擅长从各个领域发掘人才，而这也是人事部愿意支付高额佣金的唯一原因。"
  },
  {
    id: 1,
    name: "中坚寻访凭证",
    price: 7,
    imgs: ["/src/assets/%E4%B8%AD%E5%9D%9A%E5%AF%BB%E8%AE%BF%E5%87%AD%E8%AF%81.png"],
    description: "罗德岛人事部特别批发的许可书，可以招揽一位中坚人才。",
    specification: "获得方式：采购中心、任务奖励",
    detail: "罗德岛的发展离不开中坚力量的辅助与支持，该寻访条目可以协助博士在一定范围内招揽特定的人才。"
  },
  {
    id: 2,
    name: "犹格索托斯的庭院 商人星野",
    price: 999999999,
    imgs: ["/src/assets/%E5%95%86%E4%BA%BA%E6%98%9F%E9%87%8E.png"],
    description: "已经......回不去了......",
    specification: "不会真的有人会买店老板吧",
    detail: "只要钱到位，老板也可以买下来"
  },
  {
    id: 3,
    name: "凑阿库娅的照片",
    price: 10,
    imgs: ["/src/assets/MinatoAqua1.png"],
    description: "你知道的，我一直是凑阿库娅厨",
    specification: "凑阿库娅可爱捏",
    detail: "凑阿库娅是日本Vtuber，所属Hololive Production。她是第一期ID成员，是Hololive的第一位海外成员"
  },
  {
    id: 4,
    name: "凑阿库娅在整理头发",
    price: 12,
    imgs: ["/src/assets/MinatoAqua2.jpg"],
    description: "你知道的，我一直是凑阿库娅厨",
    specification: "凑阿库娅可爱捏",
    detail: "凑阿库娅是日本Vtuber，所属Hololive Production。她是第一期ID成员，是Hololive的第一位海外成员"
  },
  {
    id: 5,
    name: "凑阿库娅的带耳机照片",
    price: 11,
    imgs: ["/src/assets/MinatoAqua3.jpg"],
    description: "你知道的，我一直是凑阿库娅厨",
    specification: "凑阿库娅可爱捏",
    detail: "凑阿库娅是日本Vtuber，所属Hololive Production。她是第一期ID成员，是Hololive的第一位海外成员"
  },
  {
    id: 6,
    name: "未花",
    price: 20,
    imgs: ["/src/assets/%E6%9C%AA%E8%8A%B1.png"],
    description: "你知道的，我一直是未花厨",
    specification: "未花可爱捏",
    detail: ""
  },
  {
    id: 7,
    name: "真纪",
    price: 21,
    imgs: ["/src/assets/%E7%9C%9F%E7%BA%AA.png"],
    description: "你知道的，我一直是真纪厨",
    specification: "真纪可爱捏",
    detail: ""
  },
  {
    id: 8,
    name: "梓",
    price: 19,
    imgs: ["/src/assets/%E6%A2%93.png"],
    description: "你知道的，我一直是梓厨",
    specification: "梓可爱捏",
    detail: ""
  },
  {
    id: 9,
    name: "日富美",
    price: 21,
    imgs: ["/src/assets/%E6%97%A5%E5%AF%8C%E7%BE%8E.png"],
    description: "你知道的，我一直是日富美厨",
    specification: "日富美可爱捏",
    detail: ""
  },
  {
    id: 10,
    name: "玛丽",
    price: 20,
    imgs: ["/src/assets/%E7%8E%9B%E4%B8%BD.png"],
    description: "你知道的，我一直是玛丽厨",
    specification: "玛丽可爱捏",
    detail: ""
  }
 // ...还有几个
];


const [cartItems, setCartItems] = createSignal<CartItemType[]>(initialCartItems);

export const cartService = {
  getCartItems: () => cartItems(),
  getGoodById: (id: number) => goods.find(good => good.id === id),
  addToCart: (item: CartItemType) => setCartItems([...cartItems(), item]),
  removeFromCart: (itemId: number) => setCartItems(cartItems().filter(item => item.id !== itemId)),
};
