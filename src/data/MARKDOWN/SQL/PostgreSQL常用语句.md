#### Linux下查看与重启
``` Shell
# 查看命令
ps aux | grep postgres

# postgres开启
# 切入postgres账户
su - postgres

# 启动数据库
pg_ctl start

# 停止数据库
pg_ctl stop

# 重新切回root 密码 root
su - root
```

#### 普通表超表备份还原
``` sql
# awing_tws 数据库名称
# 切入postgres账户
su - postgres

# 查看表占用的存储空间
select pg_size_pretty(pg_total_relation_size('grid_meta_his'));

# 只备份指定普通表数据 -a
pg_dump -p 8433 -f t_aws.backup -t qxcp.t_aws_hour_info -t qxcp.t_aws --inserts -a awing_tws

# 备份时序超表数据
psql -d awing_tws -p 8433 \
-c "\COPY (SELECT * FROM qxcp.t_aws_hour_info) TO data.csv DELIMITER ',' CSV"

# 只备份指定表结构 -s
pg_dump -p 8433 -f t_aws.backup -t qxcp.t_aws_hour_info -t qxcp.t_aws  -s awing_tws

# 同时备份表数据和结构
pg_dump -p 8433 -f t_aws.backup -t qxcp.t_aws_hour_info -t qxcp.t_aws  --inserts awing_tws
# 同时备份小数常规表数据和累计表数据 -a
pg_dump -p 8433 -f t_aws.backup -t qxcp.t_aws_hour_info -t qxcp.t_aws_hour_agg  --inserts -a hq_weather_gis

# 还原普通关系表
psql -p 8433 -d awing_tws
awing_tws =# \i _aws.backup
# 退出
awing_tws =# \q

# 还原超表数据
psql -p 8433 -d awing_tws -c "\COPY qxcp.t_aws_hour_info FROM data.csv CSV"

# 备份schema -n
pg_dump -p 8433 -f jcdl.backup -n jcdl hq_weather_gis

```
