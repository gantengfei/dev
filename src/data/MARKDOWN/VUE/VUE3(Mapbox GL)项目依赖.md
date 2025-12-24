# ➤ npm安装依赖

> ## TIP
> -S：--save的简写(开发和运行都依赖时) \
> -D：--save-dev的简写(开发时依赖)
``` bash
# Mapbox GL（2.6.1版本）[^2.6.1]
npm i --S mapbox-gl@2.6.1
# 删除mapbox-gl
npm uninstall mapbox-gl
# 安装3.14.0版本
npm i --S mapbox-gl@3.14.0

# Mapbox组件mapbox-gl-draw（绘制图形）[^1.4.2]
npm i --S @mapbox/mapbox-gl-draw

# Mapbox组件mapbox-gl-language（语言包）[^1.0.1]
npm i --S @mapbox/mapbox-gl-language

# Echarts [^5.4.3]
npm i --S echarts

# 读取和打包zip文件
npm i --S jszip@3.1.3

# jquery [^3.7.1]
npm i --S jquery @types/jquery

# 网络请求库 [^1.5.0]
npm i --S axios
```

模块中使用`echarts`：
``` TypeScript
import * as echarts from 'echarts'
```

# ➤ vue-class-component
> ## TIP
> 安装[vue-class-component](https://www.npmjs.com/package/vue-class-component)
> 使用@Component注解，将类转化为 vue 的组件
``` bash
npm i --S vue-class-component@next
# [^8.0.0-rc.1]
```

# ➤ element-plus
> ## TIP
> 安装[Element Plus](https://element-plus.org/zh-CN/)
> VueUI组件库
``` bash
npm i --S element-plus

# 版本升级
npm install element-plus@latest
# [^2.4.3]
```
在 `main.ts` 文件中配置使用：
``` TypeScript
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

app.use(ElementPlus, { locale: zhCn })

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
```

# ➤ @turf/turf
> ## TIP
> 安装 [turf.js](https://turfjs.org/)
> 处理各种地图算法
``` bash
# 安装版本太低
# npm i --S turf
# [^3.0.14]

# 安装 Turf 库
npm i --S @turf/turf
# [^6.5.0]
```
在 `main.ts` 文件中配置使用：
``` TypeScript
//@ts-ignore
import * as turf from '@turf/turf';
(window as any).turf = turf;
```

# ➤ plotly.js-dist
> ## TIP
> 安装[plotly.js](https://plotly.com/javascript/reference/)
> 图表库
``` bash
npm i plotly.js-dist
```
在`typings/index.ts`中配置：
``` TypeScript
declare module 'plotly.js-dist';
```
在模块中使用：
``` TypeScript
import Plotly from 'plotly.js-dist';
```

# ➤ three
``` bash
npm i three@0.115.0
```

# ➤ gif.js
```
npm i gif.js@0.2.0
```

# ➤ terser
> 生产环境时移除console.log调试代码
> 生产环境时移除debugge
```
npm install terser --save-dev
```

# ➤ clipboard
> 复制内容到剪贴板
```
npm install clipboard --save
```
