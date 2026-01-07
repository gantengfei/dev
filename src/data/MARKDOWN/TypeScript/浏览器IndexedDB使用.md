`IndexedDB` 是浏览器提供的一个低级 **API**，用于在客户端存储大量结构化数据（包括文件/二进制数据）。它是一个事务型数据库系统，类似于 NoSQL 数据库（如 MongoDB），使用键值对方式存储数据，并支持索引、事务和异步操作。

# 一、基本概念
- ● **数据库（Database）**：一个 IndexedDB 数据库可以包含多个对象存储（Object Stores）。
- ● **对象存储（Object Store）**：类似关系型数据库中的“表”，用于存储记录（JavaScript 对象）。
- ● **键（Key）**：每条记录必须有一个唯一标识符（主键），可以是显式指定，也可以由 IndexedDB 自动生成（autoIncrement）。
- ● **索引（Index）**：用于在非主键字段上进行高效查询。
- ● **事务（Transaction）**：所有读写操作都必须在事务中进行。事务具有只读（readonly）或读写（readwrite）模式。
- ● **异步操作**：IndexedDB 的所有操作都是异步的，基于事件（Event）或 Promise（可通过封装实现）。


# 二、封装为 Promise

由于原生 **IndexedDB** 使用回调，代码嵌套深，可封装为 Promise 或使用第三方库（如 idb）。

下面直接使用 `idb` 库（轻量、Promise 化）：

`idb` 是一个轻量级、现代化的 **IndexedDB** 封装库，由 Jake Archibald（Google 工程师）开发，它将原生 IndexedDB 的回调式 API 转换为 **Promise 风格**，极大简化了代码编写，同时保持高性能和灵活性。

## 2.1 安装 idb

``` Bash
npm install idb
```

## 2.2 核心 API 概览

| 功能            | 方法                                         |
| :-------------- | :------------------------------------------- |
| 打开/创建数据库 | `openDB(name, version, { upgrade })`         |
| 添加数据        | `db.add(storeName, value, key?)`             |
| 获取单条        | `db.get(storeName, key)`                     |
| 获取所有        | `db.getAll(storeName, ...)`                  |
| 更新数据        | `db.put(storeName, value, key?)`             |
| 删除数据        | `db.delete(storeName, key)`                  |
| 清空存储        | `db.clear(storeName)`                        |
| 使用索引查询    | `db.index(indexName).get(value)`             |
| 事务操作        | `db.transaction(storeNames, mode, callback)` |

## 2.3 实际项目建议

封装成一个模块（如 `db.ts`）：

``` TypeScript @src/utils/helpers/db.ts
import { openDB } from 'idb';

const DB_NAME = 'QHDLDB';

const STORE_NAME = 'RADAR';

// 打开数据库并定义结构
export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
  }
});

// 添加数据
export async function addRadarGridObj(obj:any) {
  const db = await dbPromise;
  return db.add(STORE_NAME, obj);
}

// 查询数据
export async function getRadarGridObj(id: string) {
  const db = await dbPromise;
  return db.get(STORE_NAME, id);
}

// 更新数据 如果没有提供 id，且 autoIncrement: true，则会插入新记录。
export async function putRadarGridObj(obj:any) {
  const db = await dbPromise;
  return db.put(STORE_NAME, obj);
}

// 删除数据
export async function deleteRadarGridObj(id: string) {
  const db = await dbPromise;
  return db.delete(STORE_NAME, id);
}

// 清空整个对象存储
export async function clearRadarGridObj() {
  const db = await dbPromise;
  return db.clear(STORE_NAME);
}
```

在组件中使用：

``` TypeScript
import { addRadarGridObj } from './db.ts';
await addRadarGridObj({ code: 'mcr' });
```

> ## TIP 优势
> ✅ Promise / async/await 友好 \
> ✅ 体积小（< 2KB gzipped） \
> ✅ 类型安全（支持 TypeScript） \
> ✅ 兼容现代浏览器（包括 Safari、Chrome、Firefox、Edge） \
> ✅ 支持高级功能（游标、索引、事务）

# 四、注意事项
- ● 同源策略：IndexedDB 受同源限制。
- ● 存储上限：通常为磁盘空间的 50% 或浏览器限制（Chrome 约 60%~80% 可用空间）。
- ● 不支持跨标签页实时同步：需配合 storage 事件或 BroadcastChannel 手动同步。
- ● 不支持 SQL 查询：只能通过主键或索引查询。
- ● 移动端兼容性良好，但 Safari 对大容量存储可能有额外限制。

# 五、适用场景
- ● 离线应用（如 PWA）
- ● 缓存大量结构化数据（如消息记录、文档）
- ● 避免频繁请求后端接口（本地优先策略）

---

# 六、报错问题一

``` log
Failed to execute 'add' on 'IDBObjectStore': #<Promise> could not be cloned.
```

**根本原因是：**试图将一个 **Promise** 对象（或其他不可结构化克隆的值，如函数、Symbol、DOM 节点等）存入 IndexedDB。

**IndexedDB** 使用 **结构化克隆算法（Structured Clone Algorithm）** 来序列化数据。

> ## WARN 不支持以下类型
> ❌ `Promise` \
> ❌ `Function` \
> ❌ `Symbol` \
> ❌ `WeakMap` / `WeakSet` \
> ❌ DOM 元素（如 `div`） \
> ❌ `Error` 对象的部分属性（如 `.stack` 可能丢失）

如果在存入的对象中不小心包含了 Promise，就会触发此错误。
