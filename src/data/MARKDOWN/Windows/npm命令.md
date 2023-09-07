# 快速初始化项目
`npm init` 命令是一个逐步构建项目的工具。
``` bash
npm init
```
根据提示填写内容，也可以按提供的默认值一路回车（Enter）。\
为了省去上面的操作，加上 `--yes` 标志将自动使用默认值 `npm init` 填充所有选项：
``` bash
npm init --yes
npm init -y
```
完成以上面操作后，将会生成一个 `package.json` 文件并将其放置在当前目录中。


# 安装其它来源的包
`npm cli` 还可以让你安装其它来源的包：
``` bash
npm config set xxx

# 淘宝镜像
npm config set registry https://registry.npm.taobao.org
```
查看是否切换成功
``` bash
npm config get registry
```
如果返回设置的源链接，说明镜像设置成功。
> 建议：可以安装 `nrm` 包在不同源之间快速切换，例如 `npm`、`cnpm`、`taobao` 等。


# 安装依赖
## 安装依赖项
> 到当前命令行所在目录
``` bash
npm install <package_name>
npm i <package_name>
```

## 全局安装软件包
``` bash
npm install --global <package_name>
npm i -g <package_name>
```

## 安装开发和运行环境依赖
> 写入`package.json`的`dependencies`中
``` bash
npm install --save <package_name>
npm i -S <package_name>
```

## 安装开发环境依赖
> 写入`package.json`的`devDependencies`中
``` bash
npm install --save-dev <package_name>
npm i -D <package_name>
```

## 安装指定版本依赖
``` bash
npm install <package_name>@2.6.1
npm i <package_name>@2.6.1
```


# 删除依赖
## 删除依赖
``` bash
npm uninstall <package_name>
```

## 删除全局依赖
``` bash
npm uninstall -g <package_name>
```
