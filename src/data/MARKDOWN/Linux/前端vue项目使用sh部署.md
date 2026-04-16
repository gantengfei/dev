vue项目通过使用.sh文件自动化打包备份及部署。

# 一、部署启动命令
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

# 二、创建`newqhdl.sh`文件

## .zip 部署

``` bash @newqhdl.sh
#!/bin/bash

# ========== 配置区 ==========
SYSTEM_NAME="短临系统"
APP_NAME="qhdl"
ZIP_FILE="${APP_NAME}.zip"
DEST_DIR="/home/apps/${APP_NAME}"
BACKUP_DIR="/home/apps/webbak"
# ===========================

# 确保备份目录存在
mkdir -p "${BACKUP_DIR}" >/dev/null 2>&1

if [ -e "${ZIP_FILE}" ];then

  echo -e "========================================"
  echo -e "> > > 开始部署 ${SYSTEM_NAME} ..."
  echo -e "========================================"

  if [ -d "${DEST_DIR}" ];then
    timestr=$(date +%Y%m%d%H%M%S)
    log_file="${APP_NAME}_${timestr}.tar.gz"

    # 备份现有目录
    tar -zcvf ${log_file} "${APP_NAME}" >/dev/null 2>&1
    mv ${log_file} "${BACKUP_DIR}/" >/dev/null 2>&1

    echo -e "> > > 备份成功：${log_file}"
    echo -e "========================================"

    rm -rf "${APP_NAME}"
  fi

  # 解压新版本
  unzip "${ZIP_FILE}" >/dev/null 2>&1

  rm -rf "${ZIP_FILE}"

  echo -e "\033[1;32m${SYSTEM_NAME}部署成功：`date +"%Y-%m-%d %H:%M:%S"`\033[0m"

else

  echo -e "\033[1;31m${SYSTEM_NAME}部署-${ZIP_FILE}-不存在\033[0m"

fi

```

## .tar.gz 部署

``` bash @newqhdl.sh
#!/bin/bash

# ========== 配置变量 ==========
SYSTEM_NAME="短临系统"
APP_NAME="qhdl"
TAR_FILE="${APP_NAME}.tar.gz"
DEST_DIR="/home/apps/${APP_NAME}"
BACKUP_DIR="/home/apps/webbak"
# =============================

# 确保备份目录存在
mkdir -p "${BACKUP_DIR}" >/dev/null 2>&1

if [ -e "${TAR_FILE}" ];then

  echo -e "========================================"
  echo -e "> > > 开始部署 ${SYSTEM_NAME} ..."
  echo -e "========================================"

  if [ -d "${DEST_DIR}" ];then
    timestr=$(date +%Y%m%d%H%M%S)
    log_file="${APP_NAME}_${timestr}.tar.gz"

    # 备份现有目录
    tar -zcvf ${log_file} "${APP_NAME}" >/dev/null 2>&1
    mv ${log_file} "${BACKUP_DIR}/" >/dev/null 2>&1

    echo -e "> > > 备份成功：${log_file}"
    echo -e "========================================"

    rm -rf "${APP_NAME}"
  fi

  # 解压新版本
  tar -zxvf "${TAR_FILE}" >/dev/null 2>&1

  rm -rf "${TAR_FILE}"

  echo -e "\033[1;32m${SYSTEM_NAME}部署成功：`date +"%Y-%m-%d %H:%M:%S"`\033[0m"

else

  echo -e "\033[1;31m${SYSTEM_NAME}部署-"${TAR_FILE}"-不存在\033[0m"

fi

```

## .bat脚本 tarPack.bat 打包

``` bat @tarPack.bat
@echo off

:: ========== 配置区 ==========
set "FOLDER_NAME=xmname"
set "ARCHIVE_NAME=%FOLDER_NAME%.tar.gz"
:: ==========================

echo.
echo ========================================
echo      %FOLDER_NAME% 打包工具 - 启动中...
echo ========================================
echo.

:: 删除旧的压缩包（如果存在）
if exist "%ARCHIVE_NAME%" (
  echo [提示] 发现旧的 %ARCHIVE_NAME%，正在删除...
  del "%ARCHIVE_NAME%" >nul

  if %errorlevel% equ 0 (
    echo [成功] 旧文件已清理。
  ) else (
    echo [警告] 无法删除 %ARCHIVE_NAME%，请检查是否被占用。
    pause
    exit /b 1
  )
)

:: 检查目标文件夹是否存在
if exist "%FOLDER_NAME%\" (
  :: 执行打包
  tar -czvf "%ARCHIVE_NAME%" "%FOLDER_NAME%" >nul

  if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo [完成] 打包成功！
    echo        输出文件: %ARCHIVE_NAME%
    echo ========================================
  ) else (
    echo.
    echo [失败] 打包过程中出现错误！
  )
) else (
  echo.
  echo [错误] 当前目录中没有 "%FOLDER_NAME%" 文件夹！
  echo        请确保该文件夹存在后再运行。
  echo.
)

echo.
pause

```

> ## TIP
> 请务必将此 .bat 文件保存为 ANSI 编码（在简体中文 Windows 中即 GBK），否则中文会显示乱码。
> - **用记事本 → 另存为 → 编码选 ANSI**
> - **或用 Notepad++ → 编码 → 转为 ANSI → 保存**


# 三、`newqhdl.sh`文件内容注解

> qhdl为青海短临系统名称

``` bash @newqhdl.sh
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
