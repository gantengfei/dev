
# 一、基本位置

**警告信息：**
``` log
The "manualChunks" option is deprecated. Use the "output.manualChunks" option instead.
```
说明正在使用的构建工具（很可能是 `Vite` 或 `Rollup`）已经更新了配置方式，旧的 `manualChunks` 配置项已被弃用，需要迁移到新的位置：`output.manualChunks`。


**<span style="color:#cf3417;">旧写法（已弃用）：</span>**
``` TypeScript
// vite.config.js
export default {
  build: {
    manualChunks: {
      vendor: ['vue', 'element-plus'],
      lodash: ['lodash']
    }
  }
}
```

**<span style="color:#16ab0d;">新写法（推荐）：</span>**

在 `vite.config.js` 中，正确配置路径为：
``` TypeScript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'element-plus'],
          lodash: ['lodash']
        }
      }
    }
  }
}
```


# 二、两种配置形式

## 1. 对象形式（Object） —— 简单静态分组
``` TypeScript
manualChunks: {
  // chunk 名称: [模块 ID 或模块名数组]
  vendor: ['react', 'react-dom'],
  lodash: ['lodash'],
  utils: ['./src/utils/a.js', './src/utils/b.ts']
}
```

> ## TIP 特点
> - ● 简洁直观。
> - ● 模块名必须精确匹配（通常是包名或相对/绝对路径）。
> - ● 不支持动态逻辑或通配。

> ## NOTICE
> - ● 对于 `node_modules` 中的包，通常只需写包名（如 `'react'`），Rollup 会自动解析到 `node_modules/react/...`。
> - ● 对于本地模块，建议使用绝对路径（可通过 `path.resolve` 构造），因为 Rollup 内部使用的是绝对路径 ID。

## 2. 函数形式（Function） —— 动态、灵活控制（推荐）
``` TypeScript
manualChunks(id) {
  // id: 模块的绝对文件路径（例如 /project/node_modules/react/index.js）
  // 返回值：字符串（chunk 名称）或 undefined（使用默认分包策略）
}
```
``` TypeScript
import path from 'path';

manualChunks(id) {
  // 拆分 node_modules
  if (id.includes('node_modules')) {
    if (id.includes('react') || id.includes('scheduler')) {
      return 'react-vendor';
    }
    if (id.includes('lodash')) {
      return 'lodash';
    }
    // 其他第三方库归为 vendor
    return 'vendor';
  }

  // 拆分项目内部大型模块
  if (id.includes(path.resolve(__dirname, 'src/components/Chart'))) {
    return 'chart-components';
  }

  // 返回 undefined 表示由 Rollup 自动处理
}
```

> ## TIP 特点
> - ● 可使用正则、路径判断、条件逻辑。
> - ● 支持按目录、关键词、文件类型等灵活分组。
> - ● 适合大型项目精细化控制。

> ## NOTICE
> - ● `id` 是 绝对路径（在 `Windows` 上是 `\`，`Linux/macOS` 是 `/`），建议用 `path.sep` 或 `includes('/node_modules/')` 兼容。
> - ● 不要返回空字符串或 `false`，应返回 `undefined` 表示“不干预”。
> - ● 同一个 chunk 名下的所有模块会被合并到一个文件（如 `react-vendor.[hash].js`）。


### ◆ 在项目中应用
``` TypeScript
// vite.config.ts
export default {
  build: {
    rollupOptions: {
      output: {
        // 分包处理
        manualChunks(id) {
          // 拆分 node_modules
          if (id.includes('node_modules') && (id.endsWith('.js') || id.endsWith('.ts'))) {
            // 拆分工具库
            if (id.includes('turf')) return 'vendor-turf';
            // 拆分图表
            if (id.includes('echarts') || id.includes('zrender')) return 'vendor-echarts';
            if (id.includes('plotly')) return 'vendor-plotly';
            // 其他第三方库
            return 'vendor';
          }
        },
      }
    }
  }
}
```


# 三、参数详解（函数形式）

| 参数   | 类型                          | 说明                                                                 |
| :----- | :---------------------------- | :------------------------------------------------------------------- |
| id     | `string`                      | 模块的绝对路径<br>（例如 `/your-project/node_modules/lodash/lodash.js`） |
| 返回值  | `string \| null \| undefined` | 字符串：指定 chunk 名 <br> `undefined` / `null`：使用默认分包策略    |

> ## NOTICE
> 返回 `null` 在某些版本中可能报错，推荐只返回 `string` 或 `undefined`。


# 四、调试技巧
打印所有模块 ID（辅助编写规则）：
``` TypeScript
manualChunks(id) {
  console.log('Module ID:', id);
  // 根据输出编写你的分组逻辑
}
```
使用正则匹配（更健壮）：
```
const reactRegex = /[\\/]node_modules[\\/]react/;
if (reactRegex.test(id)) {
  return 'react';
}
```
> 使用 `[\\/]` 兼容 Windows 和 Unix 路径分隔符。


# 五、应用场景

| 场景                               | 配置建议                   |
| :--------------------------------- | :------------------------- |
| 拆分大型 UI 库（React/Vue）        | 单独 chunk，利于缓存       |
| 拆分工具库（lodash、date-fns）     | 避免污染主 bundle          |
| 拆分图表/编辑器（ECharts、Monaco） | 配合动态 import 实现懒加载 |
| 按业务模块拆分（Admin / User）     | 函数形式按目录分组         |
| 第三方 SDK（Analytics、Map）       | 单独加载，避免阻塞核心逻辑 |


# 六、常见陷阱
- ● **路径大小写敏感**
- Linux/macOS 路径区分大小写，确保匹配准确。

- ● **重复分组冲突**
- 一个模块只能属于一个 manual chunk，若多个规则匹配，以第一个返回非 undefined 的为准。

- ● **过度拆分**
- 太多小 chunk 会增加 HTTP 请求（尤其无 HTTP/2 时），反而降低性能。

- ● **未使用绝对路径匹配本地模块**
- 本地模块必须用 `path.resolve(__dirname, 'src/xxx')` 构造绝对路径再匹配。
