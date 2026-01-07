# `??` 空值合并操作符
在 JavaScript 中，`??` 是 空值合并操作符（Nullish Coalescing Operator），用于处理 `null` 或 `undefined` 的情况。

## 语法
``` JavaScript
leftExpr ?? rightExpr
```

## 行为
- ● 如果 `leftExpr` 是 `null` 或 `undefined`，则返回 `rightExpr`；
- ● 否则，返回 `leftExpr`。

> **注意：**与逻辑或操作符 `||` 不同，`??` 不会将 `0`、`false`、`''`（空字符串）等“假值”视为需要替换的值，只对 `null` 和 `undefined` 起作用。

## 示例对比：`??` vs `||`
``` JavaScript
const num = 0;
const str = '';
const bol = false;

console.log(num || 'default'); // 'default' （因为 0 是假值）
console.log(num ?? 'default'); // 0 （因为 0 不是 null/undefined）

console.log(str || 'default'); // 'default'
console.log(str ?? 'default'); // '' （空字符串保留）

console.log(bol || 'default'); // 'default'
console.log(bol ?? 'default'); // false （因为 false 不是null/undefined）
```

## 常见应用场景

### 1. 设置默认值（避免覆盖有效假值）
``` JavaScript
function greet(name) {
  name = name ?? 'world';
  console.log(`Hello, ${name}!`);
}

greet(null);     // Hello, world!
greet('');       // Hello, ! （保留空字符串）
greet(0);        // Hello, 0!
```

### 2. 读取对象属性时提供默认值
``` JavaScript
const config = { timeout: 0 };
const timeout = config.timeout ?? 5000; // timeout = 0，不是 5000
```

### 3. 与可选链（Optional Chaining）结合使用
``` JavaScript
const user = {
  profile: {
    name: null
  }
};

const displayName = user.profile?.name ?? 'Guest';
console.log(displayName); // 'Guest'
```
