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
import AView from '@/views/AView.vue'
import BView from '@/views/BView.vue'
import CView from '@/views/CView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // 路由模式 hash模式
  routes: [
    {
      path: '/',
      name: 'home',
      component: AView,
      meta: { title: '首页' }
    },
    {
      path: '/a',
      name: 'aview',
      component: AView,
      meta: { title: 'A页面' }
    },
    {
      path: '/b',
      name: 'bview',
      component: BView,
      meta: { title: 'B页面' }
    },
    {
      path: '/c',
      name: 'cview',
      component: CView,
      meta: { title: 'C页面' }
    }
  ]
})

export default router
```

`components/HeadMenuContainer.vue` 导航菜单组件
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

# 二级菜单路由配置

## redirect重定向
`router/index.ts` 路由配置
``` typescript
import { createRouter, createWebHashHistory } from 'vue-router'
import AView from '@/views/AView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // 一个对象就对应了一个路由
    // path 就是路由的地址
    // name 给路由起的名字
    // component 具体跳转的是哪个组件页面
    {
      /* path: '/' 根页面，表示已进入就显示的页面 */
      path: '/',
      name: 'home',
      /* 这种方式一进入页面就会全部加载，不是用到的时候再加载，性能没有懒加载的方式好 */
      component: AView,
      meta: { title: '首页' }
    },
    {
      path: '/a',
      name: 'aview',
      component: AView,
      meta: { title: 'A页面' }
    },
    {
      /* 这里是一级目录所以可以加斜杠/，表示根目录 */
      path: '/b',
      name: 'bview',
      // 可以使用redirect重定向，一进入主页就展示第一个子页面，redirect 后面跟的是路径名，并不是name
      // 如果路径/是根路径，可以直接写bboot
      // b不是根路径，所以redirect后面要写全'/b/bboot'
      redirect: '/b/bboot',
      meta: { title: 'B页面' },
      children: [
        {
          path: 'bboot',
          name: 'bboot',
          component: () => import('@/views/b/bbootView.vue'),
          meta: { title: 'B启动页' }
        },
        {
          path: 'bchild/:type?',
          name: 'bchild',
          component: () => import('@/views/b/bchildView.vue'),
          meta: { title: 'B二级页面' }
        }
      ]
    },
    {
      path: '/c',
      name: 'cview',
      /* 懒加载功能：一开始不加载，当切换路由的时候再加载 */
      component: () => import('@/views/CView.vue'),
      meta: { title: 'C页面' }
    },
    {
      /* path:'*' 必须要放最后 */
      /* path:'*' 表示上面的路由没有匹配到，则进入下面的页面 */
      path: '*',
      name: 'notfound',
      /* 懒加载功能：一开始不加载，当切换路由的时候再加载 */
      component: () => import('@/components/NotFound.vue'),
      meta: { title: '无页面' }
    }
  ]
})

