在 **macOS 12（Monterey）**系统上，**Visual Studio Code（VS Code）**官方支持的最高版本取决于微软对操作系统的兼容性要求。

# ➤ VS Code 对 macOS 的最低系统要求

根据 [VS Code 官方文档](https://code.visualstudio.com/docs/supporting/requirements?spm=5176.28103460.0.0.4e127d83jVcopn) 和发布说明：

- ● **VS Code 1.86** 及更高版本 要求 **macOS 13（Ventura）**或更高。
- ● 因此，在 **macOS 12（Monterey）** 上，最后一个兼容的 **VS Code** 版本是 `1.85.x`。

> macOS 12 用户最高可安装 VS Code 1.85.2（或 1.85 的最终 patch 版本）。


# ➤ 防止自动更新到不兼容版本

VS Code 默认会自动更新，这可能导致升级到仅支持 macOS 13+ 的版本，从而无法启动。

**禁用自动更新的方法：**

- 1.打开 **VS Code**。
- 2.进入设置：
- &emsp;● 菜单栏：`Code` → `Preferences` → `Settings`
- &emsp;● 或快捷键：`Cmd + ,`
- 3.搜索 `update mode`
- 4.将 **Update: Mode** 设置为 `none`

``` json
{
  "update.mode": "none"
}
```


# ➤ 验证当前 VS Code 版本

- ● 打开 **VS Code**
- ● 菜单栏：`Code` → `About Visual Studio Code`
- ● 查看版本号是否 **≤** `1.85.2`
