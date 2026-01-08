
``` TypeScript @index.module.ts
/** 页面主题色
  * light / dark
  * data-theme="light"
  */
$(".headetheme").on("click", function () {
  let theme = $(this).attr("theme");
  theme = theme == "light" ? "dark" : "light";
  $(this).attr("theme", theme);

  self.setTheme(theme);
});

private setTheme(type) {
  window.document.documentElement.setAttribute("data-theme", type);

  // 主页内 iframe 页面改变主题
  try {
    window.frames[0].document.getElementsByTagName("html")[0].setAttribute("data-theme", type);
  } catch (error) {
    console.warn("iframe > data-theme !");
    let Interval = setInterval(() => {
      let iframeHtml = window.frames[0].document.getElementsByTagName("html")[0];
      if (iframeHtml) {
        window.clearInterval(Interval);
        window.frames[0].document.getElementsByTagName("html")[0].setAttribute("data-theme", type);
      }
    }, 1000);
  }
}
```

``` scss @screen.scss
@import "themes", "mixin";
@import "index";

* {
  font-size: 14px;
  border: 0;
  margin: 0;
  padding: 0;
  user-select: none;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  outline: none;
}

```

``` scss @_mixin.scss
// 遍历主题map
@mixin themeify {
  @each $theme-name, $theme-map in $themes {
    // !global 把局部变量强升为全局变量
    $theme-map: $theme-map !global;

    // 判断html的data-theme的属性值  #{}是sass的插值表达式
    // & sass嵌套里的父容器标识   @content是混合器插槽，像vue的slot
    [data-theme="#{$theme-name}"] & {
      @content;
    }
  }
}

// 声明一个根据Key获取颜色的function
@function themed($key) {
  @return map-get($theme-map, $key);
}

// 获取背景颜色
@mixin background_color($color) {
  @include themeify {
    background-color: themed($color);
  }
}

// 获取背景图
@mixin background_image($url) {
  @include themeify {
    background-image: url(themed($url));
  }
}

// 获取字体颜色
@mixin font_color($color) {
  @include themeify {
    color: themed($color);
  }
}

// 获取边框颜色
@mixin border_color($color) {
  @include themeify {
    border-color: themed($color);
  }
}
```

``` scss @themes.scss
/* ☀️----------☀️ */
$l_background-color: #f5f8fb;
$l_font-color: #333;

/* 🌙----------🌙 */
$d_background-color: rgba(245, 248, 251, 0.2); // F5F8FB
$d_font-color: #fff;

$themes: (
  /* ☀️----------☀️ */
  light:(
    item_333333_fontColor: $l_font-color,

    backgroundColor_F5F8FB: $l_background-color,

    logotitle: "../images/logo/logotitle_l.png",
  ),
  /* 🌙----------🌙 */
  dark:(
    item_333333_fontColor: $d_font-color,

    backgroundColor_F5F8FB: $d_background-color,

    logotitle: "../images/logo/logotitle_d.png",
  )
)
```

``` scss @_index.scss

.wrap{
  @include background_color("backgroundColor_F5F8FB");
  // → background-color: #F5F8FB;
}

.name{
  @include font_color("item_333333_fontColor");
  // → color: #333333;
}

.logo{
  @include background_image("logotitle");
  // → background-image: url(../images/logo/logotitle_l.png);
}

```
