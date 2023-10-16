**数组最大最小值**
``` JavaScript
let Arrp = [1,2,3,4,5,6]
let MaxArrp = Math.max(...Arrp)
let MinArrp = Math.min(...Arrp)
```

**数组拼接数据**
``` JavaScript
let Aarr = [1,2,3];
let Barr = [4,5,6];
arr = [...Aarr,...Barr]; // [1,2,3,4,5,6]
```

**`filter()` 过滤**
``` JavaScript
const arr = [25,16,3,7];
arr.filter(v=>v>10); //[25, 16]
```

**数组去重，数组排序正(到)序**
``` JavaScript
let heightArray = [];
// * 排重,并倒序排序 倒序(b-a) 正序(a-b)
heightArray = Array.from(new Set(heightArray));
heightArray.sort((a, b) => { return b - a });
```

**标签切换改变选中状态**
``` JavaScript
const tabs=[
    { name: 'tab1', isActive: true },
    { name: 'tab2', isActive: false},
    { name: 'tab3', isActive: false}]

tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
```


**数组排序正(到)序**
``` JavaScript
let array = ['1458', '329', '602', '988', '241', '149', '430', '48', '1951'];

array.sort();
// ['1458', '149', '1951', '241', '329', '430', '48', '602', '988']

array.sort((a, b) => a - b);
// 正序(a-b) ['48', '149', '241', '329', '430', '602', '988', '1458', '1951']

array.sort((a, b) => b - a);
// 倒序(b-a) ['1951', '1458', '988', '602', '430', '329', '241', '149', '48']
```

> ## WARNING
> sort() 方法用于对数组的元素进行排序。 \
> 排序顺序可以是字母或数字，并按升序或降序。 \
> 默认排序顺序为按字母升序。 \
> **注意：** 当数字是按字母顺序排列时"40"将排在"5"前面。
