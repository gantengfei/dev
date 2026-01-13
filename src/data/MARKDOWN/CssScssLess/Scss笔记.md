# ➤ 百分比计算

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

# ➤ 生成带 calc() 的样式

通过 **SCSS** 的 `@function` 或 `@mixin` 来生成带 `calc()` 的样式，从而实现“封装”效果，让代码更简洁、可复用。

``` scss
:root {
  --scale: 0.4412037037037037;
}
```

## ❑ 使用 @function 生成 calc() 表达式字符串

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

> `#{$px}` 是 **Scss** 插值语法，把变量插入到字符串中。最终输出的是合法的 **CSS** `calc()` 表达式。

## ❑ 使用 @mixin

``` scss
@mixin scaled-font-size($size) {
  font-size: calc(#{$size}px * var(--scale, 1));
}

.title {
  @include scaled-font-size(18);
}
```

# ➤ 引入 OTF（OpenType Font）格式的字体
在 **SCSS** 中引入 `OTF（OpenType Font）` 格式的字体与引入 `TTF`、`WOFF` 等格式类似，只需在 `@font-face` 规则中正确指定字体文件路径和格式即可。

## 1. 放置字体文件
将 `.otf` 字体文件放入项目目录

``` text @src/assets/fonts
DIN-BlackItalic.otf
PangMenZhengDaoBiaoTiTiMianFeiBan-2.ttf
```
## 2. 在 **SCSS** 中定义 `@font-face`

``` scss @src/assets/sass/screen.scss
@font-face {
  font-family: 'DIN-BlackItalic';
  src: url('@/assets/fonts/DIN-BlackItalic.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'PangMenZhengDaoBiaoTi';
  src: url('@/assets/fonts/PangMenZhengDaoBiaoTiTiMianFeiBan-2.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

## ❑ 常见字体格式与 `format()` 对照表

| 文件扩展名 | MIME 类型（可选参考）                 | `format()`标识        | 说明                                    |
| :--------- | :------------------------------------ | :-------------------- | :-------------------------------------- |
| `.woff2`   | `font/woff2`                          | `'woff2'`             | 最佳压缩，现代浏览器首选                |
| `.woff`    | `font/woff`                           | `'woff'`              | 广泛兼容                                |
| `.ttf`     | `font/ttf` 或 `application/font-sfnt` | `'truetype'`          | TrueType 字体                           |
| `.otf`     | `font/otf` 或 `application/font-sfnt` | `'opentype'`          | OpenType 字体（可能含 PostScript 轮廓） |
| `.eot`     | `application/vnd.ms-fontobject`       | `'embedded-opentype'` | 仅 IE 支持（已过时）                    |

> ## NOTICE 注意
> `format('truetype')` 是 **CSS Fonts Module Level 3** 规范中定义的标准值。 \
> 虽然部分浏览器在省略 `format()` 时也能自动识别，但显式声明可提升解析效率和兼容性。

## 3. 使用自定义字体

``` scss @src/assets/sass/_mixin.scss
/** 侧边副屏 */
@function scalesidePX($px) {
  @return calc(#{$px}px * var(--scaleside, 1));
}

/** 标题样式 */
@mixin sideTitle {
  display: block;
  font-family: 'PangMenZhengDaoBiaoTi';
  line-height: scalesidePX(32);
  font-size: scalesidePX(20);
  background: linear-gradient(180deg, #FFF 0%, #B3FCFF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

``` scss
.title{
  font-family: 'PangMenZhengDaoBiaoTi';
}

span{
  font-family: "DIN-BlackItalic";
}

.sidetitle{
  span {
    @include sideTitle
  }
}
```
