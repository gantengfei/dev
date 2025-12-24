# ➤ Sass 控制指令

Sass（SCSS 语法）提供一组控制指令用于条件判断与循环，常用于生成重复的样式或根据变量分支。下面是简要用法与示例。

## @if / @else if / @else
根据条件选择样式块。
```scss
$theme: dark;

.button {
  @if $theme == light {
    background: #fff;
    color: #000;
  } @else if $theme == dark {
    background: #000;
    color: #fff;
  } @else {
    background: gray;
  }
}
```

**基本语法与用法**

**‌基础条件判断‌：**`@if` 后跟一个表达式，如果表达式为 `true`，则执行后续代码块。
``` scss
$block: true !default;
.name{
  display: none;
  @if $block {
    display: flex;
  }
}
```

**多条件逻辑‌：**使用 `@else if` 和 `@else` 处理多个条件。

**逻辑运算符‌：**`Sass` 支持 `not`（非）、`or`（或）、`and`（与）来组合条件。
``` scss
@for $i from 1 through 10 {
  .icon_tool_#{$i} {
    background-color: #ffffff;

    &.actived {
      background-color: #ff0000;
    }

    @if $i==2 or $i==3 or $i==5 {
      &.disabled {
        background-color: #9c9393;
      }
    }
  }
}
```

**比较运算符‌：**使用 `==` 和 `!=` 进行相等性判断。‌

## @each
遍历列表或映射（map）。
```scss
// 列表
$colors: red blue green;
@each $c in $colors {
  .text-#{$c} { color: $c; }
}

// 映射 (key/value)
$themes: (primary: #06c, danger: #e00);
@each $name, $col in $themes {
  .btn-#{$name} { background: $col; }
}
```

## @for
按索引循环，可使用 from ... through（包含结束值）或 from ... to（不包含结束值）。
```scss
// 生成 .col-1 到 .col-12
@for $i from 1 through 12 {
  .col-#{$i} { width: percentage($i / 12); }
}

// 不包含结束值
@for $i from 0 to 3 {
  .level-#{$i} { margin-left: $i * 0.5rem; }
}
```

## @while
基于条件的循环，注意避免无限循环。
```scss
$i: 1;
@while $i <= 5 {
  .item-#{$i} { width: 10px * $i; }
  $i: $i + 1;
}
```

## 注意事项
- 这些指令在编译时生成样式（CSS），不会在运行时引入逻辑开销。
- 字符串插值 #{} 常用来动态拼接选择器或属性名。
- 对映射使用 @each 可以同时取得键和值：@each $k, $v in $map。
- 谨防 @while 导致的无限循环；循环变量需在循环体内改变（或确保条件能终止）。

以上示例采用 SCSS 语法，缩进式 Sass 语法概念相同但语法略异。
