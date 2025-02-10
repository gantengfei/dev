[Pinia](https://pinia.web3doc.top/) 是 Vue 的存储库，它允许您跨组件/页面共享状态。

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
