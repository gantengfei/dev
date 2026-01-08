# 百分比计算

**SCSS** 提供了一些内置函数，可以帮助你更好地处理数值和单位。使用 `percentage()` 函数将任何数值转换为相对于其上下文的百分比。

``` scss
.wrap{
  $width: 7680;
  $leftW: 1015;
  $rigthW: 1015;

  &.leftscreen {
    flex-basis: percentage(calc($leftW / $width)); // → 13.216145833333334%
  }

  &.centerscreen {
    flex-basis: percentage(calc(($width - $leftW - $rigthW) / $width));  // → 73.56770833333334%
  }

  &.rightscreen {
    flex-basis: percentage(calc($rigthW / $width)); // → 13.216145833333334%
  }
}
```

# 生成带 calc() 的样式

通过 **Sass** 的 `@function` 或 `@mixin` 来生成带 `calc()` 的样式，从而实现“封装”效果，让代码更简洁、可复用。

``` scss
:root {
  --scale: 0.4412037037037037;
}
```

## 使用 @function 生成 calc() 表达式字符串

``` scss
// 定义一个函数，接收像素值（不带单位的数字）
@function scale-px($px) {
  @return calc(#{$px}px * var(--scale, 1));
}

// 使用示例
.wrap {
  font-size: scale-px(12);     // → calc(12px * var(--scale, 1))
  padding: scale-px(8) scale-px(16);
  margin-top: scale-px(24);
}
```

> `#{$px}` 是 **Sass** 插值语法，把变量插入到字符串中。最终输出的是合法的 **CSS** `calc()` 表达式。

## 使用 @mixin

``` scss
@mixin scaled-font-size($size) {
  font-size: calc(#{$size}px * var(--scale, 1));
}

.title {
  @include scaled-font-size(18);
}
```
