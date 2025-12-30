# 基本用法

`echo` 命令的基本用法非常简单

``` bash
echo "Hello, World!"
```
![输入图片说明](./src/img/images/6381f5f4_4993153.png "")

加上选项 `-e` 可以支持转义字符，例如换行符 `\n` 和制表符 `\t`：

``` bash
echo -e "Hello,\nWorld!"
```
![输入图片说明](./src/img/images/6be1faea_4993153.png "")

# 使用 ANSI 转义序列为文字添加颜色

ANSI 转义序列是一种控制终端文本显示样式的方法。可以通过 `echo` 输出这些转义序列来改变文字颜色、背景颜色、添加下划线等。

## 常见的 ANSI 转义序列格式

``` bash
echo -e "\033[<style>;<text color>;<background color>m<your text>\033[0m"
```

- `\033[` ：表示开始转义序列。
- `<style>` ：文字样式（如粗体、下划线）。
- `<text color>` ：文字颜色。
- `<background color>` ：背景颜色。
- `m`：结束样式设置。
- `\033[0m`：重置样式。

## 文字颜色代码

| 颜色 | 前景色代码 | 背景色代码 |
| :--- | :--------- | :--------- |
| 黑色 | 30         | 40         |
| 红色 | 31         | 41         |
| 绿色 | 32         | 42         |
| 黄色 | 33         | 43         |
| 蓝色 | 34         | 44         |
| 品红 | 35         | 45         |
| 青色 | 36         | 46         |
| 白色 | 37         | 47         |


## 文字样式代码

| 样式     | 代码 |
| :------- | :--- |
| 默认样式 | 0    |
| 粗体     | 1    |
| 下划线   | 4    |
| 闪烁     | 5    |
| 反显     | 7    |
| 隐藏     | 8    |

### 红色文字

``` bash
echo -e "\033[31m这是红色文字\033[0m"
```
![输入图片说明](./src/img/images/bf3fb834_4993153.png "")

### 绿色文字 + 黄色背景

``` bash
echo -e "\033[32;43m绿色文字黄色背景色\033[0m"
```
![输入图片说明](./src/img/images/85f239db_4993153.png "")

### 加粗蓝色文字

``` bash
echo -e "\033[1;34m蓝色粗体\033[0m"
```
![输入图片说明](./src/img/images/6af76e67_4993153.png "")

### 闪烁的红色文字

``` bash
echo -e "\033[5;31m闪烁的红色文字\033[0m"
```
![输入图片说明](./src/img/images/15ac7896_4993153.png "")

## example
**newqhdl.sh**
``` bash
#!/bin/bash
if [ -e qhdl.zip ];then

timestr=$(date +%Y%m%d%H%M%S)
log_file="qhdl_${timestr}.tar.gz"
tar -zcvf ${log_file} qhdl

mv ${log_file} /home/webbak/

rm -rf qhdl

unzip qhdl.zip

rm -rf qhdl.zip

echo -e "\033[1;32m系统部署成功：`date +"%Y-%m-%d %H:%M:%S"`\033[0m"

else

echo -e "\033[1;31m系统部署-qhdl.zip-不存在\033[0m"

fi
```
