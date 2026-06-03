
const host = window.location.host;
const WEB_PATH = host.includes('github') ? '/dev' : ''

$(function () {
  let nowdate = new Date();
  let year = nowdate.getFullYear();
  let month = nowdate.getMonth() + 1;
  $('.footer-wrap').empty().html(`G · ©2022.05~${year}.${String(month).padStart(2, '0')}`);

  // 当前时间
  $('.head-box .timebox .day').empty().html(`星期${week[nowdate.getDay()]}<br>${nowdate.format('yyyy-mm-dd')}`)
  $('.head-box .timebox .hhmm').empty().html(nowdate.format('HH:MM'))
  $('.head-box .timebox .ss').empty().html(nowdate.format(':ss'))
  setInterval(() => {
    let date = new Date();
    $('.head-box .timebox .day').empty().html(`星期${week[date.getDay()]}<br>${date.format('yyyy-mm-dd')}`)
    $('.head-box .timebox .hhmm').empty().html(date.format('HH:MM'))
    $('.head-box .timebox .ss').empty().html(date.format(':ss'))
  }, 1000);

  // 退休时间
  const st = new Date(nowdate.format('yyyy-mm-dd'))
  const et = new Date('2053-10-01')
  const txTime = getDateDiff(st, et)

  $('.head-box .retiretime').empty().html(`${txTime.totalDays}DAY`)


  const data = $.ajax({ async: false, url: `${WEB_PATH}/src/data/lists.json` }).responseJSON;

  let navActive = window.location.hash.replace('#', '');

  let Htm = ``;
  data.DS.forEach((item, index) => {
    const { menuname, menupath, menulists, icon } = item;
    let _isActived = false;
    let liHtm = ``, itemNum = 0;
    menulists.forEach((iitem, iindex) => {
      if (iitem.submenulists) {
        liHtm += `<li class="sidebar-submenu">${iitem.name}<i>(${iitem.submenulists.length})</i></li>`
        iitem.submenulists.forEach((siitrm, siindex) => {
          const { name, filename, filepath, isActive } = siitrm;
          let path = filepath ? filepath : menupath;
          let active = '';
          if (decodeURI(navActive)) {
            if (name == decodeURI(navActive)) {
              active = 'actived';
              _isActived = true;
              loadmd(filename, path);
            }
          } else {
            if (isActive) {
              active = 'actived';
              _isActived = true;
              loadmd(filename, path);
            }
          }
          liHtm += `<li class="sidebar-item ${active}" name="${name}" filename="${filename}" path="${path}">${name}</li>`;
          itemNum++
        })
      } else {
        const { name, filename, filepath, isActive } = iitem;
        let path = filepath ? filepath : menupath;
        let active = '';
        if (decodeURI(navActive)) {
          if (name == decodeURI(navActive)) {
            active = 'actived';
            _isActived = true;
            loadmd(filename, path);
          }
        } else {
          if (isActive) {
            active = 'actived';
            _isActived = true;
            loadmd(filename, path);
          }
        }
        liHtm += `<li class="sidebar-item ${active}" name="${name}" filename="${filename}" path="${path}">${name}</li>`;
        itemNum++
      }
    })
    Htm += `<li class="${_isActived ? 'open' : ''}">
      <div class="sidebar-group ${_isActived ? 'open' : ''}"><span class="group-title ${icon}">${menuname}<i>(${itemNum})</i></span><span class="arrow ${_isActived ? 'down' : 'right'}"></span></div>
      <ul>${liHtm}</ul>
    </li>`;
  })
  $('.mdlists').html(Htm);

  $('.mdlists .sidebar-group').each((index, elem) => {
    $(elem).click(() => {
      if (!$(elem).hasClass('open')) {
        $('.mdlists .sidebar-group').removeClass('open');
        $('.mdlists .sidebar-group').parent().removeClass('open');
        $('.mdlists .sidebar-group').find('.arrow').addClass('right').removeClass('down');
        $(elem).addClass('open');
        $(elem).parent().addClass('open');
        $(elem).find('.arrow').addClass('down').removeClass('right');
      } else {
        $(elem).removeClass('open');
        $(elem).parent().removeClass('open');
        $(elem).find('.arrow').addClass('right').removeClass('down');
      }
    })
  })

  $('.mdlists .sidebar-item').each((index, elem) => {
    $(elem).click(() => {
      if (!$(elem).hasClass('actived')) {
        $('.mdlists .sidebar-item').removeClass('actived');
        $(elem).addClass('actived');
        $(window).scrollTop(0);
        let name = $(elem).attr('name');
        let filename = $(elem).attr('filename');
        let path = $(elem).attr('path');
        location.href = `#${name}`;
        loadmd(filename, path);
        if (isMobileView()) $('.sidebar-box').fadeOut();
      }
    })
  })


  let ticking = false;
  // 滚动页面
  $(window).scroll(() => {
    let scrollTop = $(document).scrollTop();
    if (scrollTop > 200) {
      $('.back-top-btn').fadeIn();
    } else {
      $('.back-top-btn').fadeOut(function () {
        $(this).removeClass('toping')
      });
    }

    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgressBar();
        highlightActiveMenuItem();
        ticking = false;
      });
      ticking = true;
    }
  })

  /** 返回顶部 */
  $('.back-top-btn').on('click', function () {
    $(this).addClass('toping');
    $('html,body').animate({ scrollTop: '0px' }, 500)
    $('.rightmenuwrap ul').animate({ scrollTop: '0px' }, 500)
  })

  $('.leftmenutab').on('click', function () {
    $('.sidebar-box').fadeToggle();
  })

})

