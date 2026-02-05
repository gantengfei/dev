
# Gitee仓库镜像到Github仓库发布部署

## ❑ Gitee仓库镜像管理

1.在[Gitee](https://gitee.com/)项目中 ➜ 「**管理**」 ➜ 「**仓库镜像管理**」

![输入图片说明](./src/img/images/2026-02-05_14-39-18.png "")

2.「**添加镜像**」

![输入图片说明](./src/img/images/2026-02-05_14-44-54.png "")

3.「**配置镜像**」

- ✅ 镜像方向：Push Gitee➜Github
- ✅ 镜像仓库: 选择Github上的镜像到的仓库位置
- ✅ 私人令牌：···私人令牌···

![输入图片说明](./src/img/images/2026-02-05_14-46-45.png "")

## ❑ 申请 GitHub 私人令牌

- 1.登录与 [Gitee](https://gitee.com/) 绑定的 [GitHub](https://github.com/) 帐号；
- 2.通过路径「**用户头像**」→「**Settings**」进入「**Developer setting**」；
- 3.选择「**Personal access tokens**」选项后点击「**Tokens(classic)** 」；

![输入图片说明](./src/img/images/2026-02-05_15-08-44.png "")

- 4.「**Note**」字段可以随意填写；例如，*Gitee_Mirror*；
- 5.「**Select scopes**」字段请根据你的需求进行勾选；

- &emsp;● `repo` 字段为必选字段，请您直接勾选；
- &emsp;● `admin:repo_hook` 字段为可选字段，用于自动生成 webhook；
> 当需要 Gitee 自动从 GitHub 同步仓库时，建议勾选 `admin:repo_hook` 字段。

![输入图片说明](./src/img/images/2026-02-05_15-05-12.png "")

- 6.点击「**Generate token**」生成私人令牌；

## ❑ Github Pages 发布/部署网站

- 1.点击 「**Settings**」，在左边菜单 「**Code and automation**」 下找到 「**Pages**」
- 2.在 **Branch** 下选项中选择「`main`」，然后点击 「**Save**」
- 3.页面的顶部将显示发布后的网站的地址，点击 「**Visit site**」 就可以看到发布后的网站内容

![输入图片说明](./src/img/images/2026-02-05_15-35-12.png "")
