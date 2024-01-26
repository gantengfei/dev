# 全部缓存
使用`Keep-alive`标签包裹`router-view`就可以实现全部缓存
``` xml
<keep-alive>
  <router-view> </router-view>
</keep-alive>
```

# 缓存单个指定的路由
同样使用`Keep-alive`标签包裹`router-view`，在`Keep-alive`中使用`include`指定需要缓存的页面的名称即可
``` xml
<keep-alive include='缓存页面的名称'>
  <router-view> </router-view>
</keep-alive>
```

# 缓存多个指定路由
需要使用两个`router-view`两个标签，一个作为缓存的出口一个作为不换缓存的出口，然后在路由配置的时候给缓存的页面加上`meta`属性，然后设置`keepAlive`的值
``` xml
<keep-alive>
  <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>

<router-view v-if="!$route.meta.keepAlive"></router-view>
```

> ## WARNING
> 由于router新版本的原因
> ![输入图片说明](https://foruda.gitee.com/images/1705973928240579717/6b269055_4993153.png "warnings")

将组件修改成如下内容：
``` xml
<router-view v-slot="{ Component, route }">
  <keep-alive v-if="route.meta.keepAlive">
    <component :is="Component" />
  </keep-alive>
  <component v-else :is="Component" />
</router-view>
```


# 路由配置
路由`src/router/index.ts`配置
``` typescript
{
 path:'/apage',
 name:'apage',
 component: AView,
 meta: {
  title:"a页面",
  keepAlive: true  //true缓存 false不缓存
 }
}
```
