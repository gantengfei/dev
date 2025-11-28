# Sass 控制指令：@if、@each、@for、@while

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
