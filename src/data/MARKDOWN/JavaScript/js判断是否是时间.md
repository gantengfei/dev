
# 判断是否是时间
## 方法一：使用正则表达式判断

使用正则表达式判断时间格式是否正确
``` JavaScript
// 时间类型 HH:MM
function isTime(time) {
  // 时间格式正则表达式
  const regExp = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;

  return regExp.test(time);
}
```

判断时间类型，如果不是时间类型返回null
```JavaScript
// 时间类型 00:00:00
time.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);

// 日期时间类型 2025-02-10 11:30:15
time.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);

// 日期类型 2025-02-10
time.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
```


## 方法二：使用Date对象判断

使用Date对象判断时间是否合法
``` JavaScript
function isTime(time) {
  // 尝试将输入转换为Date对象
  const date = new Date(time);

  // 检查时间是否合法
  return date instanceof Date && !isNaN(date.getTime());
}
```


# 判断系统时间

## 北京时(BJT)

PC端判断本机世界时还是北京时，当前时间是北京时，则返回true
``` JavaScript
new Date().toTimeString() // 输出：'17:27:00 GMT+0800 (中国标准时间)'

new Date().toTimeString().includes('GMT+0800') // 输出：true
```

![输入图片说明](./src/img/images/2026-02-10_01-01-27.png "")


## 世界时(UTC)

PC端判断本机世界时还是北京时，当前时间是世界时，则返回true
``` JavaScript
new Date().toTimeString() // 输出：'01:00:10 GMT+0000 (协调世界时)'

new Date().toTimeString().includes('GMT+0000') // 输出：true
```

![输入图片说明](./src/img/images/2026-02-10_01-01-51.png "")

## JS 获取系统时间

``` TypeScript
/** 判断本机世界时还是北京时,统一换回北京时间 */
export function systemtime2BJT() {
  // 北京时间
  if (new Date().toTimeString().includes('GMT+0800')) {
    return new Date()
  }
  else {
    return new Date(new Date().getTime() + 1000 * 60 * 60 * 8)
  }
}

/** 北京时间转换世界时间 */
export function BJTdate2UTCdate(date: any): Date {
  return new Date(new Date(date).getTime() - (1000 * 60 * 60 * 8))
}

/** 获取系统世界时间 */
export function getSystemTimeUTC() {
  // 北京时
  if (new Date().toTimeString().includes('GMT+0800')) {
    return new Date(new Date().getTime() - 1000 * 60 * 60 * 8)
  } else {
    return new Date()
  }
}
```
