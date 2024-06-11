# 轻量化平台开发大作业

## 运行

推荐使用 pnpm（因为 `justfile` 中的命令用的是 pnpm）

- `just frontend`：启动前端
- `just backend`：启动后端

## 目录结构

- `/docs`：一些文档和笔记
    - `assets`：存放所有文档中的资源（比如截图）
- `/frontend`：前端项目的根目录
    - `dist`：**构建产物**
- `/backend`：后端端项目的根目录


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

引入后端：

- [Axios](https://github.com/axios/axios)：用于前端向后端发请求
- 手搓基于 json 的简易 key-value 数据库

## 第三次作业

见 [docs/第三次作业.md](./docs/第三次作业.md)。

## 第四次作业

更多内容见 [presentation/slides-export.pdf](./presentation/slides-export.pdf)

### 1. 作业内容

#### 前台

- [x] 登入
- [x] 商城主页面
    - [x] 首页
        - [x] 搜索框、轮播图、热门商品
    - [x] 分类
        - [x] 所有商品的分类索引
    - [x] 购物车
    - [x] 我的
- [x] 购买商品全程的界面
    - [x] 商品详细信息页面
    - [x] 创建订单页面
    - [x] 支付页面
    - [x] 订单详情页面

#### 后台

- [x] 登录
- [x] 权限、角色管理

- [x] 商品/分类/订单 管理三选一

#### 其他

可以参考 https://github.com/macrozheng/mall

- [x] 基本：借助 localStorage 实现前后台数据的联动
- [x] 进阶：搓个后端实现前后台数据的联动

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

### 3. 实现功能与分工

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

