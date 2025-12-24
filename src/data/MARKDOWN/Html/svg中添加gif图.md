在SVG中直接嵌入GIF图像并不是一个直接支持的特性，因为SVG是基于XML的矢量图形格式，而GIF是基于像素的图象格式。但是，你可以通过几种方法在SVG中使用GIF图像：

**使用`<image>`元素**

在SVG中使用`<image>`元素来嵌入GIF图像。这种方法需要将GIF图像的URL作为`xlink:href`属性值。
``` Xml
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <image xlink:href="path_to_your_gif.gif" width="200" height="200" />
</svg>
```
确保SVG文件包含了`xmlns:xlink="http://www.w3.org/1999/xlink"`，这样浏览器才能正确解析`xlink:href`属性。
``` Xml
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <image xlink:href="path_to_your_gif.gif" width="200" height="200" />
</svg>
```

**Vue项目使用Element中应用**
``` TypeScript
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

  allClearLoading() {
    for (const key in this.loading) {
      const loaded: any = this.loading[key];
      if (loaded) {
        loaded.close();
        delete this.loading[key];
      }
    }
  }

}

export const mload = new MaskLoadingService();
```
