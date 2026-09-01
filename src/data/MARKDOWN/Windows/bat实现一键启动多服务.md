**window** 实现一键启动以下三个服务，通过编写一个 `.bat` 批处理脚本来完成

1、启动 **Nginx** \
目录：`D:\nginx-1.28.0\nginx.exe`

2、启动 **Geoserver** \
目录：`D:\geoserver-2.16.1\bin\startup.bat`

3、启动 **jar** 服务 \
目录：`D:\wave_radar\wave_radar-0.1.jar` \
在 **cmd** 中启动命令 `java -jar wave_radar-0.1.jar`

# 一键启动脚本代码

新建一个文本文件（例如 `start_services.txt`），将以下代码复制进去，然后将文件后缀名改为 `.bat`（例如 `start_services.bat`）：

``` bat @start_services.bat
@echo off
echo ==============================================
echo 正在一键启动所有服务，请稍候...
echo ==============================================

:: 1. 启动 Nginx
echo [1/3] 正在启动 Nginx...
start "Nginx Service" /d "D:\nginx-1.28.0" cmd /k "nginx.exe"

:: 2. 启动 GeoServer
echo [2/3] 正在启动 GeoServer...
start "GeoServer" /d "D:\geoserver-2.16.1\bin" cmd /k "startup.bat"

:: 3. 启动 wave_radar Java 服务
echo [3/3] 正在启动 wave_radar 服务...
start "WaveRadar Java" /d "D:\wave_radar" cmd /k "java -jar wave_radar-0.1.jar"

echo ==============================================
echo 所有服务启动命令已发送，各服务将在独立窗口中运行。
echo ==============================================
pause
```

双击运行您创建好的 `.bat` 文件，即可实现三个服务的一键并行启动。

在服务器环境中长期运行这些服务，建议为 Java 服务（wave_radar-0.1.jar）添加内存限制参数。如果不加限制，Java 可能会占用过多内存导致系统卡顿或被 Windows 强制结束进程。
您可以将脚本中第 3 步的启动命令修改为如下形式（以分配 512M 初始内存和 2G 最大内存为例）：

``` bat
start "WaveRadar Java" /d "D:\wave_radar" cmd /k "java -Xms512m -Xmx2g -jar wave_radar-0.1.jar"
```

## 代码原理解析

- 1.`@echo off` ：关闭命令回显，让启动界面更加整洁，不显示冗余的代码执行过程。
- 2.`start "窗口标题" /d "工作目录" cmd /k "执行命令"` ：这是实现多服务同时启动的核心命令。
- &emsp; `"窗口标题"`：为每个服务分配一个独立的 CMD 窗口标题，方便在任务栏区分和管理。
- &emsp; `/d "工作目录"`：指定程序运行的工作目录。这对于 Java 服务（加载 jar 包）和 GeoServer 尤为重要，能避免因路径问题导致的启动失败。
- &emsp; `cmd /k`：表示执行完命令后保留窗口，这样您可以随时在对应的窗口中查看 Nginx、GeoServer 或 Java 服务的实时运行日志。
- 3.`pause：`脚本执行完毕后暂停，防止窗口一闪而过，方便您确认所有启动命令是否都已成功发送。

## 启动方式

- `cmd /k` 保留窗口
- `start /min` 最小化运行
- 直接后台运行

``` bat
:: 1. 启动 Nginx (后台静默运行，不保留窗口)
echo [1/3] 正在启动 Nginx...
start "" /min /d "D:\nginx-1.28.0" nginx.exe
```
