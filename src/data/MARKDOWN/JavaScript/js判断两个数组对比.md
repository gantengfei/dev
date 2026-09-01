# 判断Array1中是否有Array2中的元素

在 **JavaScript** 中，判断数组 `['a']` 中的值是否存在于数组 `['a', 'b', 'd']` 中，有几种常见的方法：

## 1.使用 `some()` + `includes()`（最简洁推荐）

``` javascript
const arr1 = ['a'];
const arr2 = ['a', 'b', 'd'];

const exists = arr1.some(item => arr2.includes(item));
console.log(exists); // true
```

## 2.使用 `Set`（适合大数据量，性能更好）

``` javascript
const arr1 = ['a'];
const arr2 = ['a', 'b', 'd'];

const set2 = new Set(arr2);
const exists = arr1.some(item => set2.has(item));
console.log(exists); // true
```

## 3.判断 `arr1` 中所有值是否都在 `arr2` 中

判断 `arr1` 的每一个值都存在于 `arr2`

``` javascript
const arr1 = ['a'];
const arr2 = ['a', 'b', 'd'];

const allExist = arr1.every(item => arr2.includes(item));
console.log(allExist); // true
```

| 需求 | 方法 |
|------|------|
| 任意一个值存在即可 | `arr1.some(item => arr2.includes(item))` |
| 所有值都存在 | `arr1.every(item => arr2.includes(item))` |
| 数据量大，追求性能 | 先把 `arr2` 转成 `Set`，再用 `some/every` + `set.has()` |
