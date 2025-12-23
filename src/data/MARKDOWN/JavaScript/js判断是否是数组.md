
# 方法一：使用`Array.isArray()`方法

可以使用`Array.isArray()`方法判断一个变量是否为数组。这个方法会返回一个布尔值，表示该变量是否为数组。
``` JavaScript
let arr = [1, 2, 3];

console.log(Array.isArray(arr)); // true
console.log(Array.isArray("hello")); // false
console.log(Array.isArray({ a: 1, b: 2 })); // false
```


---


# 方法二：使用`instanceof`运算符

可以使用`instanceof`运算符来检查一个变量是否为数组。这个运算符会比较一个对象与Array构造函数的原型链上的对象是否一致。
``` JavaScript
let arr = [1, 2, 3];

console.log(arr instanceof Array); // true
console.log("hello" instanceof Array); // false
console.log({ a: 1, b: 2 } instanceof Array); // false
```


---


# 方法三：使用`Object.prototype.toString()`方法

可以使用`Object.prototype.toString()`方法来检查一个变量是否为数组。这个方法会返回一个以"[object 类型]"形式表示的字符串，其中类型可以是"Array"、"Object"等。
``` JavaScript
let arr = [1, 2, 3];

console.log(Object.prototype.toString.call(arr) === "[object Array]"); // true
console.log(Object.prototype.toString.call("hello") === "[object Array]"); // false
console.log(Object.prototype.toString.call({ a: 1, b: 2 }) === "[object Array]"); // false
```
