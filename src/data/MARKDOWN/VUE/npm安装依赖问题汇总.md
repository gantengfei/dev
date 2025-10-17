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
