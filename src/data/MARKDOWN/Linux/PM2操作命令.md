# 💻使用 pm2

**PM2** 是带有内置负载平衡器的 `Node.js` 应用程序的生产过程管理器。可以利用它来简化很多 **Node** 应用管理的繁琐任务，如性能监控、自动重启、负载均衡等。

## 安装

把 `pm2` 安装到全局

``` bash
$ npm install pm2 -g    # 命令行安装 pm2
```

## 基本命令
``` bash
# 启动命令
$ pm2 start app.js  # 启动nodeJs应用，进程的默认名称为文件名app
$ pm2 start app.js --name mynode # 启动node，并指定进程名称为mynode
$ pm2 start app.js - i max # 根据有效CPU数目启动最大进程数目
$ pm2 start app.js - i 3 # 启动3个进程
$ pm2 start app.js --watch # 实时监控的方式启动，app.js文件有变动时，pm2会自动reload
$ pm2 start app.js - x # 用fork模式启动 app.js 而不是使用 cluster
$ pm2 start app.js - x– - a 23 # 用fork模式启动 app.js 并且传递参数（-a 23）
$ pm2 start app.json # 启动进程, 在app.json里设置选项
$ pm2 start app.js - i max– - a 23 # 在 – 之后给 app.js 传递参数
$ pm2 start app.js - i max - e err.log - o out.log # 启动并生成一个配置文件

# 查看与监视进程
$ pm2 list | pm2 ls # 显示所有进程；
$ pm2 show 0 | pm2 info 0 # 查看进程id为0的详细信息
$ pm2 monit # 进入监视页面，监视每个node进程的CPU和内存的使用情况

# 停止、删除进程
$ pm2 stop 0 # 停止id为0的进程
$ pm2 stop all # 停止所有进程
$ pm2 delete 0 # 删除id为0的进程
$ pm2 delete all # 删除所有进程

# 重启、重载
$ pm2 restart 0 # 重启id为0的进程
$ pm2 restart all # 重启所有进程
$ pm2 reload 0 # 0秒停机重载id为0进程（用于 NETWORKED 进程）
$ pm2 reload all # 重载所有进程

# 日志操作
$ pm2 logs # 显示所有进程的日志
$ pm2 logs 0 # 显示进程id为0的日志
$ pm2 flush # 清空所有日志文件
$ pm2 reloadLogs # 重载所有日志
$ pm2 startup # 产生init脚本，保持进程活着

# 杀死PM2进程
$ pm2 kill
```

`pm2 list` ，就会以表格显示。

![输入图片说明](./src/img/images/2026-02-26_09-44-29.png "")

下面是 `pm2 ls` 命令输出的字段说明：

