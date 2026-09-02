# layui.laydate 日期和时间组件

## ➤ 1. 年选择器(yyyy)
 **HTML**
``` html
<div class="timebox starttime">
    <input type="text" class="calendar_input" id="timeDateYear" placeholder="yyyy">
    <i class="calendar_icon" id="timeDateYearIcon"></i>
</div>
```
 **JavaScript**
``` javascript
layui.use('laydate', () => {
    let laydate = layui.laydate;
     laydate.render({
        elem: '#timeDateYear',
        eventElem: '#timeDateYearIcon',
        value: value,
        btns: ['now', 'confirm'],
        trigger: 'click',
        type: 'year',
        done: (value, date, endDate) => {
            setTimeout(() => {

            }, 200);
        }
    })
}
```

## ➤ 2. 年月选择器(yyyy-MM)
 **HTML**
``` html
<div class="timebox starttime">
    <input type="text" class="calendar_input" id="timeDateMonth" placeholder="yyyy-MM">
    <i class="calendar_icon" id="timeDateMonthIcon"></i>
</div>
```
 **JavaScript**
``` javascript
layui.use('laydate', () => {
    let laydate = layui.laydate;
     laydate.render({
        elem: '#timeDateMonth',
        eventElem: '#timeDateMonthIcon',
        value: value,
        btns: ['now', 'confirm'],
        trigger: 'click',
        type: 'month',
        done: (value, date, endDate) => {
            setTimeout(() => {

            }, 200);
        }
    })
}
```

## ➤ 3. 时间选择器(yyyy-MM-dd)
 **HTML**
``` html
<div class="timebox starttime">
    <input type="text" class="calendar_input" id="timeDateDay" placeholder="yyyy-MM-dd">
    <i class="calendar_icon" id="timeDateDayIcon"></i>
</div>
```
**JavaScript**
``` javascript
layui.use('laydate', () => {
    let laydate = layui.laydate;
     laydate.render({
        elem: '#timeDateDay',
        eventElem: '#timeDateDayIcon',
        value: value,
        btns: ['now', 'confirm'],
        trigger: 'click',
        done: (value, date, endDate) => {
            setTimeout(() => {

            }, 200);
        }
    })
}
```

## ➤ 4. 日期时间选择器(yyyy-MM-dd HH:mm:ss)
 **HTML**
``` html
<div class="timebox starttime">
    <input type="text" class="calendar_input" id="timeDateDatetime" placeholder="yyyy-MM-dd HH:mm:ss">
    <i class="calendar_icon" id="timeDateDatetimeIcon"></i>
</div>
```
**JavaScript**
``` javascript
layui.use('laydate', () => {
    let laydate = layui.laydate;
     laydate.render({
        elem: '#timeDateDatetime',
        eventElem: '#timeDateDatetimeIcon',
        value: value,
        btns: ['now', 'confirm'],
        trigger: 'click',
        type: 'datetime',
        done: (value, date, endDate) => {
            setTimeout(() => {

            }, 200);
        }
    })
}
```

## ➤ 5. 日期时间选择器 - 小时(yyyy-MM-dd HH)
 **HTML**
``` html
<div class="timebox starttime">
    <input type="text" class="calendar_input" id="timeDateHour" placeholder="yyyy-MM-dd HH">
    <i class="calendar_icon" id="timeDateHourIcon"></i>
</div>
```
**JavaScript**
``` javascript
layui.use('laydate', () => {
    let laydate = layui.laydate;
     laydate.render({
        elem: '#timeDateHour',
        eventElem: '#timeDateHourIcon',
        value: value,
        btns: ['now', 'confirm'],
        trigger: 'click',
        theme: "timeonlyhour",
        type: 'datetime',
        format: 'yyyy-MM-dd HH',
        done: (value, date, endDate) => {
            setTimeout(() => {

            }, 200);
        }
    })
}
```
 **css**
``` scss
.layui-laydate {
  &.laydate-theme-timeonlyhour {
    .laydate-time-list>li {
      width: 100%;
      &:nth-child(2) {
        display: none;
      }
      &:nth-child(3) {
        display: none;
      }
    }
    .laydate-time-list {
      ol {
        li {
          width: 100%;
          padding-left: 116px;
        }
      }
    }
  }
}
```

