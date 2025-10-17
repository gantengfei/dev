# 什么是 Visual Studio 的 GitHub Copilot 补全？
[什么是 Visual Studio 的 GitHub Copilot 补全？](https://learn.microsoft.com/zh-cn/visualstudio/ide/visual-studio-github-copilot-extension?view=visualstudio)

Visual Studio 中的 GitHub Copilot 可增强 Visual Studio 中的 AI 辅助开发，帮助你在编写代码时更加高效。

在本文中，你将了解 Copilot 补全，它是 AI 支持的配对程序员，适用于 Visual Studio，可提供上下文感知的代码完成、建议，甚至是整个代码片段。 这个功能强大的工具有助于在 Visual Studio 中进行 AI 辅助开发，可帮助开发人员更高效地编写代码，减少重复任务所用的时间，并最大程度地减少错误。

有关 Visual Studio 中的 GitHub Copilot Chat 的详细信息，请参阅关于 Visual Studio 中的 GitHub Copilot Chat。

## GitHub Copilot 的工作原理

GitHub Copilot 的工作原理是利用先进的机器学习模型，这些模型是在 GitHub 存储库中正式发布的庞大代码数据集上训练的。 当你键入代码时，AI 会分析上下文并实时提供相关建议。 你也可以通过编写自然语言注释来描述要让代码执行的操作，以便接收建议。

此外，你还可以使用 GitHub Copilot 将注释转换为代码、创建单元测试、创建 SQL 查询等。

## 先决条件

若要开始，需要：

- Visual Studio 2022 版本 17.8 或更高版本
- **使用具有 Copilot 访问权限的 GitHub 帐户登录 Visual Studio**
- ** 您可以免费使用 GitHub Copilot。 注册并利用 AI 来更快、更高效地编码。

GitHub Copilot 支持多种编程语言和框架，包括但不限于：C#、C++和 Python。

## 获取适用于 Visual Studio 的 GitHub Copilot

使用 Visual Studio 版本 17.10 或更高版本时， 统一的 GitHub Copilot 扩展 可作为 Visual Studio 安装程序中的推荐组件提供。 默认情况下，它将随所有工作负载一起安装，除非你选择在安装期间排除它。

## 将 GitHub Copilot 用于代码补全和建议

在编辑器中键入代码或注释时，GitHub Copilot 会提供上下文感知的代码补全和建议。 GitHub Copilot 为多种语言提供建议，但特别适用于 Python、JavaScript、TypeScript、Ruby、Go、C# 和 C++。 以下示例是用 C# 语言编写的，但其他语言的工作方式类似。

## 提示和技巧

与完成相关的键盘快捷方式：

- 使用`Alt`+手动触发完成操作，
- 使用 `Alt`+`.`（下一个）和 `Alt`+`,`（上一个）循环切换可用的完成项。
- 按单词部分接受补全, 使用 `Ctrl`+`右箭头键`
- 使用`Ctrl`+`向下箭头键`部分接受每行的完成内容
- 使用设置自定义完成体验：

如果你觉得完成速度过快并中断键入，请转到“**工具**”->”->**“IntelliCode”**->**“高级”**，并在**显示整行完成之前启用“等待暂停”键入**。 此设置会添加一个消抖延迟，因此在快速键入时自动完成不会闪烁和消失。
默认情况下，每次按键都会自动触发补全。 若要禁用自动完成，请转到“**工具**-> ->**IntelliCode** ->**General**”，并在**编辑器中关闭“自动生成代码完成**”。 然后，使用 `Alt`+`，` 手动触发补全。


# Visual Studio Code 安装扩展

![输入图片说明](./src/img/images/2025-09-24_16-06-19.png "")

# Visual Studio Code 使用 GitHub 账号登录

![输入图片说明](./src/img/images/2025-09-24_16-07-15.png "")