const week = ['日', '一', '二', '三', '四', '五', '六']

function loadmd(filename, path) {
  let _path = `${WEB_PATH}/src/data/${path}${filename}`
  axios({ url: _path }).then(res => {
    // console.log(res.data);
    $('#mdview').empty().html(marked(res.data));

    hljs.highlightAll();

    if (!isMobileView()) loadMarkedMenu();

    imgAmplifier();
  })
}

let isRmenu = false;
let isManualScrolling = false;
/** 加载当前md菜单 */
function loadMarkedMenu() {
  let indexNum = 0;
  $('#mdview .headtitle').each((index, elem) => {
    if ($(elem).parent('blockquote').length == 0) indexNum++
    else {
      $(elem).parent('blockquote').addClass($(elem).attr('id').toLowerCase());
    }
  })

  if (indexNum == 0) {
    $('.rightmenuwrap').hide();
    isRmenu = false;
    return;
  }
  $('.rightmenuwrap').fadeIn();
  isRmenu = true;

  let Htm = ``;
  $('#mdview .headtitle').each((index, elem) => {
    if ($(elem).parent('blockquote').length == 0) {
      let txt = $(elem).text();
      Htm += `<li class="rightmenu${$(elem).attr('level')}" anchor="${txt}"><span>${txt}</span></li>`;
    }
  })
  $('.rightmenuwrap ul').empty().html(Htm);

  $('.rightmenuwrap ul li').each((index, elem) => {
    $(elem).click((e) => {
      e.preventDefault();
      let a = document.getElementById($(elem).attr('anchor'));
      if (a) {
        // 标记为手动滚动，暂停自动高亮更新
        isManualScrolling = true;

        $('.rightmenuwrap ul li span').removeClass('active');
        $(elem).find('span').addClass('active');

        a.scrollIntoView(true);
        window.scrollBy(0, -offsetTop); // 元素滚动到视口后，向上偏移40像素

        // 滚动动画完成后，延迟恢复自动高亮更新
        setTimeout(function () {
          isManualScrolling = false;
        }, 500);
      }
    })
  })

}

const offsetTop = 60; // 考虑头部高度的偏移量
/** 高亮当前激活的目录项 */
function highlightActiveMenuItem() {
  if (!isRmenu) return;
  if (isManualScrolling) return;

  const headings = $('#mdview .headtitle');
  if (headings.length === 0) return;

  let currentHeading = null;
  const scrollTop = $(window).scrollTop();

  // 找到当前可视区域内的标题
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    const headingTop = $(heading).offset().top - offsetTop;

    if (scrollTop >= headingTop) {
      currentHeading = heading;
    } else {
      break;
    }
  }

  // 如果没有找到合适的标题，使用第一个标题
  if (!currentHeading && headings.length > 0) {
    currentHeading = headings[0];
  }

  if (currentHeading) {
    const anchorText = $(currentHeading).text();
    // 移除所有active类
    $('.rightmenuwrap ul li span').removeClass('active');
    // 为当前激活的菜单项添加active类
    const activeItem = $(`.rightmenuwrap ul li[anchor="${anchorText}"]`);
    activeItem.find('span').addClass('active');

    // 确保高亮项在可视区域内
    if (activeItem.length > 0) {
      const menuUl = $('.rightmenuwrap ul');
      const itemTop = activeItem.position().top;
      const itemHeight = activeItem.outerHeight();
      const menuHeight = menuUl.height();
      const menuScrollTop = menuUl.scrollTop();

      // 如果项在可视区域上方，滚动到顶部
      if (itemTop < 0) {
        menuUl.scrollTop(menuScrollTop + itemTop - 10);
      }
      // 如果项在可视区域下方，滚动到底部
      else if (itemTop + itemHeight > menuHeight) {
        menuUl.scrollTop(menuScrollTop + itemTop + itemHeight - menuHeight + 10);
      }
    }
  }
}

/** 图片放大器 */
function imgAmplifier() {
  $("img").off('click').on('click', function () {
    let _this = $(this);//将当前的img元素作为_this传入函数
    if (_this.attr('id') != 'bigimg') {
      imgShow("#outerdiv", "#bigimg", _this);
    }
  });

  let bigimgDom = $('#bigimg')
  mousewheel(bigimgDom[0], function () {
    let zoomWidth = bigimgDom.innerWidth() * 1.02;
    bigimgDom.css({ width: zoomWidth + "px" })
  }, function () {
    let zoomWidth = bigimgDom.innerWidth() / 1.02;
    bigimgDom.css({ width: zoomWidth + "px" })
  })
}

