# 一、单个引入
通过`import XXX from '/路径'`的这种方式去一张张引入
``` html
<template>
  <img src="@/assets/image/wind_shaft_level/5.png" />
</template>
```

``` scss
div{
  background-image: url(@/assets/image/wind_shaft_level/5.png);
}
```

``` typescript
import windLevel5 from '@/assets/image/wind_shaft_level/5.png'

onMounted(async () => {

  // Echarts
  const symbol= `image://${windLevel5}`;

})
```


# 二、批量引入
vue3支持批量引入某个文件夹下的所有资源

``` typescript
// eager:true 表示静态资源
const imageLists: any = import.meta.glob('/src/assets/image/wind_shaft_level/*.*', { eager: true })

onMounted(async () => {

  let level = 0;
  // Echarts
  let pic = '';
  for (let key in imageLists) {
    let name = key.split('/').slice(-1)[0].split('.')[0];
    if (name == level) pic = imageLists[key].default
  }

  const symbol= `image://${pic}`;

}
```
![输入图片说明](./src/img/images/7fb91f0f_4993153.png "")


![输入图片说明](./src/img/images/abe6b616_4993153.png "")
