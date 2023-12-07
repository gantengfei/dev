# Vue Router

[Vue Router](https://router.vuejs.org/zh/introduction.html) 是 [Vue.js](https://cn.vuejs.org/) 的官方路由。

在创建路由器实例时, `history` 配置允许我们在不同的历史模式中进行选择。

`HTML5 history` 模式或 `hash` 模式。

## HTML5 模式
用 `createWebHistory()` 创建 HTML5 模式，推荐使用这个模式：
``` typescript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
})
```
当使用这种历史模式时，URL 会看起来很 "正常"，例如 `https://example.com/user/id`。

**问题**：由于我们的应用是一个单页的客户端应用，如果没有适当的服务器配置，用户在浏览器中直接访问 `https://example.com/user/id`，就会得到一个 404 错误。这就尴尬了。

要解决这个问题，你需要做的就是在你的服务器上添加一个简单的回退路由。如果 URL 不匹配任何静态资源，它应提供与你的应用程序中的 `index.html` 相同的页面。
[服务器配置示例](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%85%8D%E7%BD%AE%E7%A4%BA%E4%BE%8B)


## Hash 模式
hash 模式是用 `createWebHashHistory()` 创建的：
``` typescript
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
})
```

它在内部传递的实际 URL 之前使用了一个哈希字符（`#`）。由于这部分 URL 从未被发送到服务器，所以它不需要在服务器层面上进行任何特殊处理。

hash是 URL 中hash（`#`）及后面部分，**改变** URL 的hash不会引起页面的刷新，通过`hashchange`事件来监听URL的变化。
``` typescript
window.addEventListener('hashchange',(e)=> {
  console.log(e)
})
```

**window.location.hash读取#值**

location.hash可以用来获取或设置页面的标签值，比如`http://127.0.0.1:5173/#/about`的`location.hash="#/about"`。

在当前 URL 的锚部分(以 '#' 号为开始) 发生改变时触发
``` typescript
window.onhashchange = function(){};

window.addEventListener("hashchange", function(){}, false);

// <body onhashchange="myFunction()">
```

**通过URL访问其它路由**

通过浏览器输入 `http://127.0.0.1:5173/#/` 访问首页（A页面） \
访问C页面，通过浏览器输入 `http://127.0.0.1:5173/#/c` 可直接访问

`router/index.ts` 路由配置
``` typescript
import { createRouter, createWebHashHistory } from 'vue-router'
import AView from '../views/AView.vue'
import BView from '../views/BView.vue'
import CView from '../views/CView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // 路由模式 hash模式
  routes: [
    {
      path: '/',
      name: '首页',
      component: AView
    },
    {
      path: '/a',
      name: 'A页面',
      component: AView
    },
    {
      path: '/b',
      name: 'B页面',
      component: BView
    },
    {
      path: '/c',
      name: 'C页面',
      component: CView
    }
  ]
})

export default router

```

`HeadMenuContainer.vue` 导航菜单组件
``` xml
<template>
  <div class="headwrap">
    <div class="headmenu">
      <RouterLink v-for="(item, index) in menuArr" :key="index" :code="item.type" :class="item.isActive ? 'actived' : ''" @click="handleMenu(item.type)" :to="item.page">{{ item.name }}</RouterLink>
    </div>
  </div>
</template>

<style lang="scss"></style>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const menuArr = reactive([
  { name: 'A页面', type: 'a', page: '/a', isActive: true },
  { name: 'B页面', type: 'b', page: '/b' },
  { name: 'C页面', type: 'c', page: '/c' }
])

const handleMenu = (type: string) => {
  menuArr.forEach((v) => v.type === type ? v.isActive = true : v.isActive = false);
}

onMounted(() => {

  const currentPath = window.location.hash.substring(2);
  handleMenu(currentPath || '/');

  // 监听浏览器
  window.addEventListener('hashchange', (e) => {
    const currentPath = window.location.hash.substring(2);
    handleMenu(currentPath || '/');
  }, false)

})

</script>
```
