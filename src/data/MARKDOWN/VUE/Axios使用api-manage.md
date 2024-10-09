``` TypeScript
import request from '@/utils/request/request'

/** POST请求 request.post(url:string,params:{})
 * * JSON数据类型
 * @param url
 * @param params 参数
 * @param option 其它参数
 */
export function postAction(url: string, params?: any, option?: any) {
  return request({
    url: url,
    method: 'post',
    data: params,
    ...option
  })
}

/** GET请求 request.get(url:string,params:{})
 * @param url
 * @param params 参数
 * @param option 其它参数
 */
export function getAction(url: string, params?: any, option?: any) {
  return request({
    url: url,
    method: 'get',
    params: params,
    ...option
  })
}

/** PUT请求 request.put(url:string,params:{})
 * @param url
 * @param params 参数
 * @param option 其它参数
 */
export function putAction(url: string, params?: any, option?: any) {
  return request({
    url: url,
    method: 'put',
    data: params,
    ...option
  })
}

/** DELETE请求 request.delete(url:string,params:{})
 * @param url
 * @param params 参数
 * @param option 其它参数
 */
export function deleteAction(url: string, params?: any, option?: any) {
  return request({
    url: url,
    method: 'delete',
    data: params,
    ...option
  })
}

/** 静态文件请求 request.get(url:string)
 * @param url
 */
export function fileAction(url: string) {
  return request({
    url: url,
    method: 'get'
  })
}

/** POST请求 request.post(url:string,params:{})
 * * (表单)字符串类型
 * @param url
 * @param params 参数
 * @param option 其它参数
 */
export function postFormAction(url: string, params?: any, option?: any) {
  return request({
    url: url,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    ...option
  })
}

/** POST请求 request.post(url:string,params:{})
 * * (导出)字符串类型
 * @param url
 * @param params 参数
 * @param option 其它参数
 */
export function postExportAction(url: string, params?: any, option?: any) {
  return request({
    url: url,
    method: 'post',
    data: params,
    contentType: 'application/json;charset=UTF-8',
    responseType: 'blob',
    ...option
  })
}

/** 上传文件请求
 * @param url
 * @param FormData FormData对象
 */
export function UploadFileAction(url: string, FormData: any) {
  return request({
    url: url,
    method: 'post',
    data: FormData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}


```

**使用-1**

父级组件中使用`Suspense` 异步加载
``` xml
<template>
  <Suspense>
    <CaselibraryMenu />
  </Suspense>
</template>
```
子组件CaselibraryMenu.vue
``` TypeScript
import { fileAction } from '@/api/manage';

const menuConfig = (await fileAction(consts.menuConfig)).data;
```

**使用-2**
``` xml
<script lang="ts" setup>
import { fileAction } from '@/api/manage';
import { ref } from 'vue'

const menuConfig: any = ref()

const initMenuConfig = async ()=>{
  menuConfig.value = (await fileAction(consts.qianghaiconfig)).data;
  initMenupanel();
}
</script>
```

**使用-3**
``` xml
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { fileAction } from '@/api/manage';
import { ref } from 'vue'

export default class DisasterWeatherArea extends Vue {

  public menuConfig: any = ref();

  mounted(): void {

    this.initMenuConfig();

  }

  private async initMenuConfig() {
    this.menuConfig = (await fileAction(consts.menuConfig)).data;
    this.initMenupanel();
  }

}
</script>
```
