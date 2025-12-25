
# 方法一：精确计算（考虑月份天数差异）
``` JavaScript
let st = new Date('2025-12-23')
let et = new Date('2026-03-24')
const { years, months, days, totalDays } = getDateDiff(st, et)

console.log(`相差总天数：${totalDays}天`) // 91天
console.log(`相差年月天数：${years}年${months}月${days}天`); // 0年2月32天
```

> ## TIP
> 计算得到：2个完整的月份，8天（开始时间当月剩余天数）+24天（结束时间当月天数）=32天

``` JavaScript
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
```


# 方法二：简单计算（不考虑月份天数差异）
``` JavaScript
let st = new Date('2025-12-23')
let et = new Date('2026-03-24')
const { years, months, days, totalDays } = getDateDiff(st, et)

console.log(`相差总天数：${totalDays}天`) // 91天
console.log(`相差年月天数：${years}年${months}月${days}天`); // 0年3月1天
```

> ## WARNING
> 计算不考虑月份天数差异，将每个月按照30天计算。

``` JavaScript
/**
 * 获取时间差
 * @param {*} startDate 开始时间
 * @param {*} endDate 结束时间
 * @returns
 */
function getDateDiff(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 计算总天数差
  const timeDiff = Math.abs(end.getTime() - start.getTime());
  const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  // 计算年数
  let years = end.getFullYear() - start.getFullYear();

  // 计算月数
  let months = end.getMonth() - start.getMonth();
  if (months < 0) { years--; months += 12; }

  // 计算天数
  let days = end.getDate() - start.getDate();
  if (days < 0) {
    months--;
    // 获取上个月的天数
    const lastDayOfMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += lastDayOfMonth;

    if (months < 0) { years--; months += 12; }
  }

  return { years, months, days, totalDays };
}
```