## ➤ 6. 日期时间选择器 - 分钟(yyyy-MM-dd HH:mm)
 **HTML**
``` html
<div class="timebox starttime">
    <input type="text" class="calendar_input" id="timeDateMinute" placeholder="yyyy-MM-dd HH:mm">
    <i class="calendar_icon" id="timeDateMinuteIcon"></i>
</div>
```
**JavaScript**
``` javascript
layui.use('laydate', () => {
    let laydate = layui.laydate;
     laydate.render({
        elem: '#timeDateMinute',
        eventElem: '#timeDateMinuteIcon',
        value: value,
        btns: ['now', 'confirm'],
        trigger: 'click',
        theme: "timetominute",
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm',
        done: (value, date, endDate) => {
            setTimeout(() => {

            }, 200);
        }
    })
}
```
 **css**
``` scss
.layui-laydate {
  &.laydate-theme-timetominute {
    .layui-laydate-content {
      .layui-laydate-list {
        &.laydate-time-list {
          &>li {
            width: 50%;
            ol {
              &>li {
                padding-left: 53px;
              }
            }
            &:nth-child(3) {
              display: none;
            }
          }
        }
      }
    }
  }
}
```

## ➤ 7. 日期时间选择器 - 分钟：逐六分钟(yyyy-MM-dd HH:mm)
 **HTML**
``` html
<div class="timebox starttime">
    <input type="text" class="calendar_input" id="timeDateSixMinute" placeholder="yyyy-MM-dd HH:mm">
    <i class="calendar_icon" id="timeDateSixMinuteIcon"></i>
</div>
```
**JavaScript**
``` javascript
layui.use('laydate', () => {
    let laydate = layui.laydate;
     laydate.render({
        elem: '#timeDateSixMinute',
        eventElem: '#timeDateSixMinuteIcon',
        value: value,
        btns: ['now', 'confirm'],
        trigger: 'click',
        theme: "sixmin",
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm',
        done: (value, date, endDate) => {
            setTimeout(() => {

            }, 200);
        }
    })
}
```
 **css**
``` scss
.layui-laydate {
  &.laydate-theme-sixmin {
    .layui-laydate-list {
      padding-bottom: 0px;
      overflow: hidden;
    }
    .layui-this {
      background-color: #3BACFF !important;
    }
    .layui-laydate-content {
      .layui-laydate-list {
        &.laydate-time-list {
          &>li {
            width: 50%;
            ol {
              &>li {
                padding-left: 53px;
              }
            }
            &:nth-child(2) {
              ol {
                &>li {
                  &:nth-child(-n + 6):nth-child(n + 2) {
                    display: none;
                  }
                  &:nth-child(-n + 12):nth-child(n + 8) {
                    display: none;
                  }
                  &:nth-child(-n + 18):nth-child(n + 14) {
                    display: none;
                  }
                  &:nth-child(-n + 24):nth-child(n + 20) {
                    display: none;
                  }
                  &:nth-child(-n + 30):nth-child(n + 26) {
                    display: none;
                  }
                  &:nth-child(-n + 36):nth-child(n + 32) {
                    display: none;
                  }
                  &:nth-child(-n + 42):nth-child(n + 38) {
                    display: none;
                  }
                  &:nth-child(-n + 48):nth-child(n + 44) {
                    display: none;
                  }
                  &:nth-child(-n + 54):nth-child(n + 50) {
                    display: none;
                  }
                  &:nth-child(-n + 60):nth-child(n + 56) {
                    display: none;
                  }
                }
              }
            }
            &:nth-child(3) {
              display: none;
            }
          }
        }
      }
    }
  }
}
```

## ➤ 8. 日期时间选择器 - 分钟：整十分钟(yyyy-MM-dd HH:mm)
 **HTML**
