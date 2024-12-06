**drawImage 方法有三种形态**

`drawImage(image, dx, dy)` 在画布指定位置绘制原图 \
`drawImage(image, dx, dy, dw, dh)` 在画布指定位置上按原图大小绘制指定大小的图 \
`drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)` 剪切图像，并在画布上定位被剪切的部分

| 参数     | 描述                     |
|----------|-----------------------------|
| `image` | 规定要使用的图像、画布或视频 |
| `sx`    | <i style="font-size:12px;color:orangered;">可选。</i>开始剪切图片的 x 坐标位置 |
| `sy`    | <i style="font-size:12px;color:orangered;">可选。</i>开始剪切图片的 y 坐标位置 |
| `sw`    | <i style="font-size:12px;color:orangered;">可选。</i>被剪切图像的宽度（就是裁剪之前的图片宽度，这里的宽度若小于图片的原宽。则图片多余部分被剪掉；若大于，则会以空白填充） |
| `sh`    | <i style="font-size:12px;color:orangered;">可选。</i>被剪切图像的高度（就是裁剪之前的图片高度） |
| `dx`    | 在画布上放置图像的 x 坐标位置 |
| `dy`    | 在画布上放置图像的 y 坐标位置 |
| `dw`    | <i style="font-size:12px;color:orangered;">可选。</i>要使用的图像的宽度（就是裁剪之后的图片高度，放大或者缩放） |
| `dh`    | <i style="font-size:12px;color:orangered;">可选。</i>要使用的图像的高度（就是裁剪之后的图片高度，放大或者缩放） |
