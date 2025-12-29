# 1、视图层

这一层使用 `Composition API`（组合式）架构，因为通过编译器语法糖确实可以使用非常简明的代码来声明 `props` 和 `emits` 的类型。
``` html
<template>
  <div>AppContent</div>
</template>

<style lang="scss"></style>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'

onMounted(() => {

})

</script>
```

# 2、业务层

这一层与业务相关，使用 `Options API`（选项式），架构中应用Class定义组件（`vue-class-component`）。

`vue-class-component` 作为一个类装饰器库，提供了一种基于 TypeScript 类语法的组件定义方式，不仅提升了代码的可读性和可维护性，还充分利用了 TypeScript 的强大特性。
``` html
<template>
  <div>AppContent</div>
</template>

<style lang="scss"></style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ref, reactive } from 'vue'

//@ts-ignore
@Options({
  name: "module-name",
  components: {}
})

export default class ModuleName extends Vue {

  mounted(): void {

  }

}
</script>
```

> ## TIP **装饰器风格开发的优点**
> + **简洁与结构化：**使用装饰器风格可以使 Vue 组件的定义更加简洁、结构化，代码更加符合面向对象编程的风格。
> + **类型安全：**TypeScript 的类型检查使得装饰器风格开发能够提供更强的类型安全保障，避免很多类型错误。
> + **语法糖：**装饰器语法使得属性、计算属性、事件监听等的声明更加清晰易懂，减少了大量的模板代码。
