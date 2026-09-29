实现将 **10.124.102.99** 服务器 `/mnt/fuxi_medium` 挂载/同步到 **10.124.102.203** 服务器 `/mnt/fuxi_medium`

# rsync 同步

## 1.查看版本信息

在 **10.124.102.99**（源）和 **10.124.102.203**（目标）上都查看：

``` bash
rsync --version
```

- 如果已安装，会输出版本信息，如 `rsync version 3.1.3 ...`
- 如果未安装，会提示 `command not found`

## 2.配置免密登录

在 **10.124.102.203** 上执行：

``` bash
ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa
ssh-copy-id njsqxt_lc@10.124.102.99
```

验证免密是否生效：

``` bash
ssh njsqxt_lc@10.124.102.99 "echo ok"
```

## 3.确保挂载点存在

``` bash
mkdir -p /mnt/fuxi_medium
```

## 4.执行同步

方式一：拉取（Pull）— 在 203 上执行

从 99 拉取数据到 203：
``` bash
rsync -avzP --delete njsqxt_lc@10.124.102.99:/mnt/fuxi_medium/ /mnt/fuxi_medium/
```

方式二：推送（Push）— 在 99 上执行

从 99 推送数据到 203：
``` bash
rsync -avzP --delete /mnt/fuxi_medium/ root@10.124.102.203:/mnt/fuxi_medium/
```

> ⚠️ 注意路径末尾的 `/`： \
> `/mnt/fuxi_medium/`（带斜杠）→ 同步目录内容 \
> `/mnt/fuxi_medium`（不带斜杠）→ 同步目录本身（会在目标端创建 fuxi_medium 子目录）

## 5.常用参数说明

| 参数 | 说明 |
|------|------|
| `-a` | 归档模式，保留权限、时间戳、软链接等（等于 `-rlptgoD`） |
| `-v` | 显示详细输出 |
| `-z` | 传输时压缩数据，节省带宽 |
| `-P` | 显示进度 + 保留中断后的部分文件（等于 `--partial --progress`） |
| `--delete` | 删除目标端有但源端没有的文件，保持两端一致 |
| `--exclude='*.tmp'` | 排除指定文件/目录，可多次使用 |
| `--bwlimit=50000` | 限制带宽为 50MB/s，避免占满网络 |
| `--dry-run` | 模拟执行，不实际传输，用于预览变更 |
| `--delay-updates` | 延迟更新，所有文件传输完成后才移动到位，减少中途不一致的窗口 |

## 6.定时同步（Crontab）

在正式运行前，先加 `--dry-run` 模拟执行，确认同步效果：

``` bash
/usr/bin/rsync -avzP --delete --dry-run njsqxt_lc@10.124.102.99:/mnt/fuxi_medium/ /mnt/fuxi_medium/
```

> ⚠️ 注意：如果目录数据量很大，`--dry-run` 本身也会比较耗时，因为它需要扫描所有文件来模拟同步过程。

在 **10.124.102.203** 上设置定时任务，每 **5** 分钟同步一次：
``` bash
crontab -e

*/5 * * * * /usr/bin/rsync -avzP --delete njsqxt_lc@10.124.102.99:/mnt/fuxi_medium/ /mnt/fuxi_medium/ >> /var/log/rsync_fuxi.log 2>&1
```

每 **5** 分钟执行一次，如果数据量大导致单次 `rsync` 耗时超过 **5** 分钟，会出现多个 `rsync` 进程同时运行的情况。建议加锁防止重叠：
``` bash
*/5 * * * * /usr/bin/flock -n /tmp/rsync_fuxi.lock /usr/bin/rsync -avzP --delete njsqxt_lc@10.124.102.99:/mnt/fuxi_medium/ /mnt/fuxi_medium/ >> /var/log/rsync_fuxi.log 2>&1
```

### 写成脚本 + 锁文件（推荐生产环境使用）

1.创建同步脚本

``` bash @/home/ssh_fuxi/rsync_fuxi.sh
#!/bin/bash

LOCKFILE="/tmp/rsync_fuxi.lock"
LOGFILE="/home/ssh_fuxi/rsync_fuxi.log"
MAX_RETRY=3

exec 200>"$LOCKFILE"
if ! flock -n 200; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') [SKIP] 上次同步未完成，跳过本次执行" >> "$LOGFILE"
    exit 0
fi

for i in $(seq 1 $MAX_RETRY); do
    echo "$(date '+%Y-%m-%d %H:%M:%S') [START] 第 ${i}/${MAX_RETRY} 次同步" >> "$LOGFILE"

    /usr/bin/rsync -avzP --delete njsqxt_lc@10.124.102.99:/mnt/fuxi_medium/ /mnt/fuxi_medium/ >> "$LOGFILE" 2>&1
    RET=$?

    if [ $RET -eq 0 ]; then
        echo "$(date '+%Y-%m-%d %H:%M:%S') [DONE] 同步完成" >> "$LOGFILE"
        break
    else
        echo "$(date '+%Y-%m-%d %H:%M:%S') [FAIL] 第 ${i} 次同步失败，退出码: $RET" >> "$LOGFILE"
        if [ $i -lt $MAX_RETRY ]; then
            echo "$(date '+%Y-%m-%d %H:%M:%S') [RETRY] 等待 30 秒后重试..." >> "$LOGFILE"
            sleep 30
        fi
    fi
done

flock -u 200
```

2.配置定时任务

``` bash
crontab -e

*/5 * * * * /bin/bash /home/ssh_fuxi/rsync_fuxi.sh
```


## ⚙️ 排查步骤清单

``` bash
# 1. 确认免密登录
ssh njsqxt_lc@10.124.102.99 "echo ok"

# 2. 手动执行一次 rsync，确认能正常同步
/usr/bin/rsync -avzP --delete njsqxt_lc@10.124.102.99:/mnt/fuxi_medium/ /mnt/fuxi_medium/

# 3. 检查 crontab 是否已添加
crontab -l

# 4. 查看日志确认定时任务是否在运行
tail -n 100 -f /home/ssh_fuxi/rsync_fuxi.log

# 5. 检查是否有重叠的 rsync 进程
ps aux | grep rsync
```

## ⚠️ 注意事项

- **首次同步**：数据量大时建议先加 `--dry-run` 预览，确认无误后再正式执行。
- **`--delete` 风险**：该参数会删除目标端多余文件，首次使用务必确认，避免误删。
- **大文件断点续传**：`rsync` 本身支持增量传输，中断后重新执行即可续传。
- **防火墙**：确保两台服务器之间 22 端口（SSH）互通。
- **性能对比**：相比 `sshfs`，`rsync` 是批量复制而非实时挂载，I/O 性能更好，适合大文件和高并发场景。


## ⚙️ 快速排查命令汇总

``` bash
# === 在 99（源端）执行 ===
df -h /mnt/fuxi_medium                    # 磁盘空间
dmesg | tail -30                          # 硬件/文件系统错误
ps aux | grep rsync                       # 进程堆积
rsync -avz /mnt/fuxi_medium/ /tmp/test/   # 本地同步测试

# === 在 203（目标端）执行 ===
ping -c 50 10.124.102.99                  # 网络稳定性
rsync --version | head -1                 # 版本对比
```


# lsyncd 实时同步方案

**lsyncd** 基于 `inotify` + `rsync` 封装，监听文件系统变化事件后自动触发增量同步，是比手动 `rsync` 更高效的实时同步方案。

## 1. 查看 lsyncd 版本信息

在 10.124.102.99（源端）上执行：
``` bash
# 先确认 rsync 已安装（lsyncd 依赖 rsync >= 3.1）
rsync --version
```
