# 1.进入全屏
``` JavaScript
// 进入全屏
let fullScreen = function () {
  let documentElement: any = window.document.documentElement;
  if (documentElement.requestFullscreen) {
    documentElement.requestFullscreen();
  } else if (documentElement.msRequestFullscreen) {
    documentElement.msRequestFullscreen();
  } else if (documentElement.mozRequestFullScreen) {
    documentElement.mozRequestFullScreen();
  } else if (documentElement.webkitRequestFullscreen) {
    documentElement.webkitRequestFullscreen();
  } else {
    console.warn("Your browser does not support the Fullscreen API.");
  }
};
```


# 2.退出全屏
``` JavaScript
// 退出全屏
let exitFullScreen = function () {
  let document: any = window.document;
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else {
    console.warn("Your browser does not support the Fullscreen API.");
  }
};
```
> ## WARN
> 使用`if (document.exitFullscreen){}`判断退出全屏时，如果异常报错 \
> **报错如下：** \
> <span class="error">Uncaught (in promise) TypeError: Failed to execute ‘exitFullscreen’ on ‘Document’: Document not active</span>
> **报错原因：** 在未全屏的情况下触发exitFullscreen

**解决方案：**
``` JavaScript
// 在退出全屏前判断 document.fullscreenElement !== null
if (document.fullscreenElement !== null) {
  document.exitFullscreen();
}
```


# 3.全屏事件
``` JavaScript
// 全屏事件
document.addEventListener("fullscreenchange", function (e) {
  // 监听到屏幕变化，在回调中判断是否已退出全屏 如果已退出全屏 把本地状态修改为false
  // document.fullscreen 会返回true或false
  if (!document.fullscreenElement) {
    console.log('退出全屏')
    // iframe父传递信息给子页面
    // document.getElementById("indexIframe")["contentWindow"].postMessage({ source: "fullscreen" }, "*");
  }else{
    console.log('进入全屏')
  }
});
```


# 4.案例：按钮点击事件
``` JavaScript
// 全屏
$('.tool_FullscreenControl').click(function (e) {
  e.stopPropagation();
  if (!$(this).hasClass('actived')) {
    $(this).addClass('actived');
    fullScreen(); // 开启全屏
  } else {
    $(this).removeClass('actived');
    exitFullScreen(); // 关闭全屏
  }
})
```

# 5.案例：`iframe`子页面控制父页面全屏
``` JavaScript
// 子页面点击事件
$(".tool_FullscreenControl").click(function (e) {
  e.stopPropagation();
  if (!$(this).hasClass("actived")) {
    $(this).addClass("actived");
    window.parent.postMessage({ fullscreen: true, id: "fullscreen" }, "*");
  } else {
    $(this).removeClass("actived");
    window.parent.postMessage({ fullscreen: false, id: "fullscreen" }, "*");
  }
});

// 页面退出全屏时修改子页面中状态
window.addEventListener('message', (event) => {
  if (event.data.source=='fullscreen') {
    $(".tool_FullscreenControl").removeClass('actived');
  }
})
```
``` JavaScript
// 父页面接收事件
window.addEventListener("message", event => {
  if (event.data.id == "fullscreen") {
    if (event.data.fullscreen) {
      fullScreen(); // 开启全屏
    } else {
      exitFullScreen(); // 关闭全屏
    }
  }
});
```
