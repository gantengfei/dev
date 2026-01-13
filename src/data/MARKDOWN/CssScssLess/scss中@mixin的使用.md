在 SCSS（Sass）中，`@mixin` 是一个非常强大的功能，用于定义可重用的样式代码块。你可以把一组 CSS 规则封装在一个 mixin 中，然后通过 `@include` 在需要的地方调用它。这有助于减少重复代码、提高可维护性，并支持参数化定制。

---

# 一、基本语法

``` scss
// 定义 mixin
@mixin 名称 {
  // 样式规则
}

// 使用 mixin
选择器 {
  @include 名称;
}
```

示例：

``` scss
@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  @include center;
  width: 100%;
}
```

编译后的 CSS：

``` css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
```

---

# 二、带参数的 mixin

mixin 可以接收参数，使样式更灵活。

``` scss
@mixin border-radius($radius) {
  border-radius: $radius;
}

.button {
  @include border-radius(8px);
}
```

**支持默认参数值：**

``` scss
@mixin box-shadow($x: 0, $y: 2px, $blur: 4px, $color: #000) {
  box-shadow: $x $y $blur $color;
}

.card {
  @include box-shadow($blur: 6px, $color: rgba(0,0,0,0.2));
}
```

编译后：

``` css
.card {
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
```

> 注意：调用时可以按名称传参（关键字参数），顺序无关。

---

# 三、可变参数（`...`）

使用 `...` 可以接收任意数量的参数：

``` scss
@mixin padding($values...) {
  padding: $values;
}

.box {
  @include padding(10px 20px);
}
```

输出：

``` css
.box {
  padding: 10px 20px;
}
```

---

# 四、内容块（`@content`）

mixin 还可以接受一段“内容块”，通过 `@content` 插入：

``` scss
@mixin media-mobile {
  @media (max-width: 768px) {
    @content;
  }
}

.sidebar {
  width: 300px;

  @include media-mobile {
    width: 100%;
  }
}
```

输出：

``` css
.sidebar {
  width: 300px;
}
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
  }
}
```

这在响应式设计或主题切换中非常有用。

---

# 五、最佳实践建议

- **命名清晰**：如 `@mixin button-style` 比 `@mixin btn` 更明确。
- **避免过度抽象**：只对真正重复的样式使用 mixin。
- **结合函数（`@function`）使用**：复杂逻辑可拆分为函数 + mixin。
- **文档注释**：为复杂 mixin 添加注释说明参数和用途。

---

# 六、与 `@extend` 的区别

| 特性             | `@mixin`                   | `@extend`              |
| ---------------- | -------------------------- | ---------------------- |
| 生成 CSS         | 每次 `@include` 都复制代码 | 合并选择器，不复制样式 |
| 支持参数         | ✅                         | ❌                     |
| 可用在媒体查询中 | ✅                         | ❌（有限制）           |
| 适合场景         | 参数化、动态样式           | 静态样式继承           |
