# rem 单位
rem（font size of the root element）是指相对于根元素的字体大小的单位。简单的说它就是一个相对单位。看到rem大家一定会想起em单位，em（font size of the element）是指相对于父元素的字体大小的单位。它们之间其实很相似，只不过一个计算的规则是依赖根元素一个是依赖父元素计算。



# 移动端
以宽750px设计稿开发为例：

``` css
/* 宽200px , 字号12px */
div {
  width: 0.2rem;
  font-size: 0.12rem;
}
```

adjust.js
```` javascript
/**
 * 单位：rem , 1px = 1/100 =0.01rem , 1rem = 1*100 = 100px;
 */
adjust();
$(window).resize(adjust);

function adjust() {
  var devicewidth = parseInt($("html").css("width"));
  if (devicewidth <= 750) {
    var devicefontsize = devicewidth / 7.5;//计算当前设备自适应字体大小
    $("html").css("font-size", devicefontsize + "px");
  } else {
    $("html").css("font-size", "100px");
  }
}
````


# PC端
以宽1920px设计稿开发为例：

``` css
/* 宽200px , 字号12px */
div {
  width: 0.2rem;
  font-size: 0.12rem;
}
```

adjust.js
```` javascript
/**
 * 单位：rem , 1px = 1/100 =0.01rem , 1rem = 1*100 = 100px;
 */
adjust();
$(window).resize(adjust);

function adjust() {
  var _w = $('body').width();
  var size = _w / 19.2 + "px";
  $("html").css("font-size", size);
}
````