function imgShow(outerdiv, bigimg, _this) {
  let src = _this.attr("src"); // 获取当前点击的pimg元素中的src属性
  $(bigimg).attr("src", src); // 设置#bigimg元素的src属性
  /*获取当前点击图片的真实大小，并显示弹出层及大图*/
  $("<img/>").attr("src", src).load(function () {
    let windowW = $(window).width(); // 获取当前窗口宽度
    let windowH = $(window).height(); // 获取当前窗口高度
    let realWidth = this.width; // 获取图片真实宽度
    let realHeight = this.height; // 获取图片真实高度
    let imgWidth, imgHeight;
    let scale = 0.9; // 缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放
    if (realHeight > windowH * scale) { // 判断图片高度
      imgHeight = windowH * scale; // 如大于窗口高度，图片高度进行缩放
      imgWidth = imgHeight / realHeight * realWidth; // 等比例缩放宽度
      if (imgWidth > windowW * scale) { // 如宽度扔大于窗口宽度
        imgWidth = windowW * scale; // 再对宽度进行缩放
      }
    } else if (realWidth > windowW * scale) { // 如图片高度合适，判断图片宽度
      imgWidth = windowW * scale; // 如大于窗口宽度，图片宽度进行缩放
      imgHeight = imgWidth / realWidth * realHeight; // 等比例缩放高度
    } else { // 如果图片真实高度和宽度都符合要求，高宽不变
      imgWidth = realWidth;
      imgHeight = realHeight;
    }
    $(bigimg).css("width", imgWidth); // 以最终的宽度对图片缩放
    $(outerdiv).fadeIn("fast"); // 淡入显示#outerdiv及.pimg
  });
  $(outerdiv).click(function () { // 再次点击淡出消失弹出层
    $(this).fadeOut("fast");
  });
}

function getDateDiff(startDate, endDate) {
  if (new Date(startDate).getTime() > new Date(endDate).getTime()) return { years: 0, months: 0, days: 0, totalDays: 0 };

  const sYear = startDate.getFullYear();
  const sMonth = startDate.getMonth() + 1;
  const sDay = startDate.getDate();
  const eYear = endDate.getFullYear();
  const eMonth = endDate.getMonth() + 1;
  const eDay = endDate.getDate();

  // 计算总天数差
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  // 计算年数
  let years = eYear - sYear;
  if (years > 0) years--

  // 计算月数
  let sm_diff = 12 - sMonth;
  let em_num = eMonth - 1;
  let months = 0;
  if (years > 0) {
    months = sm_diff + em_num;
    if (months > 12) {
      months = months - 12;
      years++;
    }
  } else {
    months = eMonth - sMonth - 1;
  }

  // 计算天数
  const startDayOfMonth = new Date(sYear, sMonth, 0).getDate();   // 开始天当月天数
  let sd_diff = startDayOfMonth - sDay; // 开始天不算进去
  let days = sd_diff + eDay; // 结束当天算进去

  return { years, months, days, totalDays };
}


function updateProgressBar() {
  // 获取文档总高度
  const scrollHeight = document.documentElement.scrollHeight;
  // 获取视口高度
  const clientHeight = document.documentElement.clientHeight;
  // 获取已滚动距离
  const scrollTopY = window.scrollY;

  // 可滚动的最大距离（防止除以 0）
  const maxScroll = scrollHeight - clientHeight;

  if (maxScroll <= 0) {
    // 内容不足一屏，直接设为 100%
    $('.progress-bar').width('100%');
    return;
  }
  // 计算滚动百分比（0 ~ 100）
  const percent = (scrollTopY / maxScroll) * 100;

  // 更新进度条宽度
  $('.progress-bar').width(`${percent}%`);
}


// 发大图片滚轮缩放
function mousewheel(obj, upfun, downfun) {
  if (document.attachEvent) {
    obj.attachEvent("onmousewheel", scrollFn)
  } else {
    if (document.addEventListener) {
      obj.addEventListener("mousewheel", scrollFn, false);
      obj.addEventListener("DOMMouseScroll", scrollFn, false)
    }
  }

  function scrollFn(e) {
    var ev = e || window.event;
    var dir = ev.wheelDelta || ev.detail;
    if (ev.preventDefault) {
      ev.preventDefault()
    } else {
      ev.returnValue = false
    }
    if (dir == -3 || dir == 120) {
      upfun()
    } else {
      downfun()
    }
  }
}

function openIndexPage() {
  // if ($('body').hasClass('mobileView')) return;
  location.href = 'https://gantengfei.github.io/dev/';
}

function handleRiliView() {
  window.open(`${WEB_PATH}/views/rili/`)
}

function handleDtimerView() {
  window.open(`${WEB_PATH}/views/dtimes/`)
}

function handleClockView() {
  window.open(`${WEB_PATH}/views/clock/`)
}

function handleTuxView() {
  window.open(`${WEB_PATH}/views/tux/`)
}

function isMobileView() {
  return $('body').hasClass('mobileView')
}
