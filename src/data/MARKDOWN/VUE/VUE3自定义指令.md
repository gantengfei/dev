# 一、理解vue指令

## 1.1、指令

在 vue 中提供了一些对于页面和数据更为方便的输出，这些操作就叫做指令，以 v-xxx 表示，比如 html 页面中的属性 `<div v-xxx ></div>`。自定义指令很大程度提高了开发效率，提高了工程化水平，一定要认真学习。

## 1.2、内置指令

在Vue中，诸如v-if、v-for、v-on等等被称之为内置指令，它们都是以v-开头的，我们无需注册即可在全局使用它们，内置指令提供了极大的方便给我们，比如v-for指令可以让我们快速循环出很多dom元素。

## 1.3、自定义指令

自己定义自定义指令的方法，实现我们需要的指令功能。

# 二、自定义指令钩子

## 2.1、vue2自定义指令钩子

`bind()`：当指令绑定在 `HTML` 元素上时触发

`inserted()`：当指令绑定的元素插入到父节点中的时候触发

`update()`：当指令绑定的元素状态/样式、内容(这里指元素绑定的 `vue` 数据) 发生改变时触发

`componentUpdated()`：当 `update()` 执行完毕之后触发

`unbind()`：当指令绑定的元素从 `dom` 中删除时触发

## 2.2、vue3自定义指令钩子

`created`：在绑定元素的 `attribute` 或事件监听器被应用之前调用。在指令需要附加在普通的 `v-on` 事件监听器调用前的事件监听器中时，这很有用。

`beforeMount`：当指令第一次绑定到元素并且在挂载父组件之前调用。

`mounted`：在绑定元素的父组件被挂载后调用，大部分自定义指令都写在这里。

`beforeUpdate`：在更新包含组件的 `VNode` 之前调用。

`updated`：在包含组件的 `VNode` 及其子组件的 `VNode` 更新后调用。

`beforeUnmount`：在卸载绑定元素的父组件之前调用

`unmounted`：当指令与元素解除绑定且父组件已卸载时，只调用一次。

# 三、自定义指令参数

``` TypeScript
created(el, binding, vnode, prevNode) {}
```

`el`：指令绑定到的元素。这可以用于直接操作 `DOM`。

`binding`：一个对象，包含以下属性：\
┣ `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 `2`。\
┣ `oldValue`：之前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否更改，它都可用。\
┣ `arg`：传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 "`foo`"。\
┣ `modifiers`：一个包含修饰符的对象 (如果有的话)。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`。\
┣ `dir`：指令的定义对象。\
┗ `instance`：使用该指令的组件实例。

`vnode`：代表绑定元素的底层 `VNode`。

`prevNode`：之前的渲染中代表指令所绑定元素的 `VNode`。仅在 `beforeUpdate` 和 `updated` 钩子中可用

# 四、vue3 + ts 自定义指令

## 4.1、局部自定义指令
4.1.1、在`<script setup>`定义组件内的指令，任何以v开头的驼峰式命名的变量都可以被用作一个自定义指令

``` html
<template>
  <input v-focus />
</template>
<script setup>
  // 在模板中启用 v-focus
  const vFocus = {
    mounted: (el: any) => el.focus()
  }
</script>

<style scoped lang="less"></style>
```

4.1.2、options api 自定义指令需要在directives选项中注册

``` html
<template>
  <input v-focus />
</template>
<script>
export default{
  setup() {},
  directives: {
    // 指令名
    focus: {
      // 生命周期
      mounted(el) {
        // 处理DOM的逻辑
        el.focus()
      },
    }
  }
}
</script>
```

## 4.2、全局自定义指令

4.2.1、src/directives/focus.ts

``` TypeScript
export default function(app: any) {
app.directive("focus", {
    mounted(el: any) {
      console.log("focus mounted");
      el.focus();
    }
  })
}
```

4.2.2、src/directives/index.ts

``` TypeScript
import registerFocus from './focus'; // 获取焦点

export default function registerDirectives(app: any) {
  registerFocus(app);
}
```

4.2.3、 main.ts

``` TypeScript
import registerDirectives from './directives'

const app = createApp(App)
registerDirectives(app)
```

4.3、在组件上使用指令

因为vue3可以有多个根节点，当有一个根节点时使用指令没有问题，如果有多个根节点使用指令回报错，建议多个根节点可以在组件内部使用指令。

# 五.自定义指令

## 5.1 拖拽指令 v-drag

``` TypeScript
export default function (app: any) {
  // 指令的名称，定义时指令前面不需要写v-
  // 使用的时候要用 v-
  app.directive("drag", {
    mounted(el: any) {
      el.onmousedown = function (e: any) {
        const disx = e.pageX - el.offsetLeft;
        const disy = e.pageY - el.offsetTop;
        document.onmousemove = function (e) {
          el.style.left = e.pageX - disx + 'px';
          el.style.top = e.pageY - disy + 'px';
        }
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;
        }
      }
    }
  })
}
```

## 5.2 拖拽指令 v-draggable

``` TypeScript
export default function (app: any) {
  // 指令的名称，定义时指令前面不需要写v-
  // 使用的时候要用 v-
  app.directive("draggable", {
    mounted(el: any) {
      el.style.cursor = 'move'
      el.onmousedown = function (e: any) {
        const disx = e.pageX - el.offsetLeft
        const disy = e.pageY - el.offsetTop
        document.onmousemove = function (e) {
          let x = e.pageX - disx
          let y = e.pageY - disy
          const maxX = document.body.clientWidth - parseInt(window.getComputedStyle(el).width)
          const maxY = document.body.clientHeight - parseInt(window.getComputedStyle(el).height)
          if (x < 0) {
            x = 0
          } else if (x > maxX) {
            x = maxX
          }

          if (y < 0) {
            y = 0
          } else if (y > maxY) {
            y = maxY
          }

          el.style.left = x + 'px'
          el.style.top = y + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null
        }
      }
    }
  })
}
```
