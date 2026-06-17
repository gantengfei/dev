# ➤ Nginx常用命令

## ❑ 查看Nginx安装目录

``` bash
[root@localhost ~]$ whereis nginx
```

## ❑ 启动Ngin命令

``` bash
[root@localhost ~]$ cd /usr/local/nginx/sbin/
[root@localhost sbin]$ ./nginx
```

## ❑ 停止Nginx命令

``` bash
[root@localhost ~]$ ./nginx -s stop
```

## ❑ 重启Nginx命令

``` bash
[root@localhost ~]$ ./nginx -s reload
```

## ❑ 查看Nginx状态

`ps -ef`‌ 采用标准格式输出 `UID`、`PID`、`PPID`、`C` 等列，信息更详细但可读性稍差。
``` bash
[root@localhost ~]$ ps -ef|grep nginx
```

`‌ps aux`‌ 采用 `BSD` 风格输出，包含 `USER`、`%CPU`、`%MEM`、`VSZ`、`RSS` 等列，适合快速查看进程资源占用情况。
``` bash
[root@localhost ~]$ ps aux|grep nginx
```

## ❑ 关闭Nginx命令

``` bash
[root@localhost ~]$ kill -9 主进程号
```


# ➤ Nginx配置

## ❑ 查看Nginx配置

``` bash
[root@localhost ~]$ cd /usr/local/nginx/conf/
[root@localhost conf]$ cat nginx.conf
```

## ❑ vim编辑配置

``` bash
# 进入编辑
[root@localhost ~]$ vim /usr/local/nginx/conf/nginx.conf

# 开启编辑状态 键盘 i 键

# 退出编辑状态 键盘 ESC 键

# 保存
[root@localhost ~]$ :wq! # 键盘 回撤 键：保存当前文件并退出

# 不保存
[root@localhost ~]$ :q! # 键盘 回撤 键：不保存并强制退出

```

## ❑ 静态页面代理配置

``` conf @nginx.conf
location /webName {
	alias /home/apps/webName;
}
```

## ❑ 静态文件代理配置

``` conf @nginx.conf
location /map {
    # add_header Access-Control-Allow-Origin '*';
    # 有效解决跨域（包括404）
    add_header Access-Control-Allow-Origin * always;

    alias /opt/map;
}
```

## ❑ 服务地址代理配置

使用`80`端口访问`8887`端口服务

``` conf @nginx.conf
location /geoserver/ {
  add_header Access-Control-Allow-Origin * always;

  proxy_set_header    X-Real-IP           $remote_addr;
  proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
  proxy_set_header    Host                $http_host;
  proxy_set_header    X-NginX-Proxy       true;
  proxy_set_header    Connection          "";
  proxy_http_version  1.1;
  proxy_connect_timeout 10;
  proxy_send_timeout 30;
  proxy_read_timeout 60;
  proxy_pass http://127.0.0.1:8887/geoserver/;
}
```


# ➤ Nginx安装

Nginx安装包下载地址：<https://nginx.org/en/download.html>

`nginx-1.9.9.tar.gz` 文件上传到 `/usr/local` 目录中。

``` bash
# 切换至/usr/local下
cd /usr/local

# 解压文件
tar -zxvf nginx-1.9.9.tar.gz

# 进入解压目录
cd nginx-1.9.9

# 配置编译参数
./configure --prefix=/usr/local/nginx

# 编译安装
make

# 安装
make install
```

![输入图片说明](./src/img/images/a057eed5-2273-4186-8d94-f95adb31437b.png "")

**检查安装成功**
``` bash
# 进入安装目录
cd /usr/local/nginx

# 检查
./sbin/nginx -t
```

正常情况的信息输出：

![输入图片说明](./src/img/images/f7a8a75a-d885-408d-8b14-d3deed5d8b62.png "")


# ➤ Nginx开机自启动配置

**查看配置**
``` bash
[root@localhost ~]$ cat /etc/rc.d/rc.local
```

**配置自启动**
``` bash
# 进入编辑
vim /etc/rc.d/rc.local

# 开启编辑状态 键盘 i 键

# 添加内容
/usr/local/nginx/sbin/nginx

# 退出编辑状态 键盘 ESC 键

# 保存并退出
:wq!
```

![输入图片说明](./src/img/images/548f6f11-2850-4357-8532-495c3610c065.png "")

> ## NOTICE
> 如果启动不起来写 `sh` 挂定时 \
> **注意：**文件格式 `UNIX`

**启动脚本**
``` bash @nginxStart.sh
#!/bin/bash

ID=`ps -ef | grep nginx  | grep -v "$0" | grep -v "grep" | awk '{print $2}' `
if [[ $ID ]]
then
echo "Running....."
else

nginx

fi
```
