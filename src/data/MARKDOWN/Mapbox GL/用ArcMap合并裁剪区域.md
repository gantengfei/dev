
# 一、GeoJson转shp文件
打开[mapshaper](https://mapshaper.org/)网站

1.上传GeoJson文件 \
![输入图片说明](https://foruda.gitee.com/images/1728107602063533277/dadcafd8_4993153.png "屏幕截图")

2.输入命令`encoding=gb2312` \
![输入图片说明](https://foruda.gitee.com/images/1728107706528764973/3efd0be9_4993153.png "屏幕截图")

3.右上角点击`Export`选择导出文件格式 \
![输入图片说明](https://foruda.gitee.com/images/1728107789797174755/ee4d4565_4993153.png "屏幕截图")

> ## TIP
> `encoding=gb2312`命令：geojson转shp中文乱码的解决方案

# 二、ArcMap合并裁剪
![输入图片说明](https://foruda.gitee.com/images/1728110389838414359/a20b68ce_4993153.png "屏幕截图")

1.将shp文件拖入ArcMap软件中 \
2.选择要素，右键要素选择<编辑要素>后，选择<开始编辑> \
![输入图片说明](https://foruda.gitee.com/images/1728109789732967722/7a7224b9_4993153.png "屏幕截图")

## 2.1 编辑器-合并
![输入图片说明](https://foruda.gitee.com/images/1728110137669884730/db65801d_4993153.png "屏幕截图")

## 2.2 编辑器-裁剪
![输入图片说明](https://foruda.gitee.com/images/1728110006912543505/7a2ab4ac_4993153.png "屏幕截图")

# 三、shp文件转GeoJson
shp文件转GeoJson，也通过[mapshaper](https://mapshaper.org/)网站转换。
