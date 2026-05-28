启动 `geoserver` 地图服务，启动不起来
``` bash
[root@localhost /]$ cd /home/apps/geoserver-2.16.1/
[root@localhost geoserver-2.16.1]$ cd bin/
[root@localhost bin]$ ./startup.sh
```

``` log
The JAVA_HOME environment variable is set but JAVA_HOME/bin/java
is missing or not executable:
    JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk
Please either set JAVA_HOME so that the Java runtime is JAVA_HOME/bin/java
or unset JAVA_HOME to use the Java runtime on the PATH.
```

根据错误信息，`JAVA_HOME` 环境变量已设置为 `/usr/lib/jvm/java-1.8.0-openjdk`，但该路径下缺少可执行的 `java` 命令。

# ➤ Java 环境配置

## ◆ 验证 Java 安装路径
检查 `/usr/lib/jvm/java-1.8.0-openjdk` 目录是否存在 `bin/java` 文件：
``` bash
[root@localhost bin]$ ls -l /usr/lib/jvm/java-1.8.0-openjdk/bin/java
```

## ◆ 验证安装‌
``` bash
[root@localhost bin]$ java -version
```

``` log
java version "11.0.24" 2024-07-16 LTS
Java(TM) SE Runtime Environment 18.9 (build 11.0.24+7-LTS-271)
Java HotSpot(TM) 64-Bit Server VM 18.9 (build 11.0.24+7-LTS-271, mixed mode)
```

## ◆ 确认 Java 安装路径
``` bash
[root@localhost bin]$ which java
```

``` log
/usr/local/jdk11.0.24/bin/java
```

## ◆ 验证配置
``` bash
[root@localhost bin]$ echo $JAVA_HOME
```

``` log
/usr/lib/jvm/java-1.8.0-openjdk
```
路径不存在重新配置环境变量路径

## ◆ 添加 JAVA_HOME 配置

指向 `JDK` 安装路径

### ❑ `export` 临时环境变量

`export` 命令只在当前 **shell** 会话中生效，属于临时环境变量，系统重启或新终端打开后就会失效。
``` bash
[root@localhost bin]$ export JAVA_HOME=/usr/local/jdk1.8.0_291
```

### ❑ 将环境变量写入配置文件（永久生效）

把 `JAVA_HOME` 和 `PATH` 的设置写入系统的用户级或全局级配置文件中。

#### 1. 为当前用户永久配置

编辑当前用户的 `shell` 配置文件
``` bash
nano ～/.bashrc
```

![输入图片说明](./src/img/images/2026-01-21_11-09-08.png "")

在文件末尾添加以下内容：
``` bash
export JAVA_HOME=/usr/local/jdk1.8.0_291
export PATH=$JAVA_HOME/bin:$PATH
```

![输入图片说明](./src/img/images/2026-01-21_11-11-41.png "")

保存并退出（在 **nano** 中按 `Ctrl+O` → 回车 → `Ctrl+X`）。

**然后重新加载配置：**
``` bash
source ～/.bashrc
```

#### 2. 全局配置（对所有用户生效）

希望所有用户都能使用这个 **Java** 环境，可以创建一个系统级配置文件：

``` bash
sudo nano /etc/profile.d/java.sh
```
写入：
``` bash
#!/bin/bash
export JAVA_HOME=/usr/local/jdk1.8.0_291
export PATH=$JAVA_HOME/bin:$PATH
```
保存后，给脚本执行权限:

``` bash
sudo chmod +x /etc/profile.d/java.sh
```

所有在 `/etc/profile.d/` 目录下以 `.sh` 结尾的脚本会在用户登录时自动执行。


## ◆ 再次验证配置
``` bash
[root@localhost bin]$ echo $JAVA_HOME
```

``` log
/usr/local/jdk1.8.0_291
```

# ➤ 启动服务
## ◆ 当前目录路径
``` bash
[root@localhost bin]$ pwd
```

``` log
/home/apps/geoserver-2.16.1/bin
```

## ◆ 列出目录内容
``` bash
[root@localhost bin]$ ll
```

``` log
-rw-r--r--. 1 root root  272 12月 17 15:38 myLog.log
-rwxrwxrwx. 1 root root 3156 11月 22 2019 shutdown.bat
-rwxrwxrwx. 1 root root 2269 11月 22 2019 shutdown.sh
-rw-r--r--. 1 root root 4600 11月 22 2019 startup.bat
-rwxrwxrwx. 1 root root 3099 11月 22 2019 startup.sh
```

## ◆ 启动测试
``` bash
[root@localhost bin]$ ./startup.sh
```
