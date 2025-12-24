# ➤ 获取数组最大/最小值
数组最大`Math.max()`最小值`Math.min()`
``` JavaScript
let Arrp = [1,2,3,4,5,6]
let MaxArrp = Math.max(...Arrp)
let MinArrp = Math.min(...Arrp)
```

---

# ➤ 数组 拼接数据
使用扩展运算符（...）进行数组拼接
``` JavaScript
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var result = [...arr1, ...arr2]; // 输出 [1, 2, 3, 4, 5, 6]
```

---

# ➤ 对象 拼接数据
使用扩展运算符（...）进行对象拼接
``` JavaScript
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const mergedObj = { ...obj1, ...obj2 }; // 输出: { a: 1, b: 3, c: 4 }
```

---

# ➤ `slice()`取数组前三个元素
``` JavaScript
var arr = [1, 2, 3, 4, 5, 6];
var result = arr.slice(0, 3); // 输出：[1,2,3]
```

---

# ➤ `filter()` 过滤
``` JavaScript
const arr = [25, 16, 3, 7];
arr.filter( v => v > 10 ); // 输出：[25,16]
```

---

# ➤ 数组去重 数组排序正(到)序
数组去重`new Set()`，数组排序正(到)序`sort()`
``` JavaScript
let heightArray = [];
// * 排重,并倒序排序 倒序(b-a) 正序(a-b)
heightArray = Array.from(new Set(heightArray));
heightArray.sort((a, b) => { return b - a });
```

---

# ➤ 字符串填充`padStart()` `padEnd()`
``` JavaScript
let num = 789
// padStart() 从当前字符串的开头开始填充
let str = String(num).padStart(2) // 输出：'789'
let str = String(num).padStart(4) // 输出：' 789'
let str = String(num).padStart(4, '63') // 输出：'6789'
let str = String(num).padStart(5, '63') // 输出：'63789'
let str = String(num).padStart(8, '63') // 输出：'63636789'
// 常用在补全长度
let str = String(num).padStart(6, '0') // 输出：'000789'
// padEnd() 从当前字符串的末尾开始填充
let str = String(num).padEnd(2) // 输出：'789'
let str = String(num).padEnd(4) // 输出：'789 '
let str = String(num).padEnd(4, '0') // 输出：'7890'
let str = String(num).padEnd(4, '63') // 输出：'7896'
let str = String(num).padEnd(5, '63') // 输出：'78963'
let str = String(num).padEnd(8, '63') // 输出：'78963636'
```

---

# ➤ 标签切换改变选中状态
``` JavaScript
const tabs=[
    { name: 'tab1', isActive: true },
    { name: 'tab2', isActive: false},
    { name: 'tab3', isActive: false}]

tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
```

---

# ➤ 数组排序正(到)序`sort()`
``` JavaScript
let array = ['1458', '329', '602', '988', '241', '149', '430', '48', '1951'];

array.sort();
// 输出：['1458', '149', '1951', '241', '329', '430', '48', '602', '988']

array.sort((a, b) => a - b);
// 正序(a-b)输出：['48', '149', '241', '329', '430', '602', '988', '1458', '1951']

array.sort((a, b) => b - a);
// 倒序(b-a)输出：['1951', '1458', '988', '602', '430', '329', '241', '149', '48']
```

> ## WARNING
> `sort()` 方法用于对数组的元素进行排序。 \
> 排序顺序可以是字母或数字，并按升序或降序。 \
> 默认排序顺序为按字母升序。 \
> **注意：** _当数字是按字母顺序排列时"40"将排在"5"前面。_

---

# ➤ `every()`检测数组满足指定的条件

- `every()`方法接收一个函数作为测试条件，数组的每一个元素都会被这个函数处理，如果所有元素都满足测试条件，则返回true，否则返回false
- 判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回true。

``` JavaScript
let arr = [1, 2, 3, 4, 5];

let arr2 = arr.every(item=> {
  return item < 10;
});
// 输出：true

let arr3 = arr.every(item=> {
  return item < 3;
});
// 输出：false
```

---

# ➤ `some()`判断数组满足条件的项

- 判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true。

``` JavaScript
let arr = [1, 2, 3, 4, 5];

let arr2 = arr.some(item=> {
  return item < 3;
});
// 输出：true

let arr3 = arr.some(item=> {
  return item < 1;
});
// 输出：false
```

---

# ➤ 返回通过函数内判断的数组取第一个元素值

- `find()`方法返回通过测试（函数内判断）的数组的第一个元素的值
- `findIndex()`方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。

``` JavaScript
let ages = [3, 10, 18, 20];

function checkAdult(age) {
  return age >= 18;
}
let a1 = ages.find(checkAdult);
// a1输出：18 (返回的是匹配到的第一个元素的值)

// 或者用箭头函数
let a2 = ages.findIndex(ages=> {
	return ages > 3;
})
// a2输出：10 (返回的是匹配到的第一个元素的值)
```
