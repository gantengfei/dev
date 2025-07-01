vue项目通过使用.sh文件自动化打包备份及部署。

----

**青海短临系统部署为例：**
- 1.在`/home/apps`文件夹中配置`newqhdl.sh`文件；
- 2.Xftp上传qhdl.zip系统新包到`/home/apps`中；
- 3.Xshell中命令如下：

``` bash
# 进入指定目录
cd /home/apps
# 运行.sh文件
sh newqhdl.sh
```

----

`newqhdl.sh`文件内容注解：（qhdl为青海短临系统）
``` bash
# 1.系统时间格式化
timestr=$(date +%Y%m%d%H%M%S)
# 2.命名即将打包备份的压缩包文件名
log_file="qhdl_${timestr}.tar.gz"
# 3.将服务器中当前系统版本打包备份
tar -zcvf ${log_file} qhdl
# 4.将备份包文件移动到指定目录存储（非必须放在指定目录，可以直接备份到当前目录去掉mv代码）
mv ${log_file} /home/apps/webbak/
# 5.删除当前系统文件夹
rm -rf qhdl
# 6.解压上传的系统新包（系统部署完成）
unzip qhdl.zip
# 7.删除上传的新包
rm -rf qhdl.zip
```

----

`newqhdl.sh`文件
``` bash
#!/bin/bash
if [ -e qhdl.zip ];then

timestr=$(date +%Y%m%d%H%M%S)
log_file="qhdl_${timestr}.tar.gz"
tar -zcvf ${log_file} qhdl

mv ${log_file} /home/apps/webbak/

rm -rf qhdl

unzip qhdl.zip

rm -rf qhdl.zip

echo -e "\033[1;32m短临系统部署成功：`date +"%Y-%m-%d %H:%M:%S"`\033[0m"

else

echo -e "\033[1;31m短临系统部署-qhdl.zip-不存在\033[0m"

fi

```
