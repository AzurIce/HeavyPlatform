# 轻量化平台开发大作业

## 目录结构

- `/docs`：一些文档和笔记
    - `assets`：存放所有文档中的资源（比如截图）
- `/frontend`：前端项目的根目录
    - `dist`：**构建产物**


## 使用技术

- [Solid](https://www.solidjs.com/)：响应式框架

    - 新的 beta 版本文档：https://docs.solidjs.com/

- [Solid Router](https://github.com/solidjs/solid-router)：路由

- [SUID](https://suid.io/)：Material Design 组件库

    这个组件库是对 React 组件库 [MUI](https://mui.com/core/) 在 Solid 上的实现。

    （可能这个组件库风格与商城内容，以及可用组件没有那么“现成”的商城组件，所以有些内容可能需要手搓）

- [UnoCSS](https://unocss.dev/)

    原子化 CSS 框架，简单来说，就是把常用的 css 属性组合为一个个的类，只需要根据需要往 `class` 中填对应的类就好了。

    文档除了 UnoCSS 的文档，还可以查 [TailwindCSS](https://tailwindcss.com/docs/installation) 的文档。

    比如：

    ```css
    .container {
        width: 100%;
        background-color: white;
        display: flex;
        flex-direction: column;
    }
    ```

    就可以写成：

    ```html
    <div class="w-full bg-white flex flex-col"></div>
    ```

<s>引入后端</s>（懒逼了，直接 localstorage 搓个 db 模拟下后端接口响应好了）：

- <s>[Axios](https://github.com/axios/axios)：用于前端向后端发请求</s>
- <s>Golang + Gin</s>

## 第三次作业

见 [docs/第三次作业.md](./docs/第三次作业.md)。

## 第四次作业

### 1. 分工

数据模型设计、路由设计、组件接口设计、mock 数据库及 api 实现

需要的数据模型：

- [ ] 商品
- [ ] 商品分类
- [ ] 订单

需要的数据：

- [ ] 全部商品

- [ ] 购物车中商品

### 2. 设计

#### 1> 商品

考察 京东/淘宝 等平台的设计，为了方便会将同一种「商品」的不同选项放在一起，而每个选项都有自己的详情页。

在我们的设计中，引入一个「商品组」的概念来简单地实现这个逻辑：

- 一个「商品」为一个具体的选项，对应着唯一的详情页。
- 「商品组」将多个商品组合在一起，其中任何一个「商品」的页面下的“选项”中会显示其他同「商品组」的「商品」

<s>具体结构如下：</s>

```ts
/* type GoodGroup = {
	id: number,
	goods: number[]
} */
```

算啦，为了后台搓起来简单些，这里直接用类似路径压缩并查集的思想来实现（因为逻辑上来说，我们只在乎哪些商品是一组，而不在乎这个组有什么样的属性），查找同组物品时直接对全部物品 filter 一下得了（反正商品也没那么多，搓个作业而已），不单独做一个 GoodGroup 结构了。

为了保证可以直接通过一次 filter 获取到所有同组物品（同一组所有 parent 相同），每一次“合并操作”应该通过获取所有另组物品并设置 parent 为当前组的 parent。

```ts
type Good = {
    id: number,
    // group_id: number | undefined,
    parent_id: number
    category_id: number | undefined,
    name: string,
    price: number,
    imgs: string[],        // 详情页首部的图片
    description: string,   // 对应副标题位置的描述
    specification: string, // 参数，偷懒，直接整个 string 得了
    detail: string         // 详细信息
}
```

```ts
type GoodCategory = {
	id: number,
    name: string,
}
```

---

商品的详细页面为 `/goods/:id`，切换选择时直接跳转另一个商品的 id 的 url 即可。

分类页面为 `/categories/:id`，将所有属于该类别的商品卡片显示出来。

---

1. 主页商品卡片：`/components/GoodCard`

    > 难度简单，工作量少

    显示在主页/搜索结果中的商品卡片

    ```ts
    const GoodCard: Component<{id: number}> = (props) => {
        // ...
    }
    ```

    <img src="./docs/assets/image-20240603165926107.png" alt="image-20240603165926107" style="zoom:50%;" />

2. 分类商品页：`/pages/Main/Categories`

    > 难度中等，工作量少
    >
    > 需要学习一下 https://github.com/solidjs/solid-router?tab=readme-ov-file#dynamic-routes

3. 商品详情页：`/pages/Main/Good`

    > 难度中等，工作量中等
    >
    > 需要学习一下 https://github.com/solidjs/solid-router?tab=readme-ov-file#dynamic-routes

    <img src="./docs/assets/image-20240603165758177.png" alt="image-20240603165758177" style="zoom:50%;" />

#### 2> 购物车、订单

简化逻辑，订单被视为若干购物车项的列表。立即下单也即创建一个 CartItem 后用其直接创建 Order。

下单后，CartItem 被移除，并创建对应的 Order。

```ts
type CartItem = {
    id: number,
    good_id: number,
    user_id: number,
    quantity: number,
}
```

```ts
type Order = {
    id: number,
    user_id: number,
    items: CartItem[]
}
```

---

购物车页面路由为 `/cartitems`

订单页面路由为 `/orders`

---

1. 创建订单组件

    > 难度较难，工作量中等

    做成组件而非页面的原因是，组件方便传参，可以实现成一个 Modal（参考 `/components/MenuItem/CreateMenuItemModal.tsx`）。

    ```ts
    const GoodCard: Component<{show: Accessor<boolean>, cartItems: Accessor<CardItem[]>}> = (props) => {
        // ...
    }
    ```
    
    在这个组件里面同时再做一下支付和支付成功（支付成功才会创建订单）
    
    就整体上是一个弹窗来创建订单，点下一步，内容变成支付，再点立即支付，内容变成支付成功，这个时候添加到订单列表里。
    
1. 购物车页面：`/pages/Main/CartItems`

    > 难度简单，工作量中等

1. 订单列表页面：`/pages/Main/Orders`

    > 难度简单，工作量中等

1. 我的页面：`/pages/Main/Me`

    > 难度简单，工作量中等

### 1. 作业内容

#### 前台

- [ ] 登入
- [ ] 商城主页面
    - [ ] 首页
        - [ ] 搜索框、轮播图、热门商品
    - [ ] 分类
        - [ ] 所有商品的分类索引
    - [ ] 购物车
    - [ ] 我的
- [ ] 购买商品全程的界面
    - [ ] 商品详细信息页面
    - [ ] 创建订单页面
    - [ ] 支付页面
    - [ ] 订单详情页面

#### 后台

- [x] 登录
- [x] 权限、角色管理

- [ ] 商品/分类/订单 管理三选一

#### 其他

可以参考 https://github.com/macrozheng/mall

- 基本：借助 localStorage 实现前后台数据的联动
- 进阶：搓个后端实现前后台数据的联动

### 2. 评分项

> 5 人小组，组长 1 人
>
> 满分 100（代码 + 功能 + 答辩），设总分为 $s$：
>
> - 组员得分：80% 组长分配（共 $4s$ 可分配分数） + 20% 老师调整
>
> - 组长得分：80% 老师调整 + 20% 组员评分（在 $s \pm 15$​ 范围内）
>
> 答辩每组 8 分钟，ppt 包含分工，一位主讲人，其他人也都上台。

划掉的不打算做，剩下的全做满可以做 120 分。

- [x] <s>**代码质量/风格** 10</s> 送分

- [x] <s>**界面美观度** 10</s> 送分

- [x] <s>**答辩情况** 10</s> 送分

- [ ] **基础功能** 60

- [ ] **单品/满减优惠券** 5

    这个比较简单，就是搓一个小组件，码量极少

- [ ] **我的足迹及收藏** 5

    这个也比较简单

- [ ] **页面适配** 10

    感觉可能全部做完最后再做好一些，

    因为移动端布局的确定可能受页面元素内容影响比较大

- [ ] **后端实现前后台联动** 5

    直接 Golang 光速搓一个后端，也可以有

- [ ] **后台统计图表** 5

    也很简单，调个 echarts 或者之类的 API

- [ ] <s>秒杀/抢购 5</s> 这个太抽象了

- [ ] <s>退货流程 5</s> 这个太不划算了，码多分少

---

## 有关 Solid

Solid 是一个比较新的前端框架，写起来和 React 比较相似：

- 基础 API `createSignal` 与 `useState`
- 都使用 jsx/tsx

区别在于：

- React 的响应性实现基于运行时对「虚拟 DOM」的比较与操作，某一个属性的变化会导致整个组件的重新执行。
- Solid 的响应性实现为 Fine-grained Reactivity（细粒度响应），无「虚拟 DOM」，因此也不需要运行时环境。

简单来说，就是，快：

![image-20240514201447862](./docs/assets/image-20240514201447862.png)

不过因为比较新，所以，相关生态没有 React 那么强。

不过够用（）

---

## 作业内容及评分项

