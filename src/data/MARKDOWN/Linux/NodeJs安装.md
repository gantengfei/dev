
# 离线安装 NodeJs

NodeJs安装包下载地址：<https://nodejs.org/en/download/>

常用的 `centos7.*` 系统，对应**nodejs 14**版本 `node-v14.21.3-linux-x64.tar.xz` 。

将 `node-v14.21.3-linux-x64.tar.xz` 文件上传至 `/usr/local` 目录下，并解压

``` bash
# 切换至/usr/local下
cd /usr/local

# 解压文件
tar -xvf node-v14.21.3-linux-x64.tar.xz

# 添加至系统变量
vim /etc/profile

# 开启编辑状态 键盘 i 键

# 添加内容
export NODEJS_HOME = /usr/local/node-v14.21.3-linux-x64
export PATH = ${NODEJS_HOME}/bin:${PATH}

# 退出编辑状态 键盘 ESC 键

# 保存并退出
:wq!

# 刷新环境变量
source /etc/profile

# 创建软连接
ln -s /usr/local/node-v14.21.3-linux-x64/bin/node /usr/local/bin
ln -s /usr/local/node-v14.21.3-linux-x64/bin/npm /usr/local/bin

# 检查安装成功
node -v
npm -v
```
