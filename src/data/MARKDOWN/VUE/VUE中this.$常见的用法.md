在 `Vue.js` 中，`this.$` 是一个常见的用法，用于访问 Vue 实例的一些内置属性、方法或者插件提供的功能。以下是一些常见的 `this.$` 属性和方法：

`this.$data`: 获取 Vue 实例的数据对象。

`this.$props`: 获取组件的 props 对象。

`this.$refs`: 获取子组件或 DOM 元素的引用。

`this.$emit()`: 在子组件中触发父组件绑定的事件。

`this.$on()`: 在当前实例上监听一个自定义事件。

`this.$once()`: 在当前实例上监听一个自定义事件，但是只触发一次。

`this.$off()`: 在当前实例上移除自定义事件监听器。

`this.$nextTick()`: 在 DOM 更新之后立即执行回调函数。

`this.$watch()`: 监听 Vue 实例上的数据变化。

`this.$router`: 访问 Vue Router 实例，用于路由相关操作。

`this.$store`: 访问 Vuex store 实例，用于状态管理。

`this.$http` 或 `this.$axios`: 访问用于发起 HTTP 请求的插件，如 axios、vue-resource 等。

`this.$validator`: 在使用 VeeValidate 或其他表单验证插件时，用于表单验证。

`this.$createElement()`: 创建虚拟 DOM 元素。

`this.$set()`: 响应式地添加一个属性到 Vue 实例的数据对象。

`this.$delete()`: 响应式地删除 Vue 实例的数据对象的属性。

`this.$mount()`: 手动挂载 Vue 实例到 DOM 元素上。
