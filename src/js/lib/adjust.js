
function isMobile() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  // 匹配常见的移动设备关键词
  return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
}

/**
 * 单位：rem , 1px = 1/100 =0.01rem , 1rem = 1*100 = 100px;
 */
function adjust() {
  if (isMobile()) {
    // console.log('当前在移动端打开');
    var devicewidth = parseInt($("html").css("width"));
    if (devicewidth <= 750) {
      var devicefontsize = devicewidth / 7.5;//计算当前设备自适应字体大小
      $("html").css("font-size", devicefontsize + "px");
    } else {
      $("html").css("font-size", "100px");
    }
    $("body").addClass("mobileView");
  } else {
    // console.log('当前在桌面端打开');
    $("html").css("font-size", "");
    $("body").removeClass("mobileView");
  }
}

adjust();
$(window).resize(adjust);
