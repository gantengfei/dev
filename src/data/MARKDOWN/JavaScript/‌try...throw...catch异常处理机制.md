在 JavaScript 中，try...catch 语句用于处理运行时错误，而 throw 语句用于主动抛出异常。

# 基本语法结构
``` JavaScript
try {
  // 可能出错的代码
  if (someCondition) {
    throw new Error("自定义错误信息");
  }
} catch (error) {
  // 处理错误
  console.log("捕获到错误:", error.message);
} finally {
  // 无论是否出错都会执行
  console.log("清理工作");
}
```

## 各组成部分详解

### 1. `try` 块‌
- &emsp;● 包含可能引发异常的代码
- &emsp;● 一旦出现错误，立即跳转到 catch 块
### 2. `throw` 语句
- &emsp;● 主动抛出异常对象
- &emsp;● 可以抛出任何类型的值：Error 对象、字符串、数字等
- &emsp;● 推荐使用 Error 对象，因为它包含堆栈跟踪信息
### ‌3. `catch` 块
- &emsp;● 捕获 try 块中抛出的异常
- &emsp;● 接收错误对象作为参数
- &emsp;● 处理错误或进行错误恢复
### ‌4. `finally` 块
- &emsp;● 无论是否发生异常都会执行
- &emsp;● 常用于资源清理工作

# 实际应用示例
``` JavaScript
function divide(a, b) {
  if (b === 0) {
    throw new Error("除数不能为零");
  }
  return a / b;
}

try {
  const result = divide(10, 0);
  console.log("结果:", result);
} catch (error) {
  console.error("计算错误:", error.message);
} finally {
  console.log("计算完成");
}
```
这种异常处理机制让您能够优雅地处理程序中的错误情况，提高代码的健壮性和可维护性。
