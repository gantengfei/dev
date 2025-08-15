创建一个全局Loading加载服务`maskloading.svc.ts`，使用Element Plus组件
``` Typescript
import { ElLoading } from 'element-plus'
import loadgif from '@/assets/image/icon/loading.gif'

class MaskLoadingService {

  private loading: any = {};

  addLoading(msg?: string, id?: any, autoclear = true, timeout = 3000) {
    const maskid = id ? `${id}_mask` : 'maskloading';
    if (msg === undefined) msg = "数据加载中...";

    this.loading[maskid] = ElLoading.service({
      lock: true,
      text: msg,
      background: 'rgba(0, 0, 0, 0)',
      customClass: 'index_maskloading',
      spinner: `<image xlink:href="${loadgif}" width="50" height="50" />`,
    })
    if (autoclear) {
      setTimeout(() => {
        const loaded: any = this.loading[maskid];
        if (loaded) {
          loaded.close();
          delete this.loading[maskid];
        }
      }, timeout)
    }
  }

  removeLoading(id?: any) {
    const maskid = id ? `${id}_mask` : 'maskloading';
    const loaded: any = this.loading[maskid];
    if (loaded) {
      loaded.close();
      delete this.loading[maskid];
    }
  }

}

export const mload = new MaskLoadingService();

```

组件原svg元素`class="circular"`带有动画css样式，Loading自定义类名`index_maskloading`
``` scss
.el-loading-mask {
  &.index_maskloading {
    .el-loading-spinner {
      .circular {
        animation: none;
        -webkit-animation: none;
      }

      .el-loading-text {
        color: #0085ff;
        text-shadow: -1px 1px 0 #fff, 1px 1px 0 #fff, 1px -1px 0 #fff, -1px -1px 0 #fff;
      }
    }
  }
}
```
