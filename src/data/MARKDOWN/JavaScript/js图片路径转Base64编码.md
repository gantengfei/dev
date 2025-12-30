# JavaScript 图片路径转 Base64 编码

使用 `fetch API` 获取图片内容
``` TypeScript
  private imgPath = 'http://...' // 或 ../../...
  //相对路径地址图片转为base64
  public convertImageToBase64() {
    // 使用 fetch API 获取图片内容
    fetch(imgPath).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.blob()
    }).then((blob) => {
      // 创建一个 FileReader 对象来读取 Blob 数据
      const reader: any = new FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        const base64data = reader.result //.replace(/^data:image\/\w+;base64,/, "");
        console.log(base64data);
      }
    }).catch((error) => {
      console.error('Error fetching image:', error)
    })
  }
```
