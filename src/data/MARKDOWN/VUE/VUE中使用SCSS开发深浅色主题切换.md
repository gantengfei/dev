# 开发浅色和深色系主题

在 **Vue** 项目中结合 **SCSS** 开发浅色和深色系主题，最推荐的方案是“**SCSS 变量管理 + CSS 自定义属性（CSS Variables）运行时切换**”。这种混合方案既利用了 **SCSS** 强大的代码组织能力，又保证了主题可以在浏览器中动态、平滑地切换。

## 1. 使用 SCSS Map 组织主题数据

首先，创建一个 **SCSS** 文件（如 **_variables.scss**），利用 **SCSS** 的 **map** 数据结构来集中管理浅色和深色主题的配色。这能极大提高代码的可维护性，新增主题也只需添加一项即可：

``` scss @src/assets/sass/_variables.scss
$headHeight: 38px;

$themes: (
  // ☀️ 浅色系
  light: (
    theme-bgImage: url(../image/icon/theme_light.png),
    head-bgColor: #d4e5ff,
    head-menu-1: url(../image/icon/headmenu/light/menu_1.png),
    head-menu-2: url(../image/icon/headmenu/light/menu_2.png),
    // ... 其他图标
    head-menu-7: url(../image/icon/headmenu/light/menu_7.png),
  ),
  // 🌙 深色系
  dark: (
    theme-bgImage: url(../image/icon/theme_dark.png),
    head-bgColor: #000716,
    head-menu-1: url(../image/icon/headmenu/dark/menu_1.png),
    head-menu-2: url(../image/icon/headmenu/dark/menu_2.png),
    // ... 其他图标
    head-menu-7: url(../image/icon/headmenu/dark/menu_7.png),
  ),
);
```

## 2. 批量生成 CSS 变量规则

在创建一个 **SCSS** 文件（如 **_themes.scss**），编写一个 **SCSS** 的 `@each` 循环，将上述 **Map** 中的数据自动转换为 **CSS** 自定义属性（变量）。这里推荐使用 `data-theme` 属性作为选择器：

``` scss @src/assets/sass/_themes.scss
@each $theme-name, $theme-map in $themes {
  :root[data-theme="#{$theme-name}"] {
    @each $key, $value in $theme-map {
      --#{$key}: #{$value};
    }
  }
}
```

**注意**：`#{...}` 是 **SCSS** 的插值语法，且务必将变量挂载到全局作用域 `:root` 下，以确保所有子元素都能继承。

## 3. 样式统一引用 CSS 变量

在你的 **Vue** 组件或全局样式中，绝对不要直接使用 **SCSS** 函数（如 `map-get`）去获取颜色值，否则编译后颜色会被写死，无法实现动态切换。必须统一使用 `var()` 来引用 **CSS** 变量：

``` scss @src/assets/sass/_index.scss
.headwrap {
  height: $headHeight;
  background-color: var(--head-bgColor);

  .icon_theme {
    background-image: var(--theme-bgImage);
  }
}
```

在 `@for` 循环中只负责生成基础结构和引用 **CSS** 变量，具体的颜色或图片路径交由 **CSS** 变量控制。

``` scss @src/assets/sass/_icon.scss
@for $i from 1 through 7 {
  .icon_hmenu_#{$i} {
    background: {
      image: var(--head-menu-#{$i});
      repeat: no-repeat;
      position: 8px center;
    }
  }
}
```

## 4. screen.scss 引入样式

在 **screen.scss** 中引入 **_variables.scss** **_themes.scss**:
``` scss @src/assets/sass/screen.scss
@charset "UTF-8";

@import "variables", "themes", "icon";

@import "index";
```

## 5. 实现状态切换与持久化

将主题状态封装到 **Pinia** 中，可以更方便地在全局范围内管理主题状态，并与其他业务逻辑（如用户偏好、系统设置等）进行联动。

### 5.1 创建 Pinia Store

在 `src/stores/` 目录下创建一个 `theme.ts` 文件。这里我们使用类似组件 `setup()` 函数的语法来定义 **Store**，这种写法非常简洁且灵活：

``` TypeScript @src/stores/theme.ts
import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue';

export const useThemeStore = defineStore('theme', () => {

  const storeKey = 'xxxTheme'; // 当前系统存储的键名

  // 定义当前主题的响应式状态
  const currentTheme = ref<'light' | 'dark'>('light');

  // 定义应用主题的方法（修改 DOM 和持久化）
  const applyTheme = (theme: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(storeKey, theme);
  };

  // 切换主题方法
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme.value);
  };

  // 初始化逻辑：在 Store 首次被调用时执行
  onMounted(() => {
    const saved = localStorage.getItem(storeKey) as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved) {
      currentTheme.value = saved;
    } else if (systemPrefersDark) {
      currentTheme.value = 'dark';
    }

    applyTheme(currentTheme.value);
  });


  // 暴露给组件使用的属性和方法
  return {
    currentTheme,
    toggleTheme,
  };
});
```

### 5.2 在 Vue 组件中使用

在任意组件中，只需引入并调用 `useThemeStore()` 即可获取全局共享的主题状态。当在一个组件中切换主题时，其他所有使用了该 **Store** 的组件都会自动响应更新：

``` vue @HeadMenuContainer.vue
<template>
  <div class="headwrap">
    <i class="icon_theme"></i>
    <p>当前模式:{{ themeStore.currentTheme }}</p>
    <button @click="themeStore.toggleTheme">切换至{{ themeStore.currentTheme === 'light' ? '深色' : '浅色' }}模式</button>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();
</script>
```
