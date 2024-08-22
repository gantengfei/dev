# 一、Math.trunc()
## 1、定义
Math.trunc()方法去除数字的小数部分，保留整数部分。

## 2、语法
``` javascript
Math.trunc(value)
```

## 3、示例
``` javascript
console.log(Math.trunc(2.01));         // 2
console.log(Math.trunc(2.9));          // 2
console.log(Math.trunc('0.22'));       // 0
console.log(Math.trunc(-1.22));        // -1
console.log(Math.trunc(-1.56));        // -1
console.log(Math.trunc(true));         // 1
console.log(Math.trunc(undefined));    // NaN
```

# 二、Math.round()
##  1.定义
Math.round()方法返回一个数字四舍五入后的整数部分。

## 2、语法
``` javascript
Math.round(value)
```

## 3、示例
``` javascript
console.log(Math.round((2.01));       // 2
console.log(Math.round(2.9));          // 3
console.log(Math.round('0.22'));       // 0
console.log(Math.round(-1.22));        // -1
console.log(Math.round(-1.56));        // -2
console.log(Math.round(true));         // 1
console.log(Math.round(undefined));    // NaN
```

# 三、Math.ceil()
## 1、定义
Math.ceil()方法返回一个大于或等于数字的最小整数，即向上取整。

## 2、语法
``` javascript
Math.ceil(value)
```

3、示例
``` javascript
console.log(Math.ceil(2.01));         // 3
console.log(Math.ceil(2.9));          // 3
console.log(Math.ceil('0.22'));       // 1
console.log(Math.ceil( -1.22));       // -1
console.log(Math.ceil(-1.56));        // -1
console.log(Math.ceil(true));         // 1
console.log(Math.ceil(undefined));    // NaN
```

# 四、Math.floor()
## 1、定义
Math.floor()方法返回一个小于或等于数字的最小整数，即向下取整。

## 2、语法
``` javascript
Math.floor(value)
```

## 3、示例
``` javascript
console.log(Math.floor(2.01));         // 2
console.log(Math.floor(2.9));          // 2
console.log(Math.floor('0.22'));       // 0
console.log(Math.floor(-1.22));        // -2
console.log(Math.floor(-1.56));        // -2
console.log(Math.floor(true));         // 1
console.log(Math.floor(undefined));    // NaN
```
