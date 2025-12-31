
# 方法一：使用`Object.prototype.toString.call()`

> 推荐使用‌ `Object.prototype.toString.call()`，因其兼容性好且准确。
``` JavaScript
function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}
```
``` JavaScript
console.log(isPlainObject({})); // true
console.log(isPlainObject([])); // false
console.log(isPlainObject(null)); // false
console.log(isPlainObject(new Date())); // false
```
**‌特点‌：**
- ● 能准确区分普通对象（`{}`）和数组（`[]`）
- ● 不受原型链污染影响
- ● 适用于所有内置对象类型（如 `[object Date]`）


---


# 方法二：结合 `typeof` 和 `constructor`
``` JavaScript
function isObject(value) {
  return typeof value === 'object'
         && value !== null
         && value.constructor === Object;
}
```
**‌特点‌：**
- ● 排除 `null` 和数组
- ● 适用于大多数场景


---


# 方法三：使用 `Symbol.toStringTag`（需对象支持）
``` JavaScript
function isObject(value) {
  return typeof value === 'object'
         && value !== null
         && value[Symbol.toStringTag] === 'Object';
}
```
**‌特点‌：**
- ● 现代浏览器支持，但需对象显式定义 `Symbol.toStringTag`


---


> ## WARN 注意事项
> - ● `typeof null` 返回 `'object'`，需额外判断
> - ● `instanceof Object` 无法区分数组和对象
> - ● 避免使用 `__proto__`，因未纳入标准
