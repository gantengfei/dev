function numToSimp(n) {
  var str = "",
    units = parseInt(n % 10),
    tens = parseInt(n / 10),
    trans = "零一二三四五六七八九十";
  return tens > 1 && (str = trans.charAt(tens)), 0 != tens && (str += "十"), 0 != units && (str += trans.charAt(units)), 0 == tens && 0 == units && (str = trans[0]), str
}

function numToTrad(n) {
  var str = "",
    units = parseInt(n % 10),
    tens = parseInt(n / 10),
    trans = "零一二三四五六七八九";
  return tens > 1 && (str = trans.charAt(tens)), 0 != tens && (str += "十"), 0 != units && (str += trans.charAt(units)), 0 == tens && 0 == units && (str = trans[0]), str
}

function numToEng(n) {
  var str = "",
    units = parseInt(n % 10),
    tens = parseInt(n / 10),
    trans = [
      ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
      ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
    ];
  return 20 > n ? str = trans[0][n] : (str = trans[1][tens - 2], 0 != units && (str += trans[0][units])), 0 == tens && 0 == units && (str = trans[0][0]), str
}

function isLeapYear(year) {
  return year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? !0 : !1
}

function getYear(type, year) {
  var res = "",
    units = parseInt(year / 1 % 10),
    tens = parseInt(year / 10 % 10),
    hund = parseInt(year / 100 % 10),
    thou = parseInt(year / 1e3 % 10);
  switch (type) {
    case 0:
    case 3:
      res = year;
      break;
    case 1:
      res = numToSimp(thou) + numToSimp(hund) + numToSimp(tens) + numToSimp(units);
      break;
    case 2:
      res = numToTrad(thou) + numToTrad(hund) + numToTrad(tens) + numToTrad(units)
  }
  return res
}

function getMonths(type, month) {
  var months = new Array,
    monthsEng = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    i = 1;
  switch (type) {
    case 0:
      for (i = month; 12 >= i; i++) months.push(i);
      for (i = 1; month > i; i++) months.push(i);
      break;
    case 1:
      for (i = month; 12 >= i; i++) months.push(numToSimp(i));
      for (i = 1; month > i; i++) months.push(numToSimp(i));
      break;
    case 2:
      for (i = month; 12 >= i; i++) months.push(numToTrad(i));
      for (i = 1; month > i; i++) months.push(numToTrad(i));
      break;
    case 3:
      for (i = month - 1; 12 > i; i++) months.push(monthsEng[i]);
      for (i = 0; month - 1 > i; i++) months.push(monthsEng[i])
  }
  return months
}

function getdays(type, year, month, day) {
  var days = new Array,
    j = 1,
    isLeap = isLeapYear(year);
  switch (type) {
    case 0:
    case 3:
      for (j = day; 31 >= j && (days.push(j), 2 != month || !isLeap || 29 != j) && (2 != month || isLeap || 28 != j) && (2 != month && 4 != month && 6 != month && 9 != month && 11 != month || 30 != j); j++);
      for (j = 1; day > j; j++) days.push(j);
      break;
    case 1:
      for (j = day; 31 >= j && (days.push(numToSimp(j)), 2 != month || !isLeap || 29 != j) && (2 != month || isLeap || 28 != j) && (2 != month && 4 != month && 6 != month && 9 != month && 11 != month || 30 != j); j++);
      for (j = 1; day > j; j++) days.push(numToSimp(j));
      break;
    case 2:
      for (j = day; 31 >= j && (days.push(numToTrad(j)), 2 != month || !isLeap || 29 != j) && (2 != month || isLeap || 28 != j) && (2 != month && 4 != month && 6 != month && 9 != month && 11 != month || 30 != j); j++);
      for (j = 1; day > j; j++) days.push(numToTrad(j))
  }
  return days
}

