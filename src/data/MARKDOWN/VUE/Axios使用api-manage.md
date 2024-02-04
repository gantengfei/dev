``` TypeScript
import request from '@/utils/request/request'

/** POST请求 request.post(url:string,params:{})
 * @param url
 * @param params 参数
 * @param option 其它参数
 */
export function postAction(url: string, params?: any, option?: any) {
  return request({
    url: url,
    method: 'post',
    params: params,
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
    params: params,
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
    params: params,
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
