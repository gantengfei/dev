在 JavaScript 中判断是否为数字，看似简单实则有很多“坑”（比如 `NaN` 的类型也是 `number`，字符串 "123" 算不算数字等）。

# 方案一：最严谨的标准判断

适用场景：判断一个变量是否真的是一个有效的、有限的数字（排除 `NaN`、`Infinity`、`字符串`）。

``` JavaScript
function isRealNumber(val) {
  return Number.isFinite(val);
}

// 测试结果
console.log(isRealNumber(123));      // true
console.log(isRealNumber(3.14));     // true
console.log(isRealNumber(NaN));      // false (排除了 NaN)
console.log(isRealNumber(Infinity)); // false (排除了无穷大)
console.log(isRealNumber("123"));    // false (严格模式，不包含字符串)
console.log(isRealNumber(null));     // false
```

# 方案二：允许“数字字符串”的判断

适用场景：表单输入、URL 参数等，用户输入的是 `"123"`，但你需要把它当作数字处理。

这里不能只用 `isNaN()`，因为 `isNaN("123")` 会返回 `false`（意味着它认为是数字），但 `isNaN("abc")` 也会先尝试转换。最稳妥的是结合 `Number()` 转换和 `isFinite` 判断。

```javascript
function isNumeric(val) {
  // 1. 排除空字符串和纯空格
  if (typeof val === 'string' && val.trim() === '') return false;

  // 2. 尝试转换为数字，并判断是否有限
  return Number.isFinite(Number(val));
}

// 测试结果
console.log(isNumeric(123));       // true
console.log(isNumeric("123"));     // true (支持字符串)
console.log(isNumeric("12.5"));    // true
console.log(isNumeric("123abc"));  // false (严格，不能包含字母)
console.log(isNumeric(""));        // false
```

## 方案二应用：保留小数
``` Typescript
/**
 * 保留小数
 * @param num 数值
 * @param n 保留位数
 * @returns
 */
export function NumtoFixed(num: any, n: number) {
  if (typeof num === 'string' && num.trim() === '') return '';
  if (Number.isFinite(Number(num))) {
    return Math.round(Number(num) * Math.pow(10, n)) / Math.pow(10, n);
  }
  return '';
}
```

# 方案三：正则表达式

适用场景：你需要严格限制格式，比如必须是“整数”、“不能有前导零”、“必须是小数”等。

``` JavaScript
function isNumberRegex(val) {
  // 匹配：整数、小数、负数、正数（不支持科学计数法，如需支持需修改正则）
  const reg = /^-?\d+(\.\d+)?$/;
  return reg.test(val);
}

// 测试结果
console.log(isNumberRegex("123"));   // true
console.log(isNumberRegex("-1.5"));  // true
console.log(isNumberRegex(".5"));    // false (此正则要求小数点前必须有数字)
console.log(isNumberRegex("123a"));  // false
```

# ⚠️ 避坑指南：为什么不建议直接用 `typeof` 或 `isNaN`？

| 方法 | 代码示例 | 结果 | 为什么有坑？ |
| :--- | :--- | :--- | :--- |
| typeof | `typeof NaN` | `"number"` | 大坑！ `NaN` 虽然是“非数字”，但它的类型却是 `number`。 |
| 全局 isNaN | `isNaN("hello")` | `true` | 它会先尝试把 `"hello"` 转成数字，转换失败才返回 true，逻辑比较绕。 |
| 全局 isFinite | `isFinite("10")` | `true` | 它会隐式转换类型，不够严谨。 |

# 🚀 总结建议

- 1.一般开发：直接用 `Number.isFinite(val)`，这是最标准、最不容易出错的方法。
- 2.处理用户输入：使用 `Number.isFinite(Number(val))`，先转换再判断。
- 3.特殊格式校验（如密码必须是数字）：使用 正则表达式。
