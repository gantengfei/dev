**Codex** 是 **OpenAI** 推出的 **AI** 编程助手

# ➤ 使用 Deepseek 模型

- 1、[**Deepseek 开发平台**](https://platform.deepseek.com/) 创建 **API keys** 复制妥善保存
- 2、**充值** 购买 **Token**
- 3、打开 [**Deepseek API 文档**](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/codex) 左侧列表中 **接入Agent工具** > **Codex**

● 将 **DeepSeek** 配置为模型提供方

**Windows** 用户在 **PowerShell** 中执行：

``` powershell
irm https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.ps1 | iex
```

# ➤ 使用 CC Switch 本地路由工具

因 **Codex 客户端** 默认优先尝试建立 **WebSocket** 连接，而 **DeepSeek** 的接口或当前的网络环境无法稳定支持该通道，导致客户端反复尝试后失败。

## 1、添加 DeepSeek 供应商

- ● 打开 [**CC Switch**](https://cc-switch.cc/) 应用，在顶部切换到 **Codex** 标签页。
- ● 点击右上角的 添加 **（+）** 按钮。
- ● 在弹出的供应商列表中，选择 **DeepSeek**。
- ● 填入你申请到的 **API Key**（以 `sk-` 开头），默认模型选择 `deepseek-v4-pro` 或 `deepseek-v4-flash`。
- ● 点击 **高级选项**，确保上游格式选择为 `Responses (原生)`。
- ● 点击 **添加** 完成配置。

## 2、启用本地路由（解决重连问题的关键）

为了防止 **Codex** 因协议不匹配或 **WebSocket** 冲突而“正在重新连接”，必须开启本地路由功能：
- ● 点击 **CC Switch** 左上角的 **齿轮图标（设置）**。
- ● 选择 **路由** -> **本地路由**。
- ● 打开 **路由总开关**，并勾选启用 **Codex** 路由选项。
- ● **CC Switch** 会在本地启动一个 HTTP 代理（如 `http://127.0.0.1:15721`），自动将 **Codex** 的 **Responses** 请求转换为 **DeepSeek** 兼容的格式。

![输入图片说明](./src/img/images/2026-09-01_09-38-03.png "")

## 3、激活配置并验证

- ● 返回 **CC Switch** 主界面，找到刚刚添加的 **DeepSeek** 供应商，点击右侧的 **启用（Enable）** 按钮。
- ● 彻底重启 **Codex**（关闭终端或桌面应用后重新打开），使新配置生效。
- ● 在 **Codex** 中发起对话，如果不再提示“正在重新连接”并能正常返回结果，即代表配置成功。
