
# 一、复制单行文本

使用`navigator.clipboard.writeText`方法来复制文本

> ## TIP
> `Clipboard` 接口的 `writeText()` 方法用于将特定的字符串写入到操作系统的剪贴板中。这个方法会返回一个 Promise，一旦剪贴板的内容被更新，Promise 就会被解析。如果调用者没有写入剪贴板的权限，则 Promise 会被拒绝。
>
> <i style="color:red;">需要注意的是，由于安全性和隐私性的原因，这个方法在非安全上下文（如 HTTP 页面）中可能无法使用。同时，用户需要明确授权网站访问剪贴板，否则此方法也会失败。</i>
>
> 此外，由于 `navigator.clipboard.writeText()` 是异步的，因此需要使用 Promise 来处理其结果。如果复制成功，Promise 会被解析；如果复制失败（例如，由于用户拒绝了权限或由于其他错误），Promise 会被拒绝，并传递一个错误对象。<i style="color:red;">大部分浏览器支持该方法，但并非所有浏览器支持，使用前最好检查下兼容问题。</i>

``` html
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
> ## 使用遇到的问题
> **HTTP协议下的不可用性：**浏览器禁用了非安全域的 `navigator.clipboard` 对象。安全域包括本地访问（如 127.0.0.1 或 localhost）以及开启TLS安全认证的地址，如HTTPS协议的地址。如果网站使用HTTP协议而不是HTTPS，则无法使用此功能。
>
> **Safari浏览器的限制：**在Safari浏览器中，如果在一个Promise后使用 `navigator.clipboard.writeText`，可能会报一个没有权限的错误（Unhandled Rejection (NotAllowedError)）。这可能是因为用户代理或平台在当前上下文中不允许该请求，可能是因为用户拒绝了权限。
>
> **用户权限：**在使用 `navigator.clipboard.writeText` 之前，需要明确获得用户的许可。如果用户没有授权或拒绝了权限请求，则无法将文本写入剪贴板。
>
> **跨域限制：**如果页面试图跨域访问剪贴板，可能会遇到安全问题。因此，需要确保页面在相同的源（即相同的协议、主机和端口）上运行。
>
> **浏览器兼容性：**虽然现代浏览器大多支持 `navigator.clipboard.writeText`，但并非所有浏览器都支持。因此，在使用此功能之前，最好检查目标浏览器的兼容性。
>
> **错误处理：**当使用 `navigator.clipboard.writeText` 时，应该添加适当的错误处理代码，以捕获和处理可能出现的任何错误。

> ## 采取措施
> 确保网站使用HTTPS协议。
>
> 在调用 `navigator.clipboard.writeText` 之前，检查用户是否已授权访问剪贴板。
>
> 避免在Promise后直接使用 `navigator.clipboard.writeText`，尤其是在Safari浏览器中。
>
> 在使用此功能之前，检查目标浏览器的兼容性。
>
> 添加适当的错误处理代码以捕获和处理可能出现的错误。


# 二、使用clipboard.js库
安装
```
npm install clipboard --save
```
使用
``` html
<template>
 <span @click="copyText" style="user-select:text;">{{ textDetailsInfo }}</span>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import ClipboardJS from 'clipboard'

export default class TestView extends Vue {

  public textDetailsInfo: any = ref('')

  mounted(): void {

    this.textDetailsInfo = '国破山河在，城春草木深。-唐·杜甫《春望》'

  }

  public async copyText() {
    try {
      ClipboardJS.copy(this.textDetailsInfo);
      console.log('已复制到剪贴板')
    } catch (error) {
      console.error('复制失败', error);
    }
  }

}

</script>
```
