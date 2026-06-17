
# ➤ Git 强制区分文件名的大小写

执行 `git config core.ignorecase false` 命令的作用是让 **Git** 强制区分文件名的大小写（即 FOO.txt ≠ foo.txt）。

默认情况下，**Git** 会根据操作系统的文件系统特性来决定是否区分大小写。 \
例如，在 **Windows (NTFS)** 和 **macOS (APFS/HFS+)** 上，**Git** 默认是忽略大小写的；而在 **Linux** 上则是区分的。

> ## NOTICE
> 在 **Windows** 或 **macOS** 等不区分大小写的文件系统上，手动将此选项设置为 `false` 可能会导致严重问题。\
> 由于底层文件系统无法真正区分大小写，强行让 **Git** 区分大小写可能会导致混淆错误、错误冲突、文件覆盖或产生重复文件。


░ **配置方式**

**1.仅对当前仓库生效**
``` bash
git config core.ignorecase false
```

*⚠️ 不使用命令修改* \
打开项目根目录下的隐藏文件夹 `.git`，找到里面的 `config` 文件。
``` conf @config
[core]
    ignorecase = false
```


这样可以避免影响你电脑上的其他项目。

**2.全局生效（所有 Git 仓库）**
``` bash
git config --global core.ignorecase false
```
这会让你电脑上所有的 **Git** 仓库都强制区分大小写。

> ## TIP
> - **Windows/macOS 用户：**通常建议保持默认设置（即 `core.ignorecase = true`），不要手动修改。跨平台协作时，尽量使用全小写命名文件，避免仅靠大小写来区分不同的文件。
> - **Linux/WSL 用户：**这些系统本身支持区分大小写，通常无需手动修改此配置。

