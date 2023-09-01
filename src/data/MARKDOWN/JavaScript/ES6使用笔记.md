数组最大最小值
``` JavaScript
let Arrp = [1,2,3,4,5,6]
let MaxArrp = Math.max(...Arrp)
let MinArrp = Math.min(...Arrp)
```

数组拼接数据
``` JavaScript
let Aarr = [1,2,3];
let Barr = [4,5,6];
arr = [...Aarr,...Barr]; // [1,2,3,4,5,6]
```

filter() 过滤
``` JavaScript
const arr = [25,16,3,7];
arr.filter(v=>v>10); //[25, 16]
```

数值去重，数值排序正(到)序
``` JavaScript
let heightArray = [];
// * 排重,并倒序排序 倒序(b-a) 正序(a-b)
heightArray = Array.from(new Set(heightArray));
heightArray.sort((a, b) => { return b - a });
```

标签切换改变选中状态
``` JavaScript
const tabs=[
    { name: 'tab1', isActive: true },
    { name: 'tab2', isActive: false},
    { name: 'tab3', isActive: false}]

tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
```