| 字段名 | 含义 | 详细说明 |
| :--- | :---- | :--- |
| <span style="color:#15837A;font-weight: 600;">name</span> | 应用名称 | 你在启动时通过 `--name` 指定的名字（如 `my-app`）。如果未指定，默认是脚本文件名。 |
| <span style="color:#15837A;font-weight: 600;">id</span> | 进程 ID | PM2 内部管理的唯一编号。重启 PM2 或重置列表后可能会变化。可用于命令操作，如 `pm2 restart 0`。 |
| <span style="color:#15837A;font-weight: 600;">mode</span> | 运行模式 | - **fork**: 单进程模式（默认），适合非 Node.js 应用或不需要集群的应用。<br>- **cluster**: 集群模式，利用 Node.js 多核能力，实例数由 `-i` 指定。 |
| <span style="color:#15837A;font-weight: 600;">PID</span> | 系统进程 ID | 该进程在 Linux 操作系统层面的真实 PID。可用于 `kill` 或 `top` 等系统命令。 |
| <span style="color:#15837A;font-weight: 600;">status</span> | 当前状态 | 最关键字段。<br>- **online** (🟢 绿色): <br>&emsp;**含义：**进程正常运行中。<br>&emsp;**操作：**无需操作。<br>- **stopped** (⚫ 黑色/灰色): <br>&emsp;**含义：**进程已被手动停止（通过 pm2 stop），或者配置为开机不自动启动且尚未手动启动。<br>&emsp;**操作：**运行 pm2 start <app> 来启动它。<br>- **errored** (🔴 红色): <br>&emsp;**含义：**进程启动失败或运行时发生严重错误导致退出，且超过了最大重启次数限制（默认无限重启，但某些配置下会停止）。<br>&emsp;**操作：**查看日志：`pm2 logs <app> --err` <br>&emsp;&emsp;&emsp;&emsp;尝试重启：`pm2 restart <app>` <br>&emsp;&emsp;&emsp;&emsp;如果一直报错，检查代码或环境变量。<br>- **launching** (🔵 蓝色): <br>&emsp;**含义：**进程正在启动中。通常只持续几秒钟。 <br>&emsp;**注意：**如果长时间停留在此状态，说明启动卡住了（例如端口被占用、数据库连不上且在重试）。<br>- **stopping / restarting** : <br>&emsp;**含义：**进程正在执行停止或重启操作的过渡状态。|
| <span style="color:#15837A;font-weight: 600;">restart</span> | 重启次数 | 该应用自被 PM2 接管以来自动或手动重启的累计次数。如果数字疯狂增加，说明应用在不断崩溃重启。 |
| <span style="color:#15837A;font-weight: 600;">uptime</span> | 运行时间 | 进程当前连续运行的时间。如果状态刚变为 online，这个时间会重置。格式如 `10d` (10天), `2h` (2小时)。 |
| <span style="color:#15837A;font-weight: 600;">cpu</span> | CPU 使用率 | 当前时刻该进程占用的 CPU 百分比。 |
| <span style="color:#15837A;font-weight: 600;">mem</span> | 内存使用量 | 当前时刻该进程占用的物理内存大小（如 `50.5 MB`）。 |
| <span style="color:#15837A;font-weight: 600;">user</span> | 运行用户 | 启动该进程的系统用户名（如 `root`, `www-data`）。 |
| <span style="color:#15837A;font-weight: 600;">watching</span> | 文件监听 | - **enabled**: 开启了文件变更自动重启功能（开发环境常用）。<br>- **disabled**: 未开启（生产环境推荐）。 |


`pm2` 的服务都有一个数组 `id`，你可以用 `id` 快速操作它。

``` bash
$ pm2 stop 0      # 停止编号为 0 的服务
$ pm2 delete 0    # 删除编号为 0 的服务
```

使用 `--name` 参数添加一个应用名。

``` bash
$ pm2 start app.js --name mynode
```

然后用这个应用名来操作启停。

``` bash
# 停止 mynode 服务
$ pm2 stop mynode
# 重启 mynode 服务
$ pm2 restart mynode
# 查看 mynode 服务的输出日志
$ pm2 logs mynode
```

# ⚙️Linux设置自启

## 保存当前进程列表

首先，确保你已经启动了需要运行的应用，并且将它们保存到一个 `dump` 文件中。这样 **PM2** 在重启后才知道要恢复哪些应用。

``` bash
pm2 save
```

执行成功后，通常会显示 `[PM2] Saving current process list...` 和 `[PM2] Stopping app: ...` 等提示，并在 `~/.pm2/dump.pm2` 生成配置文件。

``` log
[PM2] Saving current process list...
[PM2] Successfully saved in /root/.pm2/dump.pm2
```

``` bash
ls -lh /root/.pm2/dump.pm2
```

``` log
-rw-r--r--. 1 root root 11K Feb 26 09:46 /root/.pm2/dump.pm2
```

## 运行启动命令

运行以下命令，**PM2** 会检测你的系统环境并输出一条需要以 `sudo` 权限执行的命令：

``` bash
pm2 startup
```

``` log
[PM2] Init System found: systemd
Platform systemd
Template
[Unit]
Description=PM2 process manager
Documentation=https://pm2.keymetrics.io/
After=network.target

[Service]
Type=forking
User=root
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity
Environment=PATH=/root/.nvm/versions/node/v14.21.3/bin:/home/anaconda3/bin:/home/anaconda3/condabin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin:/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
Environment=PM2_HOME=/root/.pm2
PIDFile=/root/.pm2/pm2.pid
Restart=on-failure

ExecStart=/usr/lib/node_modules/pm2/bin/pm2 resurrect
ExecReload=/usr/lib/node_modules/pm2/bin/pm2 reload all
ExecStop=/usr/lib/node_modules/pm2/bin/pm2 kill

[Install]
WantedBy=multi-user.target

Target path
/etc/systemd/system/pm2-root.service
Command list
[ 'systemctl enable pm2-root' ]
[PM2] Writing init configuration in /etc/systemd/system/pm2-root.service
[PM2] Making script booting at startup...
[PM2] [-] Executing: systemctl enable pm2-root...
Created symlink from /etc/systemd/system/multi-user.target.wants/pm2-root.service to /etc/systemd/system/pm2-root.service.
[PM2] [v] Command successfully executed.
+---------------------------------------+
[PM2] Freeze a process list on reboot via:
$ pm2 save

[PM2] Remove init script via:
$ pm2 unstartup systemd
```

