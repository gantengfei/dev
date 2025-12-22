启动 `geoserver` 地图服务，启动不起来
``` bash
[root@localhost /]# cd /home/apps/geoserver-2.16.1/
[root@localhost geoserver-2.16.1]# cd bin/
[root@localhost bin]# ./startup.sh
```

``` log
The JAVA_HOME environment variable is set but JAVA_HOME/bin/java
is missing or not executable:
    JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk
Please either set JAVA_HOME so that the Java runtime is JAVA_HOME/bin/java
or unset JAVA_HOME to use the Java runtime on the PATH.
```

根据错误信息，`JAVA_HOME` 环境变量已设置为 `/usr/lib/jvm/java-1.8.0-openjdk`，但该路径下缺少可执行的 `java` 命令。

# 1.1 验证 Java 安装路径
检查 `/usr/lib/jvm/java-1.8.0-openjdk` 目录是否存在 `bin/java` 文件：
``` bash
[root@localhost bin]# ls -l /usr/lib/jvm/java-1.8.0-openjdk/bin/java
```

# 1.2 验证安装‌
``` bash
[root@localhost bin]# java -version
```

``` log
java version "11.0.24" 2024-07-16 LTS
Java(TM) SE Runtime Environment 18.9 (build 11.0.24+7-LTS-271)
Java HotSpot(TM) 64-Bit Server VM 18.9 (build 11.0.24+7-LTS-271, mixed mode)
```

# 1.3 确认 Java 安装路径
``` bash
[root@localhost bin]# which java
```

``` log
/usr/local/jdk11.0.24/bin/java
```

# 1.4 验证配置
``` bash
[root@localhost bin]# echo $JAVA_HOME
```

``` log
/usr/lib/jvm/java-1.8.0-openjdk
```
路径不存在重新配置环境变量路径

# 1.5 添加 JAVA_HOME 配置
指向 `JDK` 安装路径
``` bash
[root@localhost bin]# export JAVA_HOME=/usr/local/jdk1.8.0_291
```

# 1.6 再次验证配置
``` bash
[root@localhost bin]# echo $JAVA_HOME
```

``` log
/usr/local/jdk1.8.0_291
```

# 2.1 当前目录路径
``` bash
[root@localhost bin]# pwd
```

``` log
/home/apps/geoserver-2.16.1/bin
```

# 2.2 列出目录内容
``` bash
[root@localhost bin]# ll
```

``` log
-rw-r--r--. 1 root root  272 12月 17 15:38 myLog.log
-rwxrwxrwx. 1 root root 3156 11月 22 2019 shutdown.bat
-rwxrwxrwx. 1 root root 2269 11月 22 2019 shutdown.sh
-rw-r--r--. 1 root root 4600 11月 22 2019 startup.bat
-rwxrwxrwx. 1 root root 3099 11月 22 2019 startup.sh
```

# 2.3 启动测试
``` bash
[root@localhost bin]# ./startup.sh
```
