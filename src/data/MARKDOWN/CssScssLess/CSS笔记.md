# ➤ `border-style` 属性

border-style属性设置一个元素的四个边框的样式。此属性可以有一到四个值。

**❑ 语法**

``` css
border-style: none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|initial|inherit;
```
**❑ 属性值**

| 值        | 描述                                                                  |
| :-------- | :-------------------------------------------------------------------- |
| `none`    | 定义无边框。                                                          |
| `hidden`  | 与 "none" 相同。不过应用于表时除外，对于表，hidden 用于解决边框冲突。 |
| `dotted`  | 定义点状边框。在大多数浏览器中呈现为实线。                            |
| `dashed`  | 定义虚线。在大多数浏览器中呈现为实线。                                |
| `solid`   | 定义实线。                                                            |
| `double`  | 定义双线。双线的宽度等于 `border-width` 的值。                        |
| `groove`  | 定义 3D 凹槽边框。其效果取决于 `border-color` 的值。                  |
| `ridge`   | 定义 3D 垄状边框。其效果取决于 `border-color` 的值。                  |
| `inset`   | 定义 3D inset 边框。其效果取决于 `border-color` 的值。                |
| `outset`  | 定义 3D outset 边框。其效果取决于 `border-color` 的值。               |
| `inherit` | 规定应该从父元素继承边框样式。                                        |

**JavaScript** 语法：	`object.style.borderStyle="dotted double"`


# ➤ `::before` 伪元素的 `content` 属性

在 **CSS** 中，`::before` 伪元素的 `content` 属性通常用于插入静态文本、图标（如 Unicode 字符）或引号等。但不能直接通过 **JavaScript** 那样的方式动态读取 **DOM** 元素的内容。

可以利用 **CSS** 自定义属性（CSS Variables） 来实现从 **HTML** 元素上“传递”内容到 `::before` 的 `content` 中。

## ❑ 使用 `attr()` 函数 + 自定义属性

1. 在 **HTML** 元素上设置一个自定义属性（例如 `data-before`）。
2. 在 **CSS** 中使用 `attr()` 函数读取该属性值，并赋给 `content`。

``` html
<div class="example" data-before="提示：">这是一段文字</div>
```

``` css
.example::before {
  content: attr(data-before);
  color: red;
  font-weight: bold;
}
```

> ## NOTICE 注意事项
> - ● `attr()` 在 `content` 中只能用于伪元素（`::before` / `::after`），不能用于普通元素的其他属性（除非在实验性支持中）。
> - ● `attr()` 默认返回字符串。虽然 **CSS** 规范未来可能支持其他类型（如数字、URL），但目前主流浏览器仅安全支持字符串。
> - ● 如果希望显示元素的 文本内容 或 其他动态内容，必须通过 JavaScript 将其写入一个 `data-*` 属性，再由 **CSS** 读取。


# ➤ 背景色渐变 linear-gradient() 函数
``` scss
// 语法
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);
```
| 值                           | 描述                               |
| :--------------------------- | :--------------------------------- |
| direction                    | 用角度值指定渐变的方向（或角度）。 |
| color-stop1, color-stop2,... | 用于指定渐变的起止颜色。           |


``` scss
// 从左侧开始的线性渐变
div{
  background-image: linear-gradient(
    to right,
    rgba(161, 241, 141, 1),
    rgba(61, 186, 61, 1),
    rgba(96, 184, 255, 1),
    rgba(0, 0, 255, 1),
    rgba(250, 0, 250, 1)
  );
}
```

## ❑ 案例：进度条文字颜色根据背景色改变

使用渐变背景颜色（`background:linear-gradient();`），在使用文字裁剪背景色（`background-clip: text;`）；

效果如图所示：

![输入图片说明](./src/img/images/2026-02-02_10-56-32.png "")

``` html
<div class="box" style="--bar-value: 49%;">
  <div class="bar"></div>
  <div class="val">49%</div>
</div>
```

``` scss
.box {
  width: 300px;
  height: 20px;
  background-color: #ccc;
  position: relative;
  border-radius: 10px;
  overflow: hidden;

  .bar {
    width: var(--bar-value);
    height: 100%;
    background-color: coral;
  }

  .val {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    line-height: 20px;
    text-align: center;
    background: linear-gradient(to right, #fff 0, #fff var(--bar-value), #333 var(--bar-value));
    background-clip: text;
    color: transparent;
  }
}
```


# ➤ text-align-last 属性

text-align-last 属性规定如何对齐文本的最后一行。

注意：text-align-last 属性只有在 text-align 属性设置为 "justify" 时才起作用。

**❑ 语法**

``` css
text-align-last: auto|left|right|center|justify|start|end|initial|inherit;
```
**❑ 属性值**

| 值        | 描述                                                                                                                 |
| :-------- | :------------------------------------------------------------------------------------------------------------------- |
| `auto`    | 默认值。最后一行被调整，并向左对齐。                                                                                 |
| `left`    | 最后一行向左对齐。                                                                                                   |
| `right`   | 最后一行向右对齐。                                                                                                   |
| `center`  | 最后一行居中对齐。                                                                                                   |
| `justify` | 最后一行被调整为两端对齐。                                                                                           |
| `start`   | 最后一行在行开头对齐（如果 `text-direction` 是从左到右，则向左对齐；如果 `text-direction` 是从右到左，则向右对齐）。 |
| `end`     | 最后一行在行末尾对齐（如果 `text-direction` 是从左到右，则向右对齐；如果 `text-direction` 是从右到左，则向左对齐）。 |
| `initial` | 设置该属性为它的默认值。                                                                                             |
| `inherit` | 从父元素继承该属性。                                                                                                 |


# ➤ 文本域 `textarea`

禁止手动拖拽调整元素大小

``` css
textarea {
  resize: none;
}
```


# ➤ 文字竖排 `writing-mode` 属性

**CSS** 中最标准、最直接的文字竖排方式，能够很好地处理中文古籍或传统排版

``` css
.vertical-text {
  writing-mode: vertical-rl; /* 文本垂直排列，从右向左流动（符合中文阅读习惯） */
  text-orientation: upright; /* 确保每个汉字保持直立，不发生旋转 */
}
```

- `vertical-rl`：垂直排列，从右向左换列（适合中文）。
- `vertical-lr`：垂直排列，从左向右换列（适合日文或蒙古文等）。
- `text-orientation: upright`：强制字符正立显示，防止在竖排时字符被侧向旋转。