## 验证服务状态

执行完上面的 `sudo` 命令后，你可以检查 *PM2* 的服务状态：

``` bash
# uid服务名 pm2-<uid>
systemctl status pm2-root
```

如果显示 `active (running)`，则说明设置成功。

### Active: inactive (dead)

``` log
● pm2-root.service - PM2 process manager
   Loaded: loaded (/etc/systemd/system/pm2-root.service; enabled; vendor preset: disabled)
   Active: inactive (dead)
     Docs: https://pm2.keymetrics.io/
You have mail in /var/spool/mail/root
```

看到 `Active: inactive (dead)` 且 `Loaded: ... enabled`，说明 **PM2** 的 **systemd** 服务已经成功安装并设置为开机自启，但是 当前并没有运行。

### 手动启动服务
既然服务已启用但未运行，最直接的方法是手动启动它：

``` bash
sudo systemctl start pm2-root
```

启动后，再次检查状态：
``` bash
systemctl status pm2-root
```

``` log
● pm2-root.service - PM2 process manager
   Loaded: loaded (/etc/systemd/system/pm2-root.service; enabled; vendor preset: disabled)
   Active: active (running) since Thu 2026-02-26 10:01:14 CST; 10s ago
     Docs: https://pm2.keymetrics.io/
  Process: 103074 ExecStart=/usr/lib/node_modules/pm2/bin/pm2 resurrect (code=exited, status=0/SUCCESS)
 Main PID: 86166 (PM2 v6.0.5: God)
    Tasks: 0
   CGroup: /system.slice/pm2-root.service
           ‣ 86166 PM2 v6.0.5: God Daemon (/root/.pm2)

Feb 26 10:01:13 localhost.localdomain systemd[1]: Starting PM2 process manager...
Feb 26 10:01:13 localhost.localdomain pm2[103074]: [PM2] Resurrecting
Feb 26 10:01:13 localhost.localdomain pm2[103074]: [PM2] Restoring processes located in /root/.pm2/dump.pm2
Feb 26 10:01:14 localhost.localdomain pm2[103074]: ┌────┬───────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬────────…─┐
Feb 26 10:01:14 localhost.localdomain pm2[103074]: │ id │ name          │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ …atching │
Feb 26 10:01:14 localhost.localdomain pm2[103074]: ├────┼───────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼────────…─┤
Feb 26 10:01:14 localhost.localdomain pm2[103074]: │ 0  │ gxshipdata    │ default     │ N/A     │ fork    │ 93215    │ 32m    │ 0    │ …isabled │
Feb 26 10:01:14 localhost.localdomain pm2[103074]: └────┴───────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴────────…─┘
Feb 26 10:01:14 localhost.localdomain systemd[1]: Started PM2 process manager.
Hint: Some lines were ellipsized, use -l to show in full.
```

![输入图片说明](./src/img/images/2026-02-26_10-08-53.png "")


# ✅自启总结操作流程

``` bash
# 1. 切换到 root (如果你当前不是 root)
su - root

# 2. 确保应用正在运行
pm2 list
# 如果是空的，先启动你的应用，例如：
# pm2 start /path/to/app.js --name myapp

# 3. 强制保存当前进程列表
pm2 save

# 4. 重新启动 systemd 服务
systemctl restart pm2-root

# 5. 检查状态
systemctl status pm2-root

# 6. (可选) 设置开机自启确认 (虽然显示 enabled 了，再执行一次也无妨)
systemctl enable pm2-root
```

执行完上述步骤后，`status` 应该显示 `active (running)`，且 `pm2 list` 能看到你的应用。下次重启服务器时，它们就会自动启动了。