function getShiChen(type, hour) {
  var shichen = {
    index: 0,
    str: ""
  };
  switch (type) {
    case 0:
      hour >= 23 || 1 > hour ? (shichen.index = 0, shichen.str = "23:00-1:00") : hour >= 1 && 3 > hour ? (shichen.index = 1, shichen.str = "1:00-3:00") : hour >= 3 && 5 > hour ? (shichen.index = 2, shichen.str = "3:00-5:00") : hour >= 5 && 7 > hour ? (shichen.index = 3, shichen.str = "5:00-7:00") : hour >= 7 && 9 > hour ? (shichen.index = 4, shichen.str = "7:00-9:00") : hour >= 9 && 11 > hour ? (shichen.index = 5, shichen.str = "9:00-11:00") : hour >= 11 && 13 > hour ? (shichen.index = 6, shichen.str = "11:00-13:00") : hour >= 13 && 15 > hour ? (shichen.index = 7, shichen.str = "13:00-15:00") : hour >= 15 && 17 > hour ? (shichen.index = 8, shichen.str = "15:00-17:00") : hour >= 17 && 19 > hour ? (shichen.index = 9, shichen.str = "17:00-19:00") : hour >= 19 && 21 > hour ? (shichen.index = 10, shichen.str = "19:00-21:00") : hour >= 21 && 23 > hour && (shichen.index = 11, shichen.str = "21:00-23:00");
      break;
    case 1:
    case 2:
      hour >= 23 || 1 > hour ? (shichen.index = 0, shichen.str = "子时") : hour >= 1 && 3 > hour ? (shichen.index = 1, shichen.str = "丑时") : hour >= 3 && 5 > hour ? (shichen.index = 2, shichen.str = "寅时") : hour >= 5 && 7 > hour ? (shichen.index = 3, shichen.str = "卯时") : hour >= 7 && 9 > hour ? (shichen.index = 4, shichen.str = "辰时") : hour >= 9 && 11 > hour ? (shichen.index = 5, shichen.str = "巳时") : hour >= 11 && 13 > hour ? (shichen.index = 6, shichen.str = "午时") : hour >= 13 && 15 > hour ? (shichen.index = 7, shichen.str = "未时") : hour >= 15 && 17 > hour ? (shichen.index = 8, shichen.str = "申时") : hour >= 17 && 19 > hour ? (shichen.index = 9, shichen.str = "酉时") : hour >= 19 && 21 > hour ? (shichen.index = 10, shichen.str = "戌时") : hour >= 21 && 23 > hour && (shichen.index = 11, shichen.str = "亥时");
      break;
    case 3:
      hour >= 23 || 1 > hour ? (shichen.index = 0, shichen.str = "23pm to 1am") : hour >= 1 && 3 > hour ? (shichen.index = 1, shichen.str = "1am to 3am") : hour >= 3 && 5 > hour ? (shichen.index = 2, shichen.str = "3am to 5am") : hour >= 5 && 7 > hour ? (shichen.index = 3, shichen.str = "5pm to 7am") : hour >= 7 && 9 > hour ? (shichen.index = 4, shichen.str = "7pm to 9am") : hour >= 9 && 11 > hour ? (shichen.index = 5, shichen.str = "9pm to 11am") : hour >= 11 && 13 > hour ? (shichen.index = 6, shichen.str = "11am to 13pm") : hour >= 13 && 15 > hour ? (shichen.index = 7, shichen.str = "13pm to 15pm") : hour >= 15 && 17 > hour ? (shichen.index = 8, shichen.str = "15pm to 17pm") : hour >= 17 && 19 > hour ? (shichen.index = 9, shichen.str = "17pm to 19pm") : hour >= 19 && 21 > hour ? (shichen.index = 10, shichen.str = "19pm to 21pm") : hour >= 21 && 23 > hour && (shichen.index = 11, shichen.str = "21pm to 23pm")
  }
  return shichen
}

function getShiChens(type, shichen) {
  var shichens = new Array,
    i = 0,
    shichen0 = ["23:00-1:00", "1:00-3:00", "3:00-5:00", "5:00-7:00", "7:00-9:00", "9:00-11:00", "11:00-13:00", "13:00-15:00", "15:00-17:00", "17:00-19:00", "19:00-21:00", "21:00-23:00"],
    shichen1 = ["子时", "丑时", "寅时", "卯时", "辰时", "巳时", "午时", "未时", "申时", "酉时", "戌时", "亥时"],
    shichen3 = ["23pm to 1am", "1am to 3am", "3am to 5am", "5pm to 7am", "7pm to 9am", "9pm to 11am", "11am to 13pm", "13pm to 15pm", "15pm to 17pm", "17pm to 19pm", "19pm to 21pm", "21pm to 23pm"];
  switch (type) {
    case 0:
      for (i = shichen.index; 12 > i; i++) shichens.push(shichen0[i]);
      for (i = 0; i < shichen.index; i++) shichens.push(shichen0[i]);
      break;
    case 1:
    case 2:
      for (i = shichen.index; 12 > i; i++) shichens.push(shichen1[i]);
      for (i = 0; i < shichen.index; i++) shichens.push(shichen1[i]);
      break;
    case 3:
      for (i = shichen.index; 12 > i; i++) shichens.push(shichen3[i]);
      for (i = 0; i < shichen.index; i++) shichens.push(shichen3[i])
  }
  return shichens
}

function getMonthEng(month) {
  var monthsEng = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return monthsEng[month - 1]
}

function getWeeks(type, week) {
  weeks = [], weeksEng = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  var i = 0;
  switch (type) {
    case 0:
    case 1:
    case 2:
      for (i = week; 7 > i; i++) weeks[i] = "星期" + numToSimp(i), 0 == i && (weeks[i] = "星期日");
      for (i = 0; week > i; i++) weeks[i] = "星期" + numToSimp(i);
      break;
    case 3:
      for (i = week; 7 > i; i++) weeks.push(weeksEng[i]);
      for (i = 0; week > i; i++) weeks.push(weeksEng[i])
  }
  return weeks
}

