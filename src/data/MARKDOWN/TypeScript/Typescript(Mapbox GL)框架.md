# Typescript+Mapbox GL框架 开发环境

## 一、环境安装
### 1. Node.js安装
> 已安装 `16.0` 或更高版本的 `Node.js` \
> 可通过 *`nvm`* / *`fnm`* 命令管理多个`node`版本 `^10.0.0` `^16.0.0` `^20.0.0`

``` bash
# 检查是否已安装 Node.js
node -v
```

### 2. Typescript安装@2.7.2

``` bash
# 删除typescript
npm uninstall -g typescript
# 安装2.7.2版本
npm install -g typescript@2.7.2
# 查看版本
tsc -v
# Version 2.7.2
```

### 3. SASS 环境安装
1. 安装ruby [（RubyInstaller）](https://rubyinstaller.org/) `rubyinstaller-2.6.3-1-x64.exe`
2. 全局安装compass

``` bash
# 检查安装的Ruby
ruby -v
# ruby 2.6.3p62 (2019-04-16 revision 67580) [x64-mingw32]

# RubyGems 是 Ruby 的包管理工具。检查是否已安装。
gem -v
# 3.0.3

# 安装 Compass 和其它依赖
gem install compass

# 检查安装的compass
compass -v
# Compass 1.0.3 (Polaris)
# Copyright (c) 2008-2025 Chris Eppstein
# Released under the MIT License.
# Compass is charityware.
# Please make a tax deductable donation for a worthy cause: http://umdf.org/compass

# 检查安装的sass
sass -v
# Sass 3.4.25 (Selective Steve)
```
> ## WARNING
> **注意**：*sass编译时中文目录报错，建议修改英文目录;*

---

## 二、VS Code 扩展&配置

### 1. 扩展安装
#### 1.1. EditorConfig for VS Code

> ## TIP
> 统一编码风格 \
> 框架中使用到 .editorconfig 配置
``` ini
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

> ## TIP
> 修改注释颜色插件

``` log
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
显示效果如下图所示： \
![输入图片说明](https://foruda.gitee.com/images/1693623215823932625/1a1ab335_4993153.png "")

### 2. 配置settings.json

> ## TIP
> 设置 → 打开设置(settings.json)

**设置-配置JSON参考** `settings_v20241030`
``` JSON
{
  "workbench.colorTheme": "Monokai", // 颜色主题
  "workbench.iconTheme": "vscode-icons", // 文件夹图标
  "editor.minimap.enabled": false, // 控制是否显示缩略图
  "update.enableWindowsBackgroundUpdates": false,

  // ↓↓↓ background 的相关配置 START ↘↘↘↘↘↘↘↘↘↘
  "background.enabled": true,
  "background.editor": {
    "useFront": true,
    "style": {
      "background-position": "center bottom",
      "background-size": "auto",
      "opacity": 0.1
    },
    "styles": [
      {},
      {
        "background-position": "right -80px bottom",
        "background-size": "400px auto",
        "opacity": 0.1
      },
      {
        "background-position": "right -80px bottom",
        "background-size": "400px auto",
        "opacity": 0.1
      }
    ],
    "images": [
      "file:///D:/Program Files/visualbgimg/03.png",
      "file:///D:/Program Files/visualbgimg/01.png",
      "file:///D:/Program Files/visualbgimg/02.png"
    ],
    "interval": 0,
    "random": false
  },
  "background.panel": {
    "images": ["file:///D:/Program Files/visualbgimg/05.jpg"],
    "opacity": 0.1,
    "size": "cover",
    "position": "center",
    "interval": 0,
    "random": false
  },
  // background 的相关配置 END ↖↖↖↖↖↖↖↖↖↖

  "workbench.startupEditor": "none",

  "liveServer.settings.donotShowInfoMsg": true,
  "liveServer.settings.donotVerifyTags": true,

  "color-highlight.markRuler": false,
  // "editor.codeActionsOnSave": null,
  // ycy.reminderViewIntervalInMinutes: 展示提醒页面的时间间隔（分钟）。 (默认值为60)

  // 保存less 输出.wxss文件
  "less.compile": {
    "compress": true, //是否压缩
    "sourceMap": false, //是否生成map文件，设置为"true"时可以在调试台看到less行数
    // "main": ["a.less","b.less"],
    "out": true, //是否输出css文件，false为不输出
    // "out": "${workspaceRoot}\\css\\com",
    // "outExt": ".min.css",
    // "outExt": ".wxss", //输出文件的后缀，小程序可以写为"wxss"  ✔
    // out 为true时，输出文件在当前目录, 也可以指定输出目录
    // main 为指定文件可以上 "a.less", 多个用数组的方式 ["a.less", "b.less"]
  },

  "[css]": {
    "editor.defaultFormatter": "Wscats.eno"
  },
  "[scss]": {
    "editor.defaultFormatter": "HookyQR.beautify"
  },
  "[less]": {
    "editor.defaultFormatter": "Wscats.eno"
  },
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[typescript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  },
  "files.associations": {
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript"
  },
  "emmet.includeLanguages": {
    "wxml": "html"
  },
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  },

  // Vuejs > Vue2
  // "vetur.format.defaultFormatterOptions": {
  //   "prettier": {
  //     "semi": false,
  //     "singleQuote": true
  //   }
  // },
  // "minapp-vscode.disableAutoConfig": true,

  // 保存自动格式化
  // "editor.formatOnType": true,
  // "editor.formatOnSave": true,

  // ↓↓↓ .html 属性文件 START ↘↘↘↘↘↘↘↘↘↘
  "html.format.wrapAttributes": "preserve",
  "html.format.wrapLineLength": 0,
  // ↑↑↑.html 属性文件 END ↖↖↖↖↖↖↖↖↖↖

  "typescript.updateImportsOnFileMove.enabled": "never",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "vsicons.dontShowNewVersionMessage": true,

  // ↓↓↓ .bin 属性文件 START ↘↘↘↘↘↘↘↘↘↘
  "workbench.editorAssociations": {
    "*.zip": "default",
    "*.bin": "hexEditor.hexedit"
  },
  "hexeditor.columnWidth": 20,
  "hexeditor.showDecodedText": true,
  "hexeditor.defaultEndianness": "little",
  "hexeditor.inspectorType": "aside",
  // ↑↑↑ .bin 属性文件 END ↖↖↖↖↖↖↖↖↖↖

  "workbench.editor.empty.hint": "hidden",
  "RainbowBrackets.depreciation-notice": false,

  "diffEditor.ignoreTrimWhitespace": false, // 差异编辑器将忽视前导空格或尾随空格中的更改

  "editor.unicodeHighlight.invisibleCharacters": false,
  "editor.unicodeHighlight.ambiguousCharacters": false,
  "security.workspace.trust.untrustedFiles": "open",
  "wulingshan.biqugeConfig": "H:\\txt\\biquge.config.json",
  "z-reader.fileDir": "H:\\TXT",
  "chat.commandCenter.enabled": false,
  "deepseek.lang": "cn",
}
```
