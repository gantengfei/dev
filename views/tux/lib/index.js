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
  const tfPercent = ((tfPassedDays / tfTotalDays) * 100).toFixed(2)

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
  const xuePercent = ((xuePassedDays / xueTotalDays) * 100).toFixed(2)

  // 计算延迟年数（延迟月数/12）
  const xueDelayYears = (60 / 12).toFixed(0)

  // 计算退休日期当月第一天的星期
  const xueRetireDateFirstDay = new Date(exue.getFullYear(), exue.getMonth(), 1)
  const xueWeekday = getWeekday(xueRetireDateFirstDay)

  // 更新男性卡片
  $('.tf-days').html(tftxTime.totalDays)
  $('.tf-years-months-days').html(`约${tftxTime.years}年${tftxTime.months}月${tftxTime.days}日`)
  $('.tf-percent').html(`${tfPercent}%`)
  $('.tf-progress').css('width', `${tfPercent}%`)
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
  $('.xue-years-months-days').html(`约${xuetxTime.years}年${xuetxTime.months}月${xuetxTime.days}日`)
  $('.xue-percent').html(`${xuePercent}%`)
  $('.xue-progress').css('width', `${xuePercent}%`)
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
  let months = sm_diff + em_num;

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
