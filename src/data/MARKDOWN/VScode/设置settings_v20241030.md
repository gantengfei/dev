
> ## TIP
> 设置 → 打开设置(settings.json)

**设置-配置JSON** `settings_v20241030`
``` JSON
{
  "workbench.colorTheme": "Monokai", // 颜色主题
  "workbench.iconTheme": "vscode-icons", // 文件夹图标
  "editor.minimap.enabled": false, // 控制是否显示缩略图
  "update.enableWindowsBackgroundUpdates": false,

  // ↓↓↓ background 的相关配置 START ↘↘↘↘↘↘↘↘↘↘
  "background.customImages": [
    "file:///D:/Program Files/visualbgimg/01.png",
    "file:///D:/Program Files/visualbgimg/02.png"
  ],
  "background.style": {
    "content": "''",
    "pointer-events": "none",
    "position": "absolute",
    "z-index": "99999",
    "width": "100%",
    "height": "100%",
    "background-position": "right bottom",
    "background-repeat": "no-repeat",
    "background-attachment": "fixed",
    "background-size": "700px 852px",
    "opacity": 0.1
  },
  "background.useFront": true,
  "background.enabled": true,
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
}
```
