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

java ，啊这个肯定不会用，因为这是答辩
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

<!--
与之对比
-->

---
hideInToc: true
---

# 所用技术 {.inline-block.view-transition-title}

- <logos-nodejs-icon /> NodeJS + <logos-pnpm /> pnpm
- <logos-react /> React + <logos-material-ui /> Mui
- <logos-tailwindcss-icon /> TailwindCSS
- <logos-go /> Golang + <logos-gin /> Gin + GORM + <logos-postgresql /> PostgreSQL
  <br/>优雅

<!--
golang postgreSQL 就很优雅
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
golang postgreSQL 就很优雅
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
  <span v-click="7"><br/>那就真重量化了</span>

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

【0】
bun 是一个很新的东西，扬言要取代 nodejs。

【1】
它同时是一个 js 运行时、包管理器、打包工具、测试工具。
并且使用一门很奇怪的 zig 语言实现，性能非常牛逼。

【2】
SolidJS 它可以被简单地理解为去除虚拟 DOM 版本的 React。

【3】性能也很优秀

【4】
然后是 unocss

【5】
性能更好，可拓展性更强的原子化 css 引擎。

【6】
然后是后端，我们用 express + lowdb 简单搓了个键值对存储的后端。
为什么不写个正经后端，

【7】
因为这门课叫轻量化而不是重量化。

「1:00」
那为什么用这么多有意思的新东西？—— 因为有意思，
而，有意思，是我学软件的原因

有个词叫造轮子，这其实没什么，关键是不要重复地用相同的材料，相同的思路，相同的技术造相同的轮子。
这前后端管理系统我从大一写到大三了，我要是一直拿一个东西搓，那真对意义和热情有极大的消磨。

所以我们要干点我们人很擅长的一件事。

【8】
那就是建构意义

这项目能不写么？不能。
那怎么办？写。
怎么写？（指屏幕）用新东西写

「看清世界的真相后仍热爱生活」


「1:45」
【9】
另外再提一嘴，本 slide 也不是 ppt 做的，也前端技术的产物。
用的是一个叫做 slidev 的东西，简单来说就是用 Markdown 搓 ppt，大家感兴趣也可以去玩玩。
-->

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
  - 商品组件、商品组选择
  - 后端实现
- 谷雅丰
  - 浏览商品添加历史记录逻辑
  - 历史记录页、前台登录组件

::right::

- 付家齐
  - 提交订单 -> 支付 -> 支付成功组件
  - 订单列表页、订单详情页
  - 商品页提交订单逻辑
  - 测试仙人
- 杨鹏
  - 商品页添加至购物车、购物车页结算逻辑
  - 购物车页面
  - 我的页面

<!--
然后这里是我们的分工，接下来我们来做一下演示
-->

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
