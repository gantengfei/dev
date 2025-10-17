
# 1. JSON.parse(JSON.stringify())
最简单的方法，但无法处理函数、`undefined`、`RegExp` 等特殊类型，且会丢失原型链信息。
``` JavaScript
const obj = { a: 1, b: { c: 2 } };
const cloned = JSON.parse(JSON.stringify(obj));
```

# 2.  递归手动实现
通过递归遍历对象属性，支持复杂数据类型和循环引用。
``` JavaScript
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (hash.has(obj)) return hash.get(obj);
  const clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash);
    }
  }
  return clone;
}
```

# 3. structuredClone API
原生支持的深拷贝方法，可处理 `Date`、`Map`、`Set` 等内置对象，但不支持函数和 DOM 节点。
``` JavaScript
const obj = { date: new Date() };
const cloned = structuredClone(obj);
```

**项目中在网格数据拷贝中使用**
``` TypeScript
Filedata2GridObject(this.dataFile, colorMap).then((res: any) => {
  let resData = structuredClone(res) // 直接复制任何可克隆的对象
  this.drawStore.GridSource = resData;  // 存储数据源到drawStore

  this.loadLayer(res);
}).catch(error => {
  console.error("error:返回 => ", error);
  this.removeLayer();
})
```

# 4. 第三方库（如 Lodash）
使用 `_.cloneDeep` 方法，兼容性强且支持复杂场景
``` JavaScript
import _ from 'lodash';
const cloned = _.cloneDeep(obj);
```

# 5. MessageChannel‌
利用浏览器 API 实现异步深拷贝，可处理循环引用，但性能较差且仅限浏览器环境。
``` JavaScript
function deepClone(obj) {
  return new Promise(resolve => {
    const { port1, port2 } = new MessageChannel();
    port2.onmessage = ev => resolve(ev.data);
    port1.postMessage(obj);
  });
}
```

# * 注意事项

- **‌循环引用‌：**递归方法需配合 `WeakMap` 缓存解决。
- **‌特殊类型‌：**`JSON` 方法会忽略函数和 `undefined`，而 `structuredClone` 不支持函数。
- **‌性能‌：**大数据量时 `JSON` 方法较快，但功能受限；递归方法更灵活但需注意栈溢出。

根据需求选择合适方法，简单场景用 `JSON` 或 `structuredClone`，复杂场景推荐递归或 `Lodash` 。
