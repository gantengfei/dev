$(function () {
  let nowdate = new Date();
  // 当前日期
  const st = new Date(nowdate.format('yyyy-mm-dd'))

  // 男性数据
  const stf = new Date('1990-10-17')
  const etf = new Date('2053-10-01')
  const tftxTime = getDateDiff(st, etf)

  // 计算进度
  const tfTotalDays = getDateDiff(stf, etf).totalDays
  const tfPassedDays = getDateDiff(stf, st).totalDays
  let tfPercent = ((tfPassedDays / tfTotalDays) * 100)
  // 限制百分比在0-100之间
  tfPercent = Math.min(Math.max(tfPercent, 0), 100)
  tfPercent = tfPercent.toFixed(1)

  // 计算延迟年数（延迟月数/12）
  const tfDelayYears = (36 / 12).toFixed(0)

  // 计算退休日期当月第一天的星期
  const tfRetireDateFirstDay = new Date(etf.getFullYear(), etf.getMonth(), 1)
  const tfWeekday = getWeekday(tfRetireDateFirstDay)

  // 女性数据
  const sxue = new Date('1992-02-18')
  const exue = new Date('2047-02-01')
  const xuetxTime = getDateDiff(st, exue)

  // 计算进度
  const xueTotalDays = getDateDiff(sxue, exue).totalDays
  const xuePassedDays = getDateDiff(sxue, st).totalDays
  let xuePercent = ((xuePassedDays / xueTotalDays) * 100)
  // 限制百分比在0-100之间
  xuePercent = Math.min(Math.max(xuePercent, 0), 100)
  xuePercent = xuePercent.toFixed(1)

  // 计算延迟年数（延迟月数/12）
  const xueDelayYears = (60 / 12).toFixed(0)

  // 计算退休日期当月第一天的星期
  const xueRetireDateFirstDay = new Date(exue.getFullYear(), exue.getMonth(), 1)
  const xueWeekday = getWeekday(xueRetireDateFirstDay)

  // 更新男性卡片
  $('.tf-days').html(tftxTime.totalDays)

  // 构建年月日显示文本，为0时不显示
  let tfTimeText = '约'
  if (tftxTime.years > 0) tfTimeText += `${tftxTime.years}年`
  if (tftxTime.months > 0) tfTimeText += `${tftxTime.months}月`
  tfTimeText += `${tftxTime.days}天`
  $('.tf-years-months-days').html(tfTimeText)

  $('.tf-percent').html(`${tfPercent}%`)
  $('.tf-progress').css('width', `${tfPercent}%`)

  // 判断是否退休（进度>=100%）
  if (parseFloat(tfPercent) >= 100) {
    $('.tf-retire-congrats').show()
    $('.tf-days').parent().hide() // 隐藏倒计时
  } else {
    $('.tf-retire-congrats').hide()
    $('.tf-days').parent().show()
  }

  $('.tf-retire-age').html('63岁')
  $('.tf-delay-years').html(tfDelayYears)
  $('.tf-retire-weekday').html(tfWeekday)

  // 计算并显示当前年龄
  const tfCurrentAge = stf.getFullYear() > st.getFullYear()
    ? 0
    : st.getFullYear() - stf.getFullYear() - (st.getMonth() < stf.getMonth() || (st.getMonth() === stf.getMonth() && st.getDate() < stf.getDate()) ? 1 : 0)
  $('.tf-current-age').html(`${tfCurrentAge}岁`)

  // 更新女性卡片
  $('.xue-days').html(xuetxTime.totalDays)

  // 构建年月日显示文本，为0时不显示
  let xueTimeText = '约'
  if (xuetxTime.years > 0) xueTimeText += `${xuetxTime.years}年`
  if (xuetxTime.months > 0) xueTimeText += `${xuetxTime.months}月`
  xueTimeText += `${xuetxTime.days}天`
  $('.xue-years-months-days').html(xueTimeText)

  $('.xue-percent').html(`${xuePercent}%`)
  $('.xue-progress').css('width', `${xuePercent}%`)

  // 判断是否退休（进度>=100%）
  if (parseFloat(xuePercent) >= 100) {
    $('.xue-retire-congrats').show()
    $('.xue-days').parent().hide() // 隐藏倒计时
  } else {
    $('.xue-retire-congrats').hide()
    $('.xue-days').parent().show()
  }

  $('.xue-retire-age').html('55岁')
  $('.xue-delay-years').html(xueDelayYears)
  $('.xue-retire-weekday').html(xueWeekday)

  // 计算并显示当前年龄
  const xueCurrentAge = sxue.getFullYear() > st.getFullYear()
    ? 0
    : st.getFullYear() - sxue.getFullYear() - (st.getMonth() < sxue.getMonth() || (st.getMonth() === sxue.getMonth() && st.getDate() < sxue.getDate()) ? 1 : 0)
  $('.xue-current-age').html(`${xueCurrentAge}岁`)

})


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

// 获取星期几
function getWeekday(date) {
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return weekdays[date.getDay()];
}
