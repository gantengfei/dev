将数组array分成长度为subGroupLength的小数组并返回新数组
``` JavaScript
function group(array, subGroupLength) {
  let index = 0;
  let newArray = [];
  while(index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }
  return newArray;
}
```

``` JavaScript
let Array = [1,2,3,4,5,6,7,8,9,10,11];
let groupedArray = group(Array, 6);
// 得到的groupedArray 数组为：
// [[1,2,3,4,5,6],[7,8,9,10,11]]
```
