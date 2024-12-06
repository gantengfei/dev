# 一、简单例子
![输入图片说明](https://foruda.gitee.com/images/1732840904983156481/5bdf4046_4993153.png "")

# 二、应用例子
1.在`src\utils\worker`文件夹中创建`xxx.worker.ts`（worker文件）
``` TypeScript
addEventListener("message", (event) => {
  const datas = event.data;
  // 1-在此处理数据
  const result
  // 2-将结果发送回主线程
  postMessage(result)
})
```
2.在`Vue`中使用`worker`
``` xml
<template>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class ModuleView extends Vue {

  mounted(): void { }

  private organizationData(datas: any) {
    const worker = new Worker(new URL('@/utils/worker/xxx.worker.ts', import.meta.url))

    worker.postMessage({ datas: datas });

    worker.onmessage = (event) => {
      // 处理 worker 返回的结果
      const result = event.data;

      // 完成后终止 worker
      worker.terminate();
    }
  }

}

</script>
```
