# ArcMap（V10.2版本）软件操作

## 投影转换

投影坐标系：**Albers** (阿尔伯斯等积圆锥投影) 转换 **WGS84** (世界标准经纬度坐标系统)

1.打开ArcMap软件

![输入图片说明](./src/img/images/2026-05-07_14-32-09.png "")

![输入图片说明](./src/img/images/2026-05-07_14-23-11.png "")

2.工具箱 > 系统工具箱 > 数据管理工具（Data Management Tools） > 投影和变换 > 投影

![输入图片说明](./src/img/images/2026-05-07_14-24-24.png "")

3.选择数据集，选择投影坐标系，选择输出坐标系 **WGS 1984**，点击确定

![输入图片说明](./src/img/images/2026-05-07_14-25-59.png "")

![输入图片说明](./src/img/images/2026-05-07_14-26-10.png "")

## 数据转换.shp文件

4.等待转换完成，转换成功后，新生成的数据保存 `.shp` 文件

5.工具箱 > 系统工具箱 > Conversion Tools > 转为 Shapefile > 要素类转 Shapefile（批量）

![输入图片说明](./src/img/images/2026-05-07_14-30-01.png "")

6.输入要素，输出文件夹，点击确定

![输入图片说明](./src/img/images/2026-05-07_14-30-30.png "")

## 裁剪.shp文件

7.重新打开ArcMap软件

![输入图片说明](./src/img/images/2026-05-07_14-32-09.png "")

8.选择要素，右键要素选择<编辑要素>后，选择<开始编辑>

9.选择裁剪

![输入图片说明](./src/img/images/2026-05-07_14-34-43.png "")

10.保存编辑内容，停止编辑

![输入图片说明](./src/img/images/2026-05-07_14-35-03.png "")

![输入图片说明](./src/img/images/2026-05-07_14-36-24.png "")


# shp文件转GeoJson

1.打开[mapshaper](https://mapshaper.org/)网站

2.上传shp文件，将shp文件拖入（同时将dbf文件拖入）

![输入图片说明](./src/img/images/2026-05-07_14-37-36.png "")

![输入图片说明](./src/img/images/2026-05-07_14-38-15.png "")


3.右上角点击`Export` > 选择`GeoJson` > 输入`encoding=gb2312` > 点击`Export`

![输入图片说明](./src/img/images/2026-05-07_14-39-06.png "")
