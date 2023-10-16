# 一、获取iframe对象

## 1.通过id获取
通过iframe的id属性获取iframe对象，例如：
``` JavaScript
const iframe = document.getElementById('indexIframe');
```

## 2.通过索引获取
如果页面中有多个iframe，可通过索引获取iframe对象，例如：
``` JavaScript
const iframe = document.getElementsByTagName('iframe')[0];
```
在上述示例中，通过getElementsByTagName方法获取了页面中的所有iframe元素，并通过索引获取了第一个iframe对象。



# 二、操作iframe

## 1.父页面操作子页面中内容
JavaScript语法
``` JavaScript
// 方法一：
document.getElementById('indexIframe').contentWindow.document.getElementsByTagName('html')[0].setAttribute('data-theme', 'ligt');
// 方法二：
window.frames['indexIframe'].document.getElementsByTagName('html')[0].setAttribute('data-theme', 'ligt');
```
jQuery语法
``` JavaScript
// 方法一：
$('#indexIframe').contents().find('html').attr('data-theme', 'ligt');
// 方法二：
$('html', document.frames('indexIframe').document).attr('data-theme', 'ligt');
```

**案例：** 页面换肤功能
``` HTML
<iframe id="indexIframe" src="" frameborder="0" border="0"></iframe>
```
``` TypeScript
let self = this;
/** 页面主题色
 * light / dark
 * data-theme="light"
 */
$(".headetheme").on("click", function () {
  let theme = $(this).attr("theme");
  theme = theme == "light" ? "dark" : "light";
  self.themeType = theme;
  $(this).attr("theme", theme);

  self.setTheme(theme);
  // window.localStorage.setItem("hometheme", theme);
});

// 设置皮肤方法
private setTheme(type) {
  window.document.documentElement.setAttribute("data-theme", type);

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


## 2.父页面调用子页面中的方法
JavaScript语法，`handleTest()`方法在子页面中
``` JavaScript
// 方法一：
document.getElementById('indexIframe').contentWindow.handleTest();
// 方法二：
document.frames['indexIframe'].handleTest();
```


## 3.子页面获取父页面中元素
``` JavaScript
// * JavaScript语法
window.parent.document.getElementById("ORGID").value = 111;
// * jQuery语法
$("#ORGID", parent.document).val('111');
```


## 4.子页面调用父页面中的方法
``` JavaScript
// * JavaScript语法
window.parent.handleTest();
```


## 5.子页面操纵父页面中的其它iframe页面
``` JavaScript
// 前提：iframe必须设置了id。
// 获取iframe页面中的元素
window.frames['iframeId'].document.getElementById('elemID');
// 调用iframe页面中的方法
window.frames['iframeId'].handleTest();
```



# 三、iframe父子互传
发送信息内容
``` JavaScript
// 当前系统页面IP及端口
const IPxxx = document.domain;
const IPport = window.location.port;

// 传递的内容
let msg = {
  source: 'index',
  info: {
    name: ""
  },
  isShow: true
}
```


## 1.子页面信息传到父页面中
``` JavaScript
// 子传父
window.parent.postMessage(msg, `http://${IPxxx}:${IPport}`);
// 或
window.parent.postMessage(msg, '*');

// 父接收
window.addEventListener('message', (event) => {
  if (event.data.source != 'index') return
  // ...
}, false)
```


## 2.父页面信息传到子页面中
``` JavaScript
// 父传子
document.getElementById('iframeId')['contentWindow'].postMessage(msg, '*');
// 子接收
window.addEventListener('message', (event) => {
  if (event.data.source != 'index') return
  // ...
}, false)
```
