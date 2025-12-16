**安装依赖命令**
``` bash
npm i
```

# 告警一：core-js版本
``` log
npm warn deprecated core-js@2.3.0: core-js@<3.23.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Some versions have web compatibility issues. Please, upgrade your dependencies to the actual version of core-js.

added 584 packages in 56s

111 packages are looking for funding
  run `npm fund` for details
```
该警告表明当前项目使用的 `core-js@2.3.0` 版本已过时且不再维护，可能导致性能下降（最高达100倍）和兼容性问题。

可能存在嵌套依赖引用旧版，需手动更新所有相关依赖：
``` bash
npm ls core-js # 查看依赖树
```

``` log
xdqx-vuemapbox-project@0.0.0 E:\GIT\mapbox+vue
`-- jszip@3.1.3
  `-- core-js@2.3.0
```

更新jszip最新版本`"jszip": "^3.10.1"`，在次检查依赖树
``` bash
npm ls core-js # 查看依赖树
```

``` log
xdqx-vuemapbox-project@0.0.0 E:\GIT\mapbox+vue
`-- (empty)
```

依赖树中`core-js`已不存在了，`jszip`当前版本不在关联`core-js`



# 告警二：node版本
``` log
(node:19252) [DEP0060] DeprecationWarning: The `util._extend` API is deprecated. Please use Object.assign() instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
```

这个警告表示您使用的 `util._extend` API 已经被 `Node.js` 弃用，需要替换为标准的 `Object.assign()` 方法。

使用的`node --trace-deprecation your-script.js`命令查看信息
``` log
node:internal/modules/cjs/loader:1386
  throw err;
  ^

Error: Cannot find module 'E:\SVN\qinghai_vue\your-script.js'
    at Function._resolveFilename (node:internal/modules/cjs/loader:1383:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1025:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1030:22)
    at Function._load (node:internal/modules/cjs/loader:1192:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:237:24)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)
    at node:internal/main/run_main_module:36:49 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v22.19.0
```
‌**主要作用‌：**
- 当代码中使用已弃用的 API 时，会显示完整的堆栈跟踪
- 明确指出哪个文件、哪行代码触发了弃用警告
- 便于开发者快速找到需要更新的代码位置
**‌其他相关命令‌：**
- `node --no-deprecation` - 完全禁用弃用警告
- `node --throw-deprecation` - 遇到弃用 API 时抛出错误
- `node --trace-warnings` - 显示所有警告的堆栈跟踪
**‌实际应用场景‌：**
- 当你看到类似 `(Use 'node --trace-deprecation ...' to show where the warning was created)` 的提示时，使用此命令就能看到完整的调用路径。
