# 更换Gem镜像源
``` bash
ruby -v # 检查Ruby版本

gem -v # 检查gem版本

gem sources --remove https://rubygems.org/ # 删除旧源（如官方源）
gem sources -a https://gems.ruby-china.com/ # 添加国内镜像源

gem sources -l # 查看当前源

gem list compass  # 应显示1.0.3版本
compass -v  # 检查是否能正常输出版本号
```
**国内推荐镜像源** \
`https://gems.ruby-china.com/` Ruby China 维护 \
`https://mirrors.tuna.tsinghua.edu.cn/rubygems/` 清华大学开源镜像站 \
~`http://ruby.taobao.org/` 淘宝源(已停止维护)~


# Ruby 3.4.5
Windows环境安装`rubyinstaller-3.4.5-1-x64.exe`

使用`Start Command Prompt with Ruby`终端内安装`compass`
``` bash
gem install compass
```
## 告警一

### 1.1提示告警内容
``` log
Successfully installed ffi-1.17.2-x64-mingw-ucrt
WARNING:  You don't have c:/users/lenovo/appdata/local/microsoft/windowsapps in your PATH,
          gem executables (compass) will not run.
```
该警告表明系统PATH环境变量中缺少`C:/Users/Lenovo/AppData/Local/Microsoft/WindowsApps`目录，导致无法直接运行`Compass`等`gem`安装的可执行文件。
### 1.2解决方案
**添加缺失路径到PATH‌**
+ 1.右键"此电脑"→属性→高级系统设置→环境变量
+ 2.在"用户变量"或"系统变量"中找到Path变量并编辑
+ 3.新建条目并添加`%USERPROFILE%\AppData\Local\Microsoft\WindowsApps`
+ 4.所有窗口点击确定保存

## 提示二
### 2.1提示内容
Compass 1.0.3安装成功后的捐赠提示。
``` log
Compass is charityware. If you love it, please donate on our behalf at http://umdf.org/compass Thanks!
Successfully installed compass-1.0.3
```

## 告警三
在项目中执行`compass watch`出现告警内容。
### 3.1提示告警内容
``` log
NoMethodError on line ["89"] of C: undefined method 'exists?' for class File
Run with --trace to see the full backtrace
```
该错误表明代码中使用了Ruby已弃用的`File.exists?`方法，该方法在Ruby 3.2+版本中已被移除。
### 3.2解决方案
**降级方案** \
作为临时措施，可降级至`Ruby≤3.1`版本,但建议优先采用API更新方案以保证长期兼容性。

该问题属于Ruby版本升级引发的API变更，与文件系统操作相关的类似方法（如`Dir.exists?`）也需同步更新为`Dir.exist?`


# Ruby 3.1.6
Windows环境安装`rubyinstaller-3.1.6-1-x64.exe`

使用`Start Command Prompt with Ruby`终端内安装`compass`
``` bash
gem install compass
```
## 告警一
### 1.1提示告警内容
``` log
C:/Ruby31-x64/lib/ruby/3.1.0/rubygems.rb:265:in `find_spec_for_exe': can't find gem sass (>= 0.a) with executable sass (Gem::GemNotFoundException)
        from C:/Ruby31-x64/lib/ruby/3.1.0/rubygems.rb:284:in `activate_bin_path'
        from C:/Users/Lenovo/AppData/Local/Microsoft/WindowsApps/sass:32:in `<main>'
```
### 1.2解决方案
首先检查是否已安装Sass
``` bash
gem list sass
```
如果未安装，执行以下命令安装最新版Sass
``` bash
gem install sass
```
如果已安装但版本过低，更新Sass
``` bash
gem update sass
```
**确认环境变量PATH中包含了Ruby的bin目录路径**
+ 1.检查你的Ruby安装路径（如`C:/Ruby31-x64/bin`）是否在系统环境变量中。
+ 2.如果问题仍然存在，尝试重新安装Ruby并确保安装时勾选"`Add Ruby executables to your PATH`"选项

**常见问题排查：**
+ 确保使用的是正确的Ruby版本（`ruby -v`）
+ 检查gem环境是否正常（`gem env`）
+ 如果使用bundler，确保Gemfile中包含sass gem并运行bundle install

## 告警二
## 2.1提示告警内容
``` log
MSYS2 seems to be unavailable
Download http://repo.msys2.org/distrib/x86_64/msys2-x86_64-20180531.exe
  to C:\Users\Lenovo\AppData\Local\Temp/msys2-x86_64-20180531.exe
Installation failed: 404 Not Found
```
在尝试下载MSYS2安装程序时遇到了404 Not Found错误，这表明下载链接已失效。

**原因分析**
+ 1.你尝试下载的链接(`http://repo.msys2.org/distrib/x86_64/msys2-x86_64-20180531.exe`)可能已经过时或不再可用
+ 2.官方可能已经更新了MSYS2的版本和下载地址

**解决方案**
+ 1.使用最新官方下载地址
访问MSYS2官方网站获取最新下载链接：`https://www.msys2.org/`
+ 2.使用国内镜像加速下载
国内用户可以使用以下镜像站下载MSYS2，速度更快：
+ **清华大学开源软件镜像站**：https://mirror.tuna.tsinghua.edu.cn/msys2/distrib/x86_64/
+ **中科大开源软件镜像站**：https://mirrors.ustc.edu.cn/msys2/distrib/x86_64/
+ **阿里云开源软件镜像站**：https://mirrors.aliyun.com/msys2/distrib/x86_64/

> ## TIP
> **安装Ruby本身‌不一定必须‌安装MSYS2**
>
> 不需要安装MSYS2的情况 \
> **纯Ruby开发** \
> 若仅运行纯Ruby代码（不涉及C扩展的gem），无需编译环境，可不安装MSYS2。
>
> **基础功能验证** \
> 通过`ruby -v`验证安装成功即可开始基础开发。


# Ruby 2.6.3
Windows环境安装`rubyinstaller-2.6.3-1-x64.exe`

使用`Start Command Prompt with Ruby`终端内安装`compass`
``` bash
gem install compass
```

## 告警一
### 1.1提示告警内容
``` log
>gem install compass -v 1.0.3
ERROR:  Error installing compass:
        The last version of multi_json (~> 1.0) to support your Ruby & RubyGems was 1.15.0. Try installing it with `gem install multi_json -v 1.15.0` and then running the current command again
        multi_json requires Ruby version >= 3.0. The current ruby version is 2.6.3.62.
```
根据错误信息，这个问题是由于Ruby版本过低（2.6.3）与multi_json要求的Ruby版本（≥3.0）不兼容导致的。
### 1.2解决方案
更新multi_json版本，尝试指定兼容版本：
``` bash
gem install multi_json -v '1.15.0'
```
**验证环境**
升级后检查版本：
``` bash
ruby -v  # 应显示≥3.0.0
gem list multi_json  # 确认版本为1.15.0
```
