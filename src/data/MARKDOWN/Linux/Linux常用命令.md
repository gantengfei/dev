# ➤ 常用命令

**当前目录文件大小**
``` bash
[root@localhost ~]$ du -sh
```

**当前目录路径**
``` bash
[root@localhost ~]$ pwd
```





# ➤ 查看各分区使用情况

`df`命令可以显示目前所有文件系统的可用空间及使用情形
``` bash
[root@localhost ~]$ df -h
```
| 文件系统   | 容量 | 已用 | 可用  | 已用% | 挂载点     |
| :--------- | :--- | :--- | :---- | :---- | :--------- |
| Filesystem | Size | Used | Avail | Use%  | Mounted on |
| devtmpfs   | 16G  | 0    | 16G   | 0%    | /dev       |
| tmpfs      | 16G  | 672K | 16G   | 1%    | /dev/shm   |


# ➤ 查看系统内存使用信息

`free`命令显示内存的使用信息。默认按照k（b）的计数单位统计。

`free -g`:以G为单位来显示内存的信息
``` bash
[root@localhost ~]$ free -g
```
![输入图片说明](./src/img/images/941a6396_4993153.png "")

> total：表示 总计物理内存的大小。 \
> used：表示 已使用多少。 \
> free：表示 可用内存多少。 \
> Shared：表示多个进程共享的内存总额。 \
> Buffers/cached：表示 磁盘缓存的大小。

## 查看当前文件夹下所有文件和子文件夹大小命令
``` bash
du -h --max-depth=1
```
`du` (disk usage) 是一个计算文件和文件夹大小的命令。 \
`-h` (human-readable) 选项使输出更具可读性，以 KB、MB、GB 等单位显示大小。 \
`--max-depth=1` 选项限制了显示的子目录层次深度，仅显示当前目录下的文件和子目录的大小。 \
查看所有子目录的大小而不限制深度，可以使用：`du -h `


# ➤ 文件
## ◆ 压缩解压
### .zip
**压缩**
``` bash
[root@localhost ~]$ zip -r filename.zip filename
```
**解压**
``` bash
[root@localhost ~]$ unzip -o filename.zip
```

### .tar.gz
**压缩**
``` bash
[root@localhost ~]$ tar -zcvf filename.tar.gz filename
```
**解压**
``` bash
[root@localhost ~]$ tar -zxvf filename.tar.gz
```

## ◆ 创建文件夹
``` bash
[root@localhost ~]$ mkdir newFileName
```
> ## mkdir命令语法
> `mkdir [option]` \
> `-m` 选项用于手动配置所创建目录的权限，而不再使用默认权限 \
> `-p` 选项递归创建所有目录
>
> 以创建 `/home/test/demo` 为例，在默认情况下，需要一层一层的创建各个目录，而使用 `-p` 选项，则系统会自动帮创建 `/home`、`/home/test` 以及 `/home/test/demo`

## ◆ 删除文件/文件夹
**删除文件**
``` bash
[root@localhost ~]$ rm -f filename.zip
```
``` bash
[root@localhost ~]$ rm -f /x/xx/xxx/filename.zip
```
**删除文件夹**
``` bash
[root@localhost ~]$ rm -rf filename
```
``` bash
[root@localhost ~]$ rm -rf /x/xx/xxx/filename/
```
**删除文件夹：** `sudo`命令以系统管理者的身份执行指令
``` bash
[root@localhost ~]$ sudo rm -rf filename
```
``` bash
[root@localhost ~]$ sudo rm -rf /x/xx/xxx/filename/
```

## ◆ 拷贝并重命名
``` bash
[root@localhost ~]$ cp -r filename newfilename
```
> ## cp命令语法
> `cp [options]` \
> `-a` 通常在复制目录时使用，它保留链接，文件属性，并复制目录下所有的内容 \
> `-f` 覆盖已经存在的目标文件而不给出提示 \
> `-i` 覆盖目标文件之前给出提示，若用户回复y则确认覆盖 \
> `-p` 除复制文件的内容外，还把修改时间和访问权限也复制到新文件中 \
> `-r` 复制目录下的所有子目录和文件 \
> `-d` 如果来源文件为连结档，就复制连结档属性 \
> `-l` 创建链接文件而不复制 \
> `-a` 相当于`-p`,`-d`,`-r`三条命令一起的意思 \
> `-s` 复制为快捷方式 \
> `-u` 如果复制文件a比b新才复制

## ◆ 拷贝到指定目录
``` bash
[root@localhost ~]$ cp filename /home/code_temp/
```

## ◆ 文件重命名
`mv`命令是Linux系统中用于重命名文件的常用命令，它可以实现将一个文件或者目录重命名为另一个文件或者目录，也可以将文件或者目录移动到另一个位置。
> ## mv命令语法
> `mv [options]` \
> `-i` 在覆盖现有文件之前，要求用户进行确认 \
> `-f` 强制覆盖现有文件 \
> `-v` 显示详细的处理信息

