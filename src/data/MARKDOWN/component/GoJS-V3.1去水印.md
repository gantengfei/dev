
[**GoJS**](https://gojs.net/) 是一个由 Northwoods Software 开发的商业 JavaScript 图表库。在其官方许可协议中明确规定：
- ● 免费试用版本（Evaluation Version）会在图表右下角显示 GoJS 的水印（Logo）。
- ● 只有在购买正式许可证后，才能合法地移除该 Logo。

# 修改源码去除

![输入图片说明](./src/img/images/2026-02-11_14-06-48.png "")

**1.** 在 `go.js` 中搜索 `String.fromCharCode(t.charCodeAt(r)^i[(i[e]+i[s])%256]);`

![输入图片说明](./src/img/images/2026-02-11_14-17-46.png "")

**2.** 在以上代码后加以下几段代码：

``` JavaScript
if(o.indexOf('GoJS 3.1 evaluation')>-1
||o.indexOf('© 1998-2026 Northwoods Software')>-1
||o.indexOf('Not for distribution or production use')>-1
||o.indexOf('gojs.net')>-1)
{return ''}else{return o}
```

修改后为：

![输入图片说明](./src/img/images/2026-02-11_14-17-28.png "")
