---
theme: default
title: 重量化商城系统
highlighter: shiki
drawings:
  persist: false
transition: view-transition
mdc: true
---

# 重量化商城系统

肖斌 俞贤皓 付家齐 杨鹏 谷雅丰

<div class="absolute right-0 top-0 bottom-0 w-90 m-10">
  <img src="/admin.png" class="absolute transform -left-10 -rotate-5 shadow">
  <img src="/main-mobile.png" class="absolute h-80 left-10 bottom-5 transform rotate-30 z-10 shadow">
  <img src="/main-desktop.png" class="absolute transform top-20 rotate-10 shadow">
</div>

<!--
asd
-->

---

# 目录

<Toc></Toc>

---

# 所用技术

- <logos-nodejs-icon /> NodeJS + <logos-pnpm /> pnpm
- <logos-react /> React + <logos-material-ui /> Mui
- <logos-tailwindcss-icon /> TailwindCSS
- <logos-java /> Java + <logos-spring-icon /> Spring + <logos-mysql-icon /> MySQL

<!--
这里有很多技术
blahblah...
java spring mysql，啊这个肯定不会用，因为这是答辩
-->

---
hideInToc: true
---

# 所用技术 {.inline-block.view-transition-title}

- <logos-nodejs-icon /> NodeJS + <logos-pnpm /> pnpm
- <logos-react /> React + <logos-material-ui /> Mui
- <logos-tailwindcss-icon /> TailwindCSS
- <s><logos-java /> Java + <logos-spring-icon /> Spring + <logos-mysql-icon /> MySQL</s>
  <br/>答辩不用
- <logos-go /> Golang + <logos-gin /> Gin + GORM + <logos-postgresql /> PostgreSQL
  <br/>优雅

<!--
与之对比 golang postgreSQL 就很优雅
-->

---
hideInToc: true
---

# 所用技术 {.inline-block.view-transition-title}

- <logos-nodejs-icon /> NodeJS + <logos-pnpm /> pnpm
- <logos-react /> React + <logos-material-ui /> Mui
- <logos-tailwindcss-icon /> TailwindCSS
- <logos-go /> Golang + <logos-gin /> Gin + GORM + <logos-postgresql /> PostgreSQL

<!--
那么这些技术呢 ——
-->

---
hideInToc: true
---

# 不用技术 {.inline-block.view-transition-title}

- <s><logos-nodejs-icon /> NodeJS + <logos-pnpm /> pnpm</s>
- <s><logos-react /> React + <logos-material-ui /> Mui</s>
- <s><logos-tailwindcss-icon /> TailwindCSS </s>
- <s><logos-go /> Golang + <logos-gin /> Gin + GORM + <logos-postgresql /> PostgreSQL</s>

<!--
我们都不用
-->

---
layout: two-cols
clicks: 9
hideInToc: true
---

# 不用技术 {.inline-block.view-transition-title}

- <s><logos-nodejs-icon /> NodeJS + <logos-pnpm /> pnpm</s>
- <s><logos-react /> React + <logos-material-ui /> Mui</s>
- <s><logos-tailwindcss-icon /> TailwindCSS </s>
- <s><logos-go /> Golang + <logos-gin /> Gin + GORM + <logos-postgresql /> PostgreSQL</s>
  <span v-click="7"><br/>为了加两分确实不值</span>

::right::

# 所用技术

- <logos-bun /> bun
- <logos-solidjs-icon /> SolidJS + <logos-material-ui /> SUID（Mui in SoliJS）
- <logos-unocss /> unocss
- 简易 key-value 存储后端：express + lowdb
- 前后端交互：axios

<div v-click="[1, 2]" class="absolute bottom-0 left-0 right-0 bottom-30 flex h-60 justify-center">
  <img src="/bun-1.png" class="shadow">
  <img src="/bun-2.png" class="shadow">
</div>

<div v-click="[3, 4]" class="absolute bottom-0 left-0 right-0 bottom-30 flex h-70 justify-center">
  <img src="/solidjs.png" class="shadow">
</div>

<div v-click="[5, 6]" class="absolute bottom-0 left-0 right-0 bottom-30 flex h-90 justify-center">
  <img src="/unocss.png" class="shadow">
</div>

<div v-click="9" class="absolute bottom-0 left-0 right-0 flex h-70 justify-center">
  <div class="w-60 relative" v-if="$slidev.nav.clicks === 9">
    <div class="relative w-40 h-40">
      <img
        v-motion
        :initial="{ x: 800, y: -100, scale: 1.5, rotate: -50 }"
        :enter="final"
        class="absolute inset-0"
        src="https://sli.dev/logo-square.png"
        alt=""
      />
      <img
        v-motion
        :initial="{ y: 500, x: -100, scale: 2 }"
        :enter="final"
        class="absolute inset-0"
        src="https://sli.dev/logo-circle.png"
        alt=""
      />
      <img
        v-motion
        :initial="{ x: 600, y: 400, scale: 2, rotate: 100 }"
        :enter="final"
        class="absolute inset-0"
        src="https://sli.dev/logo-triangle.png"
        alt=""
      />
    </div>
    <div
      class="text-5xl absolute top-14 left-40 text-[#2B90B6] -z-1"
      v-motion
      :initial="{ x: -80, opacity: 0}"
      :enter="{ x: 0, opacity: 1, transition: { delay: 2000, duration: 1000 } }">
      Slidev
    </div>
  </div>
</div>

<!-- vue script setup scripts can be directly used in markdown, and will only affects current page -->
<script setup lang="ts">
const final = {
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
  transition: {
    type: 'spring',
    damping: 10,
    stiffness: 20,
    mass: 2
  }
}
</script>

<div v-click="8" class="absolute bottom-0 left-0 right-0 bottom-20 text-center text-[32px] nb">
生命的价值在于从无意义中「建构」意义
</div>

<!--
这是我们所用的技术。

bun 是一个很新的东西，扬言要取代 nodejs。
它同时是一个 js 运行时、
-->

---
clicks: 4
---

# Solidjs 与 React

````md magic-move {lines: true}
```tsx
// React
const Hello = () => {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

```tsx
// Solid
const Hello: Component = () => {
  const [count, setCount] = createSignal(0);

  return (
    <button onClick={() => setCount(count => count + 1)}>
      Clicked {count()} times
    </button>
  );
}
```
````

<br/>
<v-click>条件渲染、列表渲染、Context、ref...</v-click>

<br/>
<v-click><span v-mark.red="4">但是！没有虚拟 DOM，使用 fine-grained reactivity。</span></v-click>

---
layout: two-cols
---

# 实现功能与分工

- 肖斌
  - Github 仓库维护（Issue、分支、PR 审查）
  - 技术选择
  - 数据模型、db、api 设计与实现
  - 后台实现
  - 整体样式调整 & 修复疑难杂症
- 俞贤皓
  - 主页、商品详情页、分类页
  - 商品组件
  - 后端实现
- 谷雅丰
  - 浏览商品添加历史记录逻辑
  - 历史记录页、前台登录组件

::right::

- 付家齐
  - 提交订单 -> 支付 -> 支付成功组件
  - 订单列表页、订单详情页
  - 商品页提交订单逻辑
- 杨鹏
  - 商品页添加至购物车、购物车页结算逻辑
  - 购物车页面
  - 我的页面

---
layout: center
class: text-center
---

# 演示

---
layout: center
class: text-center
---

# 完结撒花

[GitHub](https://github.com/AzurIce/HeavyPlayform)
