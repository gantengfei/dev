[Pinia](https://pinia.web3doc.top/) 是 Vue 的存储库，它允许您跨组件/页面共享状态。

# VUE中搭建Pinia Store使用

**1、创建 Pinia Store**

在 Vue 项目中创建一个 Pinia store。通常，你会在 `src/stores` 目录下创建这个 store。例如，创建一个名为 `userStore.ts` 的文件：
``` TypeScript
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', {
  state: () => ({
    username: '', // 真实名
    name: '', // 账号名
  }),
  actions: {
    /** 设置用户真实名 */
    setUsername(username: string) {
      this.username = username
    }
    /** 设置用户名 */
    setName(name: string) {
      this.name = name
    }
  }
})
```

**2、在 Vue 应用中使 Pinia Store**

**2.1** 创建 Pinia 实例并安装到 Vue 应用中

在 Vue 应用的主入口文件 main.ts 中，创建 Pinia 实例并将其安装到 Vue 应用中：
``` TypeScript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.mount('#app')
```

**2.2** 在组件中使用 Store

现在，你可以在任何组件中通过 useUserInfoStore 来使用你的 store 了：
``` html
<template>
  <div>
    <h1>{{ username }}</h1>
    <button @click="setUsername('New Username')">Change Username</button>
  </div>
</template>

<script setup>
import { useUserInfoStore } from '@/stores/userStore';
const userStore = useUserInfoStore();
const { username, setUsername } = userStore;
</script>
```

**3、使用 Composition API (如果需要)**

如果你使用的是 Vue 3 的 Composition API，你可以通过 setup() 函数来使用 store：
``` html
<script setup>
import { useUserInfoStore } from '@/stores/userStore';
const userStore = useUserInfoStore();
const { username, setUsername } = userStore;
</script>
```

**4、使用 Options API (如果需要)**

如果你更喜欢使用 Options API，可以这样做：
``` html
<template>
  <div>
    <h1>{{ userStore.username }}</h1>
    <button @click="userStore.setUsername('New Username')">Change Username</button>
  </div>
</template>

<style lang="scss"></style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ref, reactive } from 'vue'
import { useUserInfoStore } from '@/stores/userStore';

//@ts-ignore
@Options({
  name: "module-name",
  components: {}
})

export default class ModuleName extends Vue {

  public userStore = useUserInfoStore();

  mounted(): void {

  }

}
</script>
```

# pinia 存储大数据卡顿问题优化

在Vue项目中使用Pinia存储大数据时可能会遇到性能问题，主要原因包括内存占用过高、响应式系统开销以及缺乏优化策略。

**大数据存储的性能瓶颈**

**1.‌深层响应式对象‌：**Pinia默认会对嵌套对象进行深层响应式处理，当数据结构复杂时（如多层嵌套数组/对象），会显著增加内存和计算开销。例如存储包含10万条记录的列表时，每个字段的响应式代理都会消耗额外资源。

**2.‌高频状态更新‌：**当每秒更新状态超过100次时（如实时数据流场景），小程序端帧率可能下降至45fps，Web端也会出现明显卡顿。

**‌3.持久化存储同步‌：**使用pinia-plugin-persistedstate插件时，大数据写入localStorage可能阻塞主线程，且浏览器存储有5MB限制（不同浏览器有差异）。

## 优化方案1 shallowRef
**1.数据结构优化**

**· 使用浅层响应式‌：**对大型数据集采用`shallowRef`替代深层响应式，避免不必要的代理：
``` typescript
import { shallowRef } from 'vue'
const largeData = shallowRef(rawDataset) // 仅顶层响应式:ml-citation{ref="3,10" data="citationList"}
```

**· 分块存储‌：**将大数据拆分为多个store，按需加载。例如电商系统可将商品数据按分类存储在不同store中。

## 优化方案2 markRaw

在Vue 3和Pinia中，`markRaw`是一个用于标记对象使其不会被转换为响应式Proxy的API。

**1.markRaw的核心作用**

- 1.1将一个普通对象标记为"原始"（非响应式），Vue的响应式系统会跳过对该对象的Proxy代理转换。
- 1.2常用于性能优化或避免特定场景下的响应式副作用，例如：
- 第三方库实例（如DOM元素）
- 大型不可变数据（如配置对象）
- 需要保持引用一致性的对象

**2.Pinia中的典型应用场景**

- **‌避免Store内部非状态数据的响应式转换‌：**Pinia在源码中使用`markRaw`标记Pinia实例本身，防止其被意外转换为响应式对象。
- **‌插件开发‌：**当插件需要向Store注入静态工具方法或常量时，可通过`markRaw`避免不必要的响应式开销。
- **‌性能敏感操作‌：**如处理大型列表时，标记部分静态数据可减少响应式系统开销。

**3.与`toRaw`的区别**

`toRaw`：将响应式Proxy对象还原为原始对象（反向操作）
`markRaw`：预先阻止对象被转换为响应式Proxy（预防性操作）

``` typescript
import { markRaw } from 'vue'
import { defineStore } from 'pinia'

const staticData = markRaw({
  version: '1.0',
  metadata: { /* 大型配置对象 */ }
})

export const useStore = defineStore('main', () => {
  // 被markRaw标记的对象不会被转换为响应式
  const immutableConfig = staticData

  return { immutableConfig }
})
```

Pinia内部实现中，`markRaw`确保了核心实例（如Pinia对象本身）不会因响应式转换而产生意外行为，这是其架构设计的重要优化手段之一

### 项目案例
``` typescript
import { markRaw } from 'vue'
import { defineStore } from 'pinia'

/** 绘制存储 */
export const useDrawStore = defineStore('Draw', {
  state: () => ({
    GridSource: markRaw({} as Record<string, any>), // 智能网格数据
  }),
  actions: {
    /** 网格数据 */
    setGridSource(data: Record<string, any>) {
      this.GridSource = data
    },

    /** 初始化Store状态 */
    initStore() {
      this.GridSource = {}
    }
  }
})

```

在vue页面路由改变后存储数据还存在需要清除还原初始状态

``` html
<template>
  <div>AppContent</div>
</template>

<style lang="scss"></style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { useDrawStore } from '@/stores/drawStore';

//@ts-ignore
@Options({
  name: "xxModule",
  components: {}
})

export default class xxModule extends Vue {

  private drawStore = useDrawStore();

  mounted(): void {

  }

  beforeUnmount(): void {
    this.drawStore.initStore()
  }

}
</script>
```