function getWeek(type, week) {
  switch (weekEng = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"], res = "", type) {
    case 0:
    case 1:
    case 2:
      0 == week ? res = "日" : res = numToSimp(week);
      break;
    case 3:
      res = weekEng[week]
  }
  return res
}

function getHours(type, hour) {
  var hours = new Array,
    i = 0;
  switch (type) {
    case 0:
    case 3:
      for (i = hour; 24 > i; i++) hours.push(i);
      for (i = 0; hour > i; i++) hours.push(i);
      break;
    case 1:
      for (i = hour; 24 > i; i++) hours.push(numToSimp(i));
      for (i = 0; hour > i; i++) hours.push(numToSimp(i));
      break;
    case 2:
      for (i = hour; 24 > i; i++) hours.push(numToTrad(i));
      for (i = 0; hour > i; i++) hours.push(numToTrad(i))
  }
  return hours
}

function getMinutes(type, minute) {
  var minutes = new Array,
    i = 0;
  switch (type) {
    case 0:
    case 3:
      for (i = minute; 60 > i; i++) minutes.push(i);
      for (i = 0; minute > i; i++) minutes.push(i);
      break;
    case 1:
      for (i = minute; 60 > i; i++) minutes.push(numToSimp(i));
      for (i = 0; minute > i; i++) minutes.push(numToSimp(i));
      break;
    case 2:
      for (i = minute; 60 > i; i++) minutes.push(numToTrad(i));
      for (i = 0; minute > i; i++) minutes.push(numToTrad(i))
  }
  return minutes
}

function getSeconds(type, second) {
  var seconds = new Array,
    i = 0;
  switch (type) {
    case 0:
    case 3:
      for (i = second; 60 > i; i++) seconds.push(i);
      for (i = 0; second > i; i++) seconds.push(i);
      break;
    case 1:
      for (i = second; 60 > i; i++) seconds.push(numToSimp(i));
      for (i = 0; second > i; i++) seconds.push(numToSimp(i));
      break;
    case 2:
      for (i = second; 60 > i; i++) seconds.push(numToTrad(i));
      for (i = 0; second > i; i++) seconds.push(numToTrad(i))
  }
  return seconds
}

function isShichen(hour) {
  return "one h" == hour || "three h" == hour || "five h" == hour || "seven h" == hour || "nine h" == hour || "eleven h" == hour || "thirteen h" == hour || "fifteen h" == hour || "seventeen h" == hour || "nineteen h" == hour || "twentyone h" == hour || "twentythree h" == hour || "1时" == hour || "3时" == hour || "5时" == hour || "7时" == hour || "9时" == hour || "11时" == hour || "13时" == hour || "15时" == hour || "17时" == hour || "19时" == hour || "21时" == hour || "23时" == hour || "一时" == hour || "三时" == hour || "五时" == hour || "七时" == hour || "九时" == hour || "十一时" == hour || "十三时" == hour || "十五时" == hour || "十七时" == hour || "十九时" == hour || "二十一时" == hour || "二十三时" == hour || "壹时" == hour || "叁时" == hour || "伍时" == hour || "柒时" == hour || "玖时" == hour || "拾壹时" == hour || "拾叁时" == hour || "拾伍时" == hour || "拾柒时" == hour || "拾玖时" == hour || "贰拾壹时" == hour || "贰拾叁时" == hour || "1 h" == hour || "3 h" == hour || "5 h" == hour || "7 h" == hour || "9 h" == hour || "11 h" == hour || "13 h" == hour || "15 h" == hour || "17 h" == hour || "19 h" == hour || "21 h" == hour || "23 h" == hour ? !0 : !1
}

function updateDays(type, year, month, day) {
  var days = new Array,
    j = 1,
    isLeap = isLeapYear(year);
  switch (type) {
    case 0:
    case 3:
      for (j = day; 31 >= j && (days.push(j), 2 != month || !isLeap || 29 != j) && (2 != month || isLeap || 28 != j) && (2 != month && 4 != month && 6 != month && 9 != month && 11 != month || 30 != j); j++);
      for (j = 1; day > j; j++) days.push(j);
      break;
    case 1:
      for (j = 1; 31 >= j && (days.push(numToSimp(j)), 2 != month || !isLeap || 29 != j) && (2 != month || isLeap || 28 != j) && (2 != month && 4 != month && 6 != month && 9 != month && 11 != month || 30 != j); j++);
      for (j = 1; day > j; j++) days.push(numToSimp(j));
      break;
    case 2:
      for (j = 1; 31 >= j && (days.push(numToTrad(j)), 2 != month || !isLeap || 29 != j) && (2 != month || isLeap || 28 != j) && (2 != month && 4 != month && 6 != month && 9 != month && 11 != month || 30 != j); j++);
      for (j = 1; day > j; j++) days.push(numToTrad(j))
  }
  return days
}

function getFirstDay(type) {
  switch (day = 1, type) {
    case 1:
      day = numToSimp(day);
      break;
    case 2:
      day = numToTrad(day)
  }
  return day
}
