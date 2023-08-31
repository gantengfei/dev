
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
  })

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
  })
}
