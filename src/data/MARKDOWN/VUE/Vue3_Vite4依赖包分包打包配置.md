
**警告信息：**
``` log
The "manualChunks" option is deprecated. Use the "output.manualChunks" option instead.
```
说明正在使用的构建工具（很可能是 `Vite` 或 `Rollup`）已经更新了配置方式，旧的 `manualChunks` 配置项已被弃用，需要迁移到新的位置：`output.manualChunks`。

# ➤ 正确配置方式

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

# ➤ 项目中应用
``` TypeScript
// vite.config.ts
export default {
  build: {
    rollupOptions: {
      output: {
        // 依赖包-分包处理
        manualChunks(id) {
          if (id.includes('node_modules') && id.endsWith('.js') || id.endsWith('.ts')) {
            return 'vendor';
          }
        },
      }
    }
  }
}
```

因为 `Vite` 底层使用 `Rollup` 进行打包，`manualChunks` 实际上是 `Rollup` 的 `output.manualChunks` 选项，所以现在必须嵌套在 `build.rollupOptions.output` 下。

> ## TIP 补充说明
> - ● `manualChunks` 的作用：手动将某些模块拆分成独立的 chunk（例如将第三方库单独打包，利于缓存）。
> - ● 此变更主要出现在 `Vite v3+` 或 `Rollup v2.18+` 中。
> - ● 如果你使用的是纯 Rollup（非 Vite），配置应直接放在 `output` 里：

``` TypeScript
// rollup.config.js
export default {
  output: {
    dir: 'dist',
    format: 'esm',
    manualChunks: {
      vendor: ['vue', 'element-plus']
    }
  }
}
```

# ➤ 验证是否生效
构建后检查 `dist/` 目录，应该能看到如 `vendor.[hash].js`、`lodash.[hash].js` 等独立 chunk 文件。
