
# 问题：禁止运行脚本
## 错误提示
``` powershell
PS D:\Lenovo\Desktop\新建文件夹> npm install -g typescript@2.7.2

changed 1 package in 990ms
PS D:\Lenovo\Desktop\新建文件夹> tsc -v
tsc : 无法加载文件 D:\Program Files\nodejs\tsc.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsof
t.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
+ tsc -v
+ ~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

## 错误原因
出于安全考虑，**Windows PowerShell** 默认禁止运行本地脚本（包括 npm 安装的全局命令生成的 `.ps1` 脚本文件）。你刚刚安装的 `typescript` 在 `D:\Program Files\nodejs\` 下生成了 `tsc.ps1`，但系统策略阻止了它的运行。

## 解决办法
你需要更改 **PowerShell** 的执行策略。最常用且安全的设置是 `RemoteSigned`（允许运行本地脚本，但要求从互联网下载的脚本必须有签名）。

以后都能正常使用 **npm** 安装的全局命令（如 `tsc`, `vue`, `ng` 等），请以管理员身份运行 **PowerShell** 并执行以下命令：

**1.打开管理员终端：**
- &emsp;● 点击开始菜单，搜索 "PowerShell"。
- &emsp;● 右键点击 "Windows PowerShell"，选择 "以管理员身份运行"。
**2.执行命令：**
- 复制并粘贴以下命令，按回车：

``` powershell
Set-ExecutionPolicy RemoteSigned
```

**3.确认更改：**
- 系统会提示你确认是否更改策略，输入 `Y` 或 `A` 然后按回车。
**4.验证：**
- 关闭所有 **PowerShell** 窗口，重新打开一个新的（不需要管理员权限），然后运行：

``` powershell
tsc -v
```

- 此时应该能正常显示 TypeScript 版本（v2.7.2）。