``` html
<div class="timebox starttime">
    <input type="text" class="calendar_input" id="timeDateTenMinute" placeholder="yyyy-MM-dd HH:mm">
    <i class="calendar_icon" id="timeDateTenMinuteIcon"></i>
</div>
```
**JavaScript**
``` javascript
layui.use('laydate', () => {
    let laydate = layui.laydate;
     laydate.render({
        elem: '#timeDateTenMinute',
        eventElem: '#timeDateTenMinuteIcon',
        value: value,
        btns: ['now', 'confirm'],
        trigger: 'click',
        theme: "tenmin",
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm',
        done: (value, date, endDate) => {
            setTimeout(() => {

            }, 200);
        }
    })
}
```
 **css**
``` scss
// 时间日历
.laydate-theme-tenmin {
  .layui-laydate-list {
    padding-bottom: 0px;
    overflow: hidden;
  }

  .layui-this {
    background-color: #3BACFF !important;
  }

  .layui-laydate-content {
    .layui-laydate-list {
      &.laydate-time-list {
        &>li {
          width: 50%;

          ol {
            &>li {
              padding-left: 53px;
            }
          }

          &:nth-child(2) {
            ol {
              &>li {

                &:nth-child(-n + 10):nth-child(n + 2) {
                  display: none;
                }

                &:nth-child(-n + 20):nth-child(n + 12) {
                  display: none;
                }

                &:nth-child(-n + 30):nth-child(n + 22) {
                  display: none;
                }

                &:nth-child(-n + 40):nth-child(n + 32) {
                  display: none;
                }

                &:nth-child(-n + 50):nth-child(n + 42) {
                  display: none;
                }

                &:nth-child(-n + 60):nth-child(n + 52) {
                  display: none;
                }

              }
            }
          }
        }
      }
    }
  }
}
```

## ➤ 9. 日期时间选择器 - 分钟：整五分钟(yyyy-MM-dd HH:mm)
 **HTML**
``` html
<div class="timebox starttime">
    <input type="text" class="calendar_input" id="timeDateTenMinute" placeholder="yyyy-MM-dd HH:mm">
    <i class="calendar_icon" id="timeDateTenMinuteIcon"></i>
</div>
```
**JavaScript**
``` javascript
layui.use('laydate', () => {
    let laydate = layui.laydate;
     laydate.render({
        elem: '#timeDateTenMinute',
        eventElem: '#timeDateTenMinuteIcon',
        value: value,
        btns: ['now', 'confirm'],
        trigger: 'click',
        theme: "fivemin",
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm',
        done: (value, date, endDate) => {
            setTimeout(() => {

            }, 200);
        }
    })
}
```
 **css**
``` scss
// 时间日历-逐五分钟
.layui-laydate {
  &.laydate-theme-fivemin {
    .layui-laydate-list {
      padding-bottom: 0px;
      overflow: hidden;
    }

    .layui-this {
      background-color: #3BACFF !important;
    }

    .layui-laydate-content {
      .layui-laydate-list {
        &.laydate-time-list {
          &>li {
            width: 50%;

            ol {
              &>li {
                padding-left: 53px;
              }
            }

            &:nth-child(2) {
              ol {
                &>li {

                  &:nth-child(-n + 5):nth-child(n + 2) {
                    display: none;
                  }

                  &:nth-child(-n + 10):nth-child(n + 7) {
                    display: none;
                  }

                  &:nth-child(-n + 15):nth-child(n + 12) {
                    display: none;
                  }

                  &:nth-child(-n + 20):nth-child(n + 17) {
                    display: none;
                  }

                  &:nth-child(-n + 25):nth-child(n + 22) {
                    display: none;
                  }

                  &:nth-child(-n + 30):nth-child(n + 27) {
                    display: none;
                  }

                  &:nth-child(-n + 35):nth-child(n + 32) {
                    display: none;
                  }

                  &:nth-child(-n + 40):nth-child(n + 37) {
                    display: none;
                  }

                  &:nth-child(-n + 45):nth-child(n + 42) {
                    display: none;
                  }

                  &:nth-child(-n + 50):nth-child(n + 47) {
                    display: none;
                  }

                  &:nth-child(-n + 55):nth-child(n + 52) {
                    display: none;
                  }

                  &:nth-child(-n + 60):nth-child(n + 57) {
                    display: none;
                  }

                }
              }
            }
          }
        }
      }
    }
  }
}
```
