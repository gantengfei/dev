在 **Vue** 中使用 **Element Plus**（或 Element UI）的 `el-checkbox` 时，如果你希望禁止用户点击该复选框使其自身状态改变，但又保留其显示或其他交互（比如 tooltip、样式等）

# 方法一：使用 `.stop` 和 `.prevent` 阻止默认行为和事件冒泡

``` vue
<template>
  <el-checkbox v-model="checked" @click.native.stop.prevent>禁止点击</el-checkbox>
</template>

<script>
export default {
  data() {
    return {
      checked: true
    }
  }
}
</script>
```

> ## WARN
> - ● `.native` 是 **Vue 2** 的写法（**Element UI**）。
> - ● 在 **Vue 3 + Element Plus** 中，`el-checkbox` 的根元素已经是原生 **input** 的封装，推荐使用下面的方法。

# 方法二：Vue 3 + Element Plus 使用 `@click.stop.prevent`

> 阻止点击事件触发 `checkbox` 的默认切换行为。

``` vue
<template>
  <el-checkbox v-model="checked" @click.stop.prevent>禁止点击</el-checkbox>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(true)
</script>
```

# 方法三：通过 CSS 禁用指针事件（简单粗暴）

``` vue
<template>
  <el-checkbox v-model="checked" class="disabled-checkbox">禁止点击</el-checkbox>
</template>

<style scoped>
.disabled-checkbox :deep(.el-checkbox__input) {
  pointer-events: none;
}
</style>
```

> ## TIP
> **优点：**完全阻止点击，不会触发任何 JS 逻辑。 \
> **缺点：**如果需要动态控制是否可点击，需配合 class 切换。

# 方法四：使用 `disabled` 属性（但会变灰）

``` vue
<el-checkbox v-model="checked" disabled>禁用（会变灰）</el-checkbox>
```

# ➤ 总结

| 需求                          | 推荐方案                   |
| ----------------------------- | -------------------------- |
| 不想变灰，只禁止点击切换      | `@click.stop.prevent`      |
| 完全阻止交互（包括 focus 等） | CSS `pointer-events: none` |
| 接受灰色禁用样式              | 使用 `disabled`            |

