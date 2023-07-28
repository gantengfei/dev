# 1、排序法 sort
``` js
let ary = [12,23,24,46,13,59]
ary.sort((a,b)=>{
    return a-b;
})
let min = ary[0];
let max = ary[ary.length-1]
console.log(min,max)
```

# 2、假设法
假设当前数组第一个值是最大值，拿这个值和后面的值逐一进行比较，如果后面的某一个值比假设的要大，就说明我们假设错了，把假设值进行替换
``` js
let ary = [12,23,24,46,13,59]
let min = ary[0],max = ary[0];
for(let i=1;i<=ary.length;i++){
    min > ary[i] ? min=ary[i] : null;
    max < ary[i] ? max=ary[i] : null;
}
console.log(min,max)
```

# 3、Math
``` js
let ary = [12,23,24,46,13,59];
//这里Math.min不能直接传数组类型，需要进行转换
let min = Math.min(ary) //NaN
let min = Math.min(12,23,24,46,13,59)//12

//eval把一个字符串变成js的表达式
//toString()或join()均可以将数组转成字符串类型
let min = eval("Math.min("+ary.toString()+")");
let max = eval("Math.max("+ary.toString()+")");
console.log(min,max)

//apply改变this指向
let max= Math.max.apply(null,ary);
let min= Math.min.apply(null,ary);
```

# 4、借助ES6的扩展运算符
``` js
let ary = [45,34,1,50,12]
let max = Math.max(...ary)
let min = Math.min(...ary)
```



