# Math 对象
Math 对象用于执行数学任务。 \
Math 对象并不像 Date 和 String 那样是对象的类，因此没有构造函数 Math()。
## 语法
``` javascript
var x = Math.PI; // 返回 PI
var y = Math.sqrt(16); // 返回 16 的平方根
```
## Math 对象属性
| 属性    | 描述                                                    |
| :------ | :------------------------------------------------------ |
| E       | 返回算术常量 e，即自然对数的底数（约等于2.718）。       |
| LN2     | 返回 2 的自然对数（约等于0.693）。                      |
| LN10    | 返回 10 的自然对数（约等于2.302）。                     |
| LOG2E   | 返回以 2 为底的 e 的对数（约等于 1.4426950408889634）。 |
| LOG10E  | 返回以 10 为底的 e 的对数（约等于0.434）。              |
| PI      | 返回圆周率（约等于3.14159）。                           |
| SQRT1_2 | 返回 2 的平方根的倒数（约等于 0.707）。                 |
| SQRT2   | 返回 2 的平方根（约等于 1.414）。                       |

## Math 对象方法
| 方法             | 描述                                                          |
| :--------------- | :------------------------------------------------------------ |
| abs(x)           | 返回 x 的绝对值。                                             |
| acos(x)          | 返回 x 的反余弦值。                                           |
| asin(x)          | 返回 x 的反正弦值。                                           |
| atan(x)          | 以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。      |
| atan2(y,x)       | 返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。 |
| ceil(x)          | 对数进行上舍入。                                              |
| cos(x)           | 返回数的余弦。                                                |
| exp(x)           | 返回 Ex 的指数。                                              |
| floor(x)         | 对 x 进行下舍入。                                             |
| log(x)           | 返回数的自然对数（底为e）。                                   |
| max(x,y,z,...,n) | 返回 x,y,z,...,n 中的最高值。                                 |
| min(x,y,z,...,n) | 返回 x,y,z,...,n中的最低值。                                  |
| pow(x,y)         | 返回 x 的 y 次幂。                                            |
| random()         | 返回 0 ~ 1 之间的随机数。                                     |
| round(x)         | 四舍五入。                                                    |
| sin(x)           | 返回数的正弦。                                                |
| sqrt(x)          | 返回数的平方根。                                              |
| tan(x)           | 返回角的正切。                                                |
| tanh(x)          | 返回一个数的双曲正切函数值。                                  |
| trunc(x)         | 将数字的小数部分去掉，只保留整数部分。                        |

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
