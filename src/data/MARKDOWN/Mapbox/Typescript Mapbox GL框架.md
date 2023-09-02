# Typescript+Mapbox GL框架 开发环境

## 一、环境安装
### 1. Typescript安装@2.7.2

``` bash
# 删除typescript
npm uninstall -g typescript
# 安装2.5.2版本
npm install -g typescript@2.7.2
# 查看版本
tsc -v
```

### 2. SASS 环境安装
1. 安装ruby [（RubyInstaller）](https://rubyinstaller.org/)
2. 全局安装compass
``` bash
gem install compass
```
**注意**：*sass编译时中文目录报错，建议修改英文目录;*

---

## 二、VS Code 扩展&配置

### 1. 扩展安装
#### 1.1. EditorConfig for VS Code
> 统一编码风格 \
> 框架中使用到 .editorconfig 配置
```
# https://editorconfig.org

root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

#### 1.2. Better Comments
> 修改注释颜色插件

![输入图片说明](https://foruda.gitee.com/images/1693623215823932625/1a1ab335_4993153.png "屏幕截图")
``` JavaScript
/**
 * 多行注释
 * * 浅绿色注释
 * ! 红色注释
 * ? 蓝色注释
 * TODO 橘红色注释
 * // 灰色删除线注释
 * @param myParam
 */

// 单行注释
// * 浅绿色注释
// ! 红色注释
// ? 蓝色注释
// TODO 橘红色注释
// // 灰色删除线注释
```

### 2. 配置settings.json
> 设置 → 打开设置(json)

#### 2.1 保存自动格式化
``` Json
// 保存自动格式化
"editor.formatOnType": true,
"editor.formatOnSave": true
```
