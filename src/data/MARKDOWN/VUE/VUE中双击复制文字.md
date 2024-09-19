
# 一、复制单行文本

使用`navigator.clipboard.writeText`方法来复制文本
```
<template>
 <span @dblclick="copyText" style="user-select:text;">{{ textDetailsInfo }}</span>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class TestView extends Vue {

  public textDetailsInfo: any = ref('')

  mounted(): void {

    this.textDetailsInfo = '国破山河在，城春草木深。-唐·杜甫《春望》'

  }

  public async copyText(event: any) {
    try {
      // 阻止默认的双击选中文本行为
      event.preventDefault();
      // 使用Clipboard API复制文本到剪贴板
      await navigator.clipboard?.writeText(this.textDetailsInfo);
      console.log('已复制到剪贴板')
    } catch (error) {
      console.error('复制失败', error);
    }
  }

}

</script>
```
