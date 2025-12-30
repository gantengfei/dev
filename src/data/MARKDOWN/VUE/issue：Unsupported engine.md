【错误提示】
``` log
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: 'create-vue@3.7.3',
npm WARN EBADENGINE   required: { node: '>=v16.20.0' },
npm WARN EBADENGINE   current: { node: 'v16.14.2', npm: '8.6.0' }
npm WARN EBADENGINE }
```
【错误原因】
> 这个只是警告，大概意思就是之前的环境是适用的版本，现在是什么版本，不用管可以继续 启动项目

【解决办法】

➣ 查看[nodejs & npm 版本对照](https://nodejs.org/en/download/releases)，两者是否匹配
![输入图片说明](./src/img/images/3a9495ad_4993153.png "")