**文件夹重命名**
``` bash
[root@localhost ~]$ mv filename/ newfilename
```
**文件重命名**
``` bash
[root@localhost ~]$ mv filename.txt newfilename.txt
```
**文件移动到指定目录**
``` bash
[root@localhost ~]$ mv filename.txt /home/test
```
> ## WARN
> * 使用 `mv` 命令时要小心，特别是当目标文件或目录已经存在时。除非使用 `-i` 选项，否则 `mv` 会无提示地覆盖目标文件或目录。
> * `mv` 命令不仅可以用于移动文件，还可以用于重命名文件或目录。
> * 当使用 `mv` 命令移动文件或目录时，源文件或目录将被删除，而目标文件或目录将包含源文件或目录的内容。这意味着 `mv` 实际上是在文件系统中重新定位文件或目录，而不是复制它们。





# ➤ 防火墙
**查看防火墙状态**
``` bash
[root@localhost ~]$ firewall-cmd --state
```
**启动防火墙**
``` bash
[root@localhost ~]$ systemctl start firewalld
```
**查看现有的规则**
``` bash
[root@localhost ~]$ iptables -nL
```
**查询8080端口是否开放**
``` bash
[root@localhost ~]$ firewall-cmd --query-port=8080/tcp
```
**开放8080端口**
``` bash
[root@localhost ~]$ firewall-cmd --permanent --add-port=8080/tcp
```
**移除8080端口**
``` bash
[root@localhost ~]$ firewall-cmd --permanent --remove-port=8080/tcp
```
**重启防火墙** ⭐
``` bash
[root@localhost ~]$ firewall-cmd --reload
```




# ➤ 查看开机时间、运行时长、关机时间和重启时间
**查看Linux最后一次启动时间**
如果您要查看 Linux 系统最后一次的启动时间，可以使用 `who` 命令的 `-b` 参数，它可以通过「终端」获取确切的日期和时间：
``` bash
[root@localhost ~]$ who -b
```
**查看Linux重启日期**
使用 `last` 命令，您可以列出 Linux 系统的重启日期和时间：
``` bash
[root@localhost ~]$ last -x reboot
```
**查看Linux最后一次重启日期**
如果输出内容太多，只想显示 Linux 最后一次重启日期，可以通过管道输出给 `head` 命令，通过 `-1` 参数只输出一行，或 `-2` 来输出两行：
``` bash
[root@localhost ~]$ last -x reboot | head -1
```

**查看Linux关机日期**
同样，我们可以通过 `last` 命令来查看 Linux 系统的关机日期和时间：
``` bash
[root@localhost ~]$ last -x shutdown
```

**通过管道来查看最后一次关机时间**
``` bash
[root@localhost ~]$ last -x shutdown | head -1
```

**查看Linux运行时长**
如果您想了解 Linux 系统的运行时长，可以在「终端」中命令 `uptime` 命令的 `-p` 参数来获取 Linux 运行的天数、小时和分钟数：
``` bash
[root@localhost ~]$ uptime -p
```




# ➤ Nginx
**查看Nginx安装目录**
``` bash
[root@localhost ~]$ whereis nginx
```
**进入路径**
``` bash
[root@localhost ~]$ cd /usr/local/nginx/
```
**启动Ngin命令**
``` bash
[root@localhost ~]$ cd sbin/
[root@localhost ~]$ ./nginx
```
**停止Nginx命令**
``` bash
[root@localhost ~]$ ./nginx -s stop
```
**重启Nginx命令**
``` bash
[root@localhost ~]$ ./nginx -s reload
```
**查看Nginx状态**

`ps -ef`‌ 采用标准格式输出 `UID`、`PID`、`PPID`、`C` 等列，信息更详细但可读性稍差。
``` bash
[root@localhost ~]$ ps -ef|grep nginx
```

`‌ps aux`‌ 采用 `BSD` 风格输出，包含 `USER`、`%CPU`、`%MEM`、`VSZ`、`RSS` 等列，适合快速查看进程资源占用情况。
``` bash
[root@localhost ~]$ ps aux|grep nginx
```

**关闭Nginx命令**
``` bash
[root@localhost ~]$ kill -9 主进程号
```




# ➤ `vim`命令
## 普通模式
1.一般命令模式 \
打开或新建文件，并将光标置于第一行首
``` bash
[root@localhost ~]$ vim filename
```

## 编辑模式
1.**进入编辑模式** \
`i` 进入编辑模式

键盘`ESC`键，退出编辑模式，返回到一般命令模式

2.**退出编辑器** \
`:wq!` 保存当前文件并退出 \
`:q!` 不保存，强制退出
