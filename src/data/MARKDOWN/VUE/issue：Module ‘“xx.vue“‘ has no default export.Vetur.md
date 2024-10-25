
开发VUE3过程中使用VS code，`Vetur` 暂不支持ts语法，卸载 `Vetur` 插件，安装 `Volar`

【错误提示】
```
<template>
  <MapContainer/>
</template>

<script setup lang="ts">
import MapContainer from '../components/MapContainer.vue';
</script>
```
虽然不影响正常运行：
![输入图片说明](https://foruda.gitee.com/images/1693985997214337160/32e532e7_4993153.png "屏幕截图")

具体的错误信息如下：
<span class="error">Module '"e:/SVN/vue-test/src/components/MapContainer.vue"' has no default export.Vetur(1192)</span>

【错误原因】 \
从错误提示可以看到关键字_Vetur_：
> Vue tooling for VS Code.

`vetur`是一个`vscode`插件，用于为`.vue`单文件组件提供代码高亮以及语法支持

官方推荐`_volar_`，`volar`是`vetur`的升级版本，提供了支持`vue3`功能并有更好的TS支持。

【解决办法】 \
在vscode插件中选择卸载`vetur`，安装`volar`插件即可;

安装`volar` \
![输入图片说明](https://foruda.gitee.com/images/1693986535932519537/476cc727_4993153.png "屏幕截图")

卸载`vetur` \
![输入图片说明](https://foruda.gitee.com/images/1693986566868894015/2b140459_4993153.png "屏幕截图")
