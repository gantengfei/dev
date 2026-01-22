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