export default router
```

`components/HeadMenuContainer.vue` 导航菜单组件
``` xml
<template>
  <div class="headwrap">
    <div class="headmenu">
      <div class="menuitem" v-for="(item, index) in menuArr" :key="index" :code="item.type">
        <div class="mainitem" :class="item.isActive ? 'actived' : ''">
          <RouterLink :to="item.page" v-if="item.page" @click="handleMenu(item.type)">{{ item.name }}</RouterLink>
          <span v-else>{{ item.name }}</span>
        </div>
        <ul class="submenuitem" v-if="item.submenu">
          <li v-for="(subitem, subindex) in item.submenu" :key="subindex" :code="subitem.type" :class="subitem.isActive ? 'actived' : ''">
            <a :href="subitem.page" target="_blank" v-if="subitem.isLink">{{ subitem.name }}</a>
            <RouterLink :to="subitem.page" v-else @click="handleMenu(item.type, subitem.type)">{{ subitem.name }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const menuArr: any = reactive([
  { name: 'A页面', type: 'a', page: '/a', isActive: true },
  {
    name: 'B页面', type: 'b', page: '/b',
    submenu: [
      { name: 'B二级页面', type: 'bchild', page: '/b/bchild' }
    ]
  },
  { name: 'C页面', type: 'c', page: '/c' }
])

/**
 * 操纵菜单
 * @param type 主菜单类型
 * @param subtype 二级子菜单类型
 */
const handleMenu = (type: string, subtype?: string) => {
  menuArr.forEach((v: any) => {
    if (v.type === type) {
      v.isActive = true;
      if (subtype && v.submenu) {
        v.submenu.forEach((sv: any) => {
          sv.type === subtype ? sv.isActive = true : sv.isActive = false;
        })
      }
    } else {
      v.isActive = false;
      if (v.submenu) v.submenu.forEach((sv: any) => sv.isActive = false)
    }
  });
}

onMounted(() => {

  const currentPath = window.location.hash.substring(2);
  initMenu(currentPath || '/');

  // 监听浏览器
  window.addEventListener('hashchange', (e) => {
    const currentPath = window.location.hash.substring(2);
    initMenu(currentPath || '/');
  }, false)

})

let initMenu = (type: string) => {
  if (type != '/') {
    if (type.includes('/')) {
      handleMenu(type.split('/')[0], type.split('/')[1]);
    } else {
      handleMenu(type);
    }
  } else {
    handleMenu(menuArr[0].type);
  }
}

</script>
```


# 路由传参方式

## 1.params传参
**1.1 显示参数（动态路由匹配）**

（1）在开始传参前，需要子路由提前配置好参数。比如`:type`。

> **url**中的参数需要用冒号 `:` 表示。当一个路由被匹配时，它的 `params` 的值将在每个组件中以 `this.$route.params` 的形式暴露出来。\
> 因为参数在**url**路径上显示，所以当我们刷新时，参数依旧保留
``` typescript
//子组件
{
  path: '/menu/:type',
  name: 'menu',
  component: () => import ('@/views/menu'),
  meta: { show: true }
}
```

（2）传参分为声明式传参和编程式传参

**声明式传参**：该方式是通过 `router-link` 组件的`to`属性实现，该方法的参数可以是一个字符串路径，或者一个描述地址的对象。
``` xml
//父路由组件
<router-link :to="/menu/123">菜单页table</router-link>
```

**编程式传参**:该方式是通过 `this.$router.push`属性实现。\
（a）字符串的形式传参
``` typescript
//父路由编程式传参(一般通过事件触发)
this.$router.push({
  path:'/menu/${type}',
})
```
（b）对象形式传参(路由必须要有别名name)
``` typescript
//父路由编程式传参
this.$router.push({
  name: "menu",
  params: { type: this.type },//这种方式的传参必须要有路由的别名name
});
```

**注意项：**\
（1）`params`传参如何做到可传可不传？\
在子组件的参数路径后面加上`?`，采用正则表达式
``` typescript
{
  path: '/menu/:type?',
  name: 'menu',
  component: () => import ('@/views/menu'),
  meta: { show: true }
}
```
（2）`params`传参如何传空字符？
在父组件传参的时候，给参数加上判断。如果是空字符，则传入`undefined`
``` typescript
this.$router.push({
  name: "menu",
  params: { type: this.type || undefined },
});
```

**1.2 不显示参数**

**注意：** 当`params`不在路由上时，参数为不可见。*但是当我们刷新页面是，参数会消失*。

`params` 传参（不显示参数）也可分为 **声明式** 和 **编程式** 两种方式，与前面不同的是，这里是通过路由的别名 name 进行传值的，并且子路由不需要配置参数。

**声明式传参：**该方式是通过 `router-link` 组件的`to`属性实现，比如：
``` xml
//父路由组件
<router-link :to="{name:'menu',params:{type:123}}">进入搜索页面</router-link>
```

**编程式传参：**该方式是通过`this.$router.push`属性对象方式实现。
``` typescript
//父路由编程式传参
this.$router.push({
  name: "menu",
  params: { type: this.type },//这种方式的传参必须要有路由的别名name
});
```

**1.3 获取传参**

在子路由中可以通过下面代码来获取传递的参数值
``` typescript
this.$route.params.keyword
```
