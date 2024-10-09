
$(function () {
  let nowdate = new Date();
  let year = nowdate.getFullYear();
  let month = nowdate.getMonth() + 1;
  $('.footer-wrap').empty().html(`G · ©2022~${year}.${month < 10 ? `0${month}` : month}`);

  const data = $.ajax({ async: false, url: '../src/data/lists.json' }).responseJSON;

  let navActive = window.location.hash.replace('#', '');

  let Htm = ``;
  data.DS.forEach((item, index) => {
    const { menuname, menupath, menulists } = item;
    let _isActived = false;
    let liHtm = ``;
    menulists.forEach((iitem, iindex) => {
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
    })
    Htm += `<li class="${_isActived ? 'open' : ''}">
      <div class="sidebar-group ${_isActived ? 'open' : ''}"><span>${menuname}</span><span class="arrow ${_isActived ? 'down' : 'right'}"></span></div>
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
      }
    })
  })


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

    if (isRmenu) {
      if (scrollTop > 16) {
        let obj = $('.main-box').offset();
        let width = $('.main-box').width();
        $('.rightmenuwrap').css({ "left": `${obj.left + width}px` }).addClass('fixed');
      } else {
        $('.rightmenuwrap').removeAttr('style').removeClass('fixed');
      }
    }
  })

  // $(window).resize(() => {
  //   if ($('.rightmenuwrap').css('position') == 'fixed') {
  //     let obj = $('.main-box').offset();
  //     let width = $('.main-box').width();
  //     $('.rightmenuwrap').css({ "left": `${obj.left + width}px` });
  //   }
  // })

  /** 返回顶部 */
  $('.back-top-btn').on('click', function () {
    $(this).addClass('toping');
    $('html,body').animate({ scrollTop: '0px' }, 500)
  })

})

function loadmd(filename, path) {
  let _path = `../src/data/${path}${filename}`
  axios({ url: _path }).then(res => {
    // console.log(res.data);
    $('#mdview').empty().html(marked(res.data));

    hljs.highlightAll();

    loadMarkedMenu();

    imgAmplifier();
  })
}

let isRmenu = false;
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
    $(elem).click(() => {
      let a = document.getElementById($(elem).attr('anchor'));
      if (a) a.scrollIntoView(true);
    })
  })

}

/** 图片放大器 */
function imgAmplifier() {
  $("img").click(function () {
    let _this = $(this);//将当前的img元素作为_this传入函数
    if (_this.attr('id') != 'bigimg') {
      imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);
    }
  });
}

function imgShow(outerdiv, innerdiv, bigimg, _this) {
  let src = _this.attr("src");//获取当前点击的pimg元素中的src属性
  $(bigimg).attr("src", src);//设置#bigimg元素的src属性
  /*获取当前点击图片的真实大小，并显示弹出层及大图*/
  $("<img/>").attr("src", src).load(function () {
    let windowW = $(window).width();//获取当前窗口宽度
    let windowH = $(window).height();//获取当前窗口高度
    let realWidth = this.width;//获取图片真实宽度
    let realHeight = this.height;//获取图片真实高度
    let imgWidth, imgHeight;
    let scale = 0.8;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放
    if (realHeight > windowH * scale) {//判断图片高度
      imgHeight = windowH * scale;//如大于窗口高度，图片高度进行缩放
      imgWidth = imgHeight / realHeight * realWidth;//等比例缩放宽度
      if (imgWidth > windowW * scale) {//如宽度扔大于窗口宽度
        imgWidth = windowW * scale;//再对宽度进行缩放
      }
    } else if (realWidth > windowW * scale) {//如图片高度合适，判断图片宽度
      imgWidth = windowW * scale;//如大于窗口宽度，图片宽度进行缩放
      imgHeight = imgWidth / realWidth * realHeight;//等比例缩放高度
    } else {//如果图片真实高度和宽度都符合要求，高宽不变
      imgWidth = realWidth;
      imgHeight = realHeight;
    }
    $(bigimg).css("width", imgWidth);//以最终的宽度对图片缩放
    let w = (windowW - imgWidth) / 2;//计算图片与窗口左边距
    let h = (windowH - imgHeight) / 2;//计算图片与窗口上边距
    $(innerdiv).css({ "top": h, "left": w });//设置#innerdiv的top和left属性
    $(outerdiv).fadeIn("fast");//淡入显示#outerdiv及.pimg
  });
  $(outerdiv).click(function () {//再次点击淡出消失弹出层
    $(this).fadeOut("fast");
  });
}
