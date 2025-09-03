
**方法一**：使用正则表达式判断时间格式是否正确
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


---

**方法二**：使用Date对象判断时间是否合法
``` JavaScript
function isTime(time) {
  // 尝试将输入转换为Date对象
  const date = new Date(time);

  // 检查时间是否合法
  return date instanceof Date && !isNaN(date.getTime());
}
```
