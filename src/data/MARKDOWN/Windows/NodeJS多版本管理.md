> `nvm`全称 Node Version Manager,是一款NodeJS版本管理工具，可 `方便的安装、切换不同版本的NodeJS` \
> `nvm` 默认只支持 Linux 和 OS X，不支持 Windows，针对 Windows 操作系统可使用 nvm-windows

# 安装步骤
1.下载安装包 https://github.com/coreybutler/nvm-windows/releases （Windows为例） \
2.获得windows安装包 `nvm-setup.exe` \
3.双击安装，需要设置两个路径 \
第一次设置NVM的安装路径，也是后续安装不同NodeJS的路径 （eg: D:\Program Files\nvm） \
第二次设置切换不同版本时系统链接的路径 （eg: D:\Program Files\nodejs） \
4.安装完成后，打开cmd窗口，执行 `nvm -version` 检验是否安装成功
![输入图片说明](https://foruda.gitee.com/images/1701048596682756590/d8d2d97a_4993153.png "屏幕截图")

# 参数设置
设置国内镜像，nvm安装目录下的settings.txt (eg: D:\Program Files\nvm\settings.txt)
```
root: D:\Program Files\nvm
path: D:\Program Files\nodejs

# 增加国内镜像地址配置
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

# 使用说明
**查看可安装的NodeJS**
``` bash
nvm list available
```
![输入图片说明](https://foruda.gitee.com/images/1701048644090825897/22f61adf_4993153.png "屏幕截图")

**安装指定版本**
``` bash
nvm install 10.24.1

nvm install 16.20.2
```
![输入图片说明](https://foruda.gitee.com/images/1701048695837320952/82266047_4993153.png "屏幕截图")

**查看已安装的版本**
``` bash
nvm list
```
![输入图片说明](https://foruda.gitee.com/images/1701048716503595099/0afdf848_4993153.png "屏幕截图")

**切换版本**
``` bash
nvm use 10.24.1

nvm use 16.20.2
```
![输入图片说明](https://foruda.gitee.com/images/1701048749342413460/84878009_4993153.png "屏幕截图")

**查看npm版本**
``` bash
npm -v
```
版本没有切换时会出现
> 'npm' 不是内部或外部命令，也不是可运行的程序或批处理文件。

![输入图片说明](https://foruda.gitee.com/images/1701048774937266401/1cc40872_4993153.png "屏幕截图")

