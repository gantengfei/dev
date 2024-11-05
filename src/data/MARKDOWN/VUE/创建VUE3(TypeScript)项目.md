# 一、创建一个 Vue 项目

> ## WARNING
> 已安装 `16.0` 或更高版本的 `Node.js` \
> 可通过 *`nvm`* / *`fnm`* 命令管理多个`node`版本

创建的项目将使用基于 `Vite` 的构建设置，并允许我们使用 `Vue` 的单文件组件 (SFC)。
确保你安装了最新版本的 `Node.js`，并且你的当前工作目录正是打算创建项目的目录。
``` bash
npm create vue@latest
```

``` bash
# ok 继续
Ok to proceed? (y) y
Vue.js - The Progressive JavaScript Framework
```

``` bash
# 项目名称,此处不建议中文
✔ Project name: … <your-project-name>
# 是否加入TypeScript组件 Yes
✔ Add TypeScript? … No / Yes
# 是否加入JSX支持 No
✗ Add JSX Support? … No / Yes
# 是否加入路由管理组件
✔ Add Vue Router for Single Page Application development? … No / Yes
# 是否添加Pinia组件来进行状态管理
✔ Add Pinia for state management? … No / Yes
# 是否添加Vitest来进行单元测试
✗ Add Vitest for Unit testing? … No / Yes
# 是否添加端到端接口
✗ Add an End-to-End Testing Solution? … No / Cypress / Playwright
# 是否添加ESLint来进行代码质量检查
✔ Add ESLint for code quality? … No / Yes
# 是否添加Prettier代码格式化
✔ Add Prettier for code formatting? … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```

显示： \
![输入图片说明](https://foruda.gitee.com/images/1693893747705947478/50988401_4993153.png "")


# 二、启动VUE 项目

安装依赖
``` bash
npm install
```
启动项目
``` bash
npm run dev
```
显示：\
![输入图片说明](https://foruda.gitee.com/images/1693895282280182376/d8a26b0d_4993153.png "")

看到以上提示，项目启动成功。
打开浏览器，在地址栏输入 http://localhost:5173 即可打开项目。\
![输入图片说明](https://foruda.gitee.com/images/1693896822379884895/5d857bd2_4993153.png "")


# 三、打包
当你准备将应用发布到生产环境时，请运行：
``` bash
npm run build
```
![输入图片说明](https://foruda.gitee.com/images/1694508995992746626/9db4156d_4993153.png "")
