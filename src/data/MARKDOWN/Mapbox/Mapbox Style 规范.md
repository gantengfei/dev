# Mapbox Style 规范

[Mapbox （ 中文官网 ）](http://www.mapbox.cn/)致力于打造全球最漂亮的个性化地图。

这里记录下其 Web 端 API [Mapbox GL JS](http://www.mapbox.cn/mapbox-gl-js/api/) 的地图样式规范 [Style](http://www.mapbox.cn/mapbox-gl-js/style-spec/) 的各个配置项：

> 必填项会加上 * ，方便根据目录进行查看

## 1. version *
`version`：版本号（`必填`，且值必须为 `8`）
```
"version": 8
```

## 2. name
`name`：名称（`可选`，用于给 `style` 取名，方便阅读）
``` 
"name": "demo"
```

## 3. metadata
`metadata`：元数据（`可选`，用于给 `style` 附加一些任意属性。为避免冲突，为避免冲突，建议添加前缀，如 `mapbox:`）
```
"metadata": {
    "mapbox:name":"demo"
}
```

## 4. center
`center`：地图的默认中心点（`可选`，由 `经度` 和 `纬度` 构成）
```
"center": [106.66339, 30.42628]
```

## 5. zoom
`zoom`：地图的默认缩放层级（`可选`，值越大，越靠近地表。`mapbox` 采用的是无极缩放，范围一般为 `0 ~ 24`）
```
"zoom": 8
```

## 6. bearing
`bearing`：地图的默认方位角（`可选`，表示 `地图视口正上方中心点` 在地图上 `北偏东` 的角度。默认值为 `0`）
```
"bearing": 0
```

## 7. pitch
`pitch`：地图的默认倾斜角度（`可选`，默认值为 `0`，范围为 `0 ~ 60`）
```
"pitch": 0
```

## 8. sprite
`sprite`：雪碧图（`可选`，用来指定获取雪碧图及其元数据的 URL）

`sprite` 的音译是 `雪碧`，直译是 `精灵`，表示不受地图旋转缩放影响的图标等，类似精灵漂浮在空中。

当有 `layer` 使用了 `background-pattern`、`fill-pattern`、`line-pattern`、`fill-extrusion-pattern`、`icon-image` 等属性时，`sprite` 必填。

```
"sprite": "mapbox://sprites/mapbox/bright-v8"
```

当指定了 `sprite` 后，`mapbox` 会自动生成雪碧图的完整请求地址，分别如下：
```
`${sprite}.png`
`${sprite}.json`
```
如果浏览器进行了缩放，则会加上缩放 DPI 因子 `@2x`，如下：
```
`${sprite}@2x.png`
`${sprite}@2x.json`
```

## 9. glyphs
`glyphs`：字形符号（`可选`，用来指定加载以 PBF 格式设置的 `有向距离场` 字形的 URL 模板）

URL 模板必须带有占位符 `{fontstack}` 和 `{range}`。

当有 layer 使用了 `text-field` 属性时，`glyphs` 必填。
```
"glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf"
```

## 10. transition
`transition`：全局的过渡动画属性（`可选`，用来作为所有过渡动画属性的默认值）
```
"transition": {
    "duration": 300, // 过渡的持续时间（可选，单位：毫秒，默认值为 300）
    "delay": 0 // 延迟多久开始过渡（可选，单位：毫秒，默认值为 0）
}
```

## 11. light
`light`：全局的光源（`可选`）
```
"light": {
    "anchor": "viewport", // 锚点，指定作用的目标（可选，可选值 map、viewport，默认值为 viewport）
    "position": [1.15,210,30], // 位置（可选，默认值为 [1.15,210,30]）
    "color": "white", // 颜色（可选，默认值为 #ffffff）
    "intensity": 0.5 // 强度（可选，取值范围为 0 ~ 1，默认值为 0.5）
}
```

12. sources *
`sources`：数据源集合（`必填`，用于包含一系列数据源 `source`，这些数据源提供了在地图上显示的数据）

`sources` 是对象 `{}` 的形式，其属性名就是 `数据源的名称`（或者说 `数据源的 id`），这样可以根据 `数据源的名称`（或者说 `数据源的 id`）快速获取数据源的信息。
```
"sources": {}
```
每个数据源 `source` 都有一个 `type` 属性，用于指定其具体的类型：

* `vector`：矢量
* `raster`：栅格
* `raster-dem`：栅格化的数字高程模型
* `geojson`：[GeoJSON](https://geojson.org/) 数据源
* `image`：图片
* `video`：视频

### (1) vector
`vector`：矢量切片数据源
```
"sources":{
    "vector-source": {
        "type": "vector", // 类型（必填）
        "url": "mapbox://mapbox.mapbox-streets-v6" // TileJSON 的请求地址（可选）
        "tiles": [ // 用于指定一个或多个切片数据源的请求地址（可选，和 TileJSON 中的 tiles 属性一致）
            "http://a.example.com/tiles/{z}/{x}/{y}.pbf",
            "http://b.example.com/tiles/{z}/{x}/{y}.pbf"
        ],
        "bounds": [-180,-85.051129,180,85.051129], // 边界坐标点（可选，用于限定切片的显示范围，默认值为 [-180,-85.051129,180,85.051129]）
        "scheme":"xyz", // 切片坐标系方案（可选，可选值为 xyz、tms，默认值为 xyz）
        "minzoom": 0, // 最小层级（可选，默认值为 0）
        "maxzoom": 22, // 最大层级（可选，默认值为 22）
        "attribution": "" // 属性信息（可选，用于地图展示时给用户看的一些信息）
    }
}
```

### (2) raster
`raster`：栅格切片数据源（相比 `vector` 多了一个属性 `tileSize`）
``` 
"sources":{
    "raster-source": {
        "type": "raster", // 类型（必填）
        "url": "mapbox://mapbox.satellite" // TileJSON 的请求地址（可选）
        "tiles": [ // 用于指定一个或多个切片数据源的请求地址（可选，和 TileJSON 中的 tiles 属性一致）
            "http://a.example.com/tiles/{z}/{x}/{y}.pbf",
            "http://b.example.com/tiles/{z}/{x}/{y}.pbf"
        ],
        "bounds": [-180,-85.051129,180,85.051129], // 边界坐标点（可选，用于限定切片的显示范围，默认值为 [-180,-85.051129,180,85.051129]）
        "scheme":"xyz", // 切片坐标系方案（可选，可选值为 xyz、tms，默认值为 xyz）
        "minzoom": 0, // 最小层级（可选，默认值为 0）
        "maxzoom": 22, // 最大层级（可选，默认值为 22）
        "attribution": "", // 属性信息（可选，用于地图展示时给用户看的一些信息）
        "tileSize": 256 // 切片的最小展示尺寸（可选，单位：像素，默认值为 512，即 1024/2）
    }
}
```

### (3) raster-dem
`raster-dem`：栅格化的数字高程模型（相比 `raster` 多了一个属性 `encoding`）
```
"sources":{
    "raster-dem-source": {
        "type": "raster-dem", // 类型（必填）
        "url": "mapbox://mapbox.terrain-rgb" // TileJSON 的请求地址（可选）
        "tiles": [ // 用于指定一个或多个切片数据源的请求地址（可选，和 TileJSON 中的 tiles 属性一致）
            "http://a.example.com/tiles/{z}/{x}/{y}.pbf",
            "http://b.example.com/tiles/{z}/{x}/{y}.pbf"
        ],
        "bounds": [-180,-85.051129,180,85.051129], // 边界坐标点（可选，用于限定切片的显示范围，默认值为 [-180,-85.051129,180,85.051129]）
        "scheme":"xyz", // 切片坐标系方案（可选，可选值为 xyz、tms，默认值为 xyz）
        "minzoom": 0, // 最小层级（可选，默认值为 0）
        "maxzoom": 22, // 最大层级（可选，默认值为 22）
        "attribution": "", // 属性信息（可选，用于地图展示时给用户看的一些信息）
        "tileSize": 256, // 切片的最小展示尺寸（可选，单位：像素，默认值为 512，即 1024/2）
        "encoding": "mapbox" // 编码（可选，可选值为 terrarium、mapbox，默认值为 mapbox）
    }
}
```

### (4) geojson
`geojson`：[GeoJSON](https://geojson.org/) 数据源（数据必须通过 `data` 属性指定，`data` 属性值就是一个 `GeoJSON` 或者 `GeoJSON` 的请求地址）
```
"sources": {
    "geojson-source": {
        "type": "geojson", // 类型（必填）
        "data": { // 数据（可选，值必须为一个 GeoJSON 或者 GeoJSON 的请求地址）
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-77.0323, 38.9131]
            },
            "properties": {
                "title": "Mapbox DC",
                "marker-symbol": "monument"
            }
        },
        // "data": "./lines.geojson",
        "maxzoom": 22, // 最大层级（可选，默认值为 22）
        "attribution": "", // 属性信息（可选，用于地图展示时给用户看的一些信息）
        "buffer": 128, // 切片缓存区大小（可选，取值范围为 0 ~ 512，默认值为 128，如果取值为 512 则代表和切片大小一样）
        "tolerance": 0.375, // 简化力度（可选，值越大简化力度越强，几何顶点越少，加载速度越快，默认值为 0.375）
        "cluster": false, // 是否开启聚类（可选，用于将多个点聚类到一个个的群组，默认值为 false）
        "clusterRadius": 50, // 每个群组的的半径（可选，默认值为 50）
        "clusterMaxZoom": 12, // 每个群组的最大层级（大于指定的层级将不显示聚类的群组）
        "lineMetrics": false, // 是否计算线的距离度量（额，有点不能理解，需要 layer 指定 line-gradient）
        "generateId": false // 是否自动生成每个要素生成属性 id 的值
    }
}
```

### (5) image
`image`：图片数据源
```
"sources": {
    "image-source": {
        "type": "image", // 类型（必填）
        "url": "https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif", // 图片的请求地址（必填）
        "coordinates": [ // 坐标点集合（必填，指定要显示图片的坐标点）
            [-80.425, 46.437],
            [-71.516, 46.437],
            [-71.516, 37.936],
            [-80.425, 37.936]
        ]
    }
}
```

### (6) video
`video`：视频数据源
```
"sources": {
    "video-source": {
        "type": "image", // 类型（必填）
        "urls": [ // 一个或多个视频的请求地址（必填，指定多个是为了支持多种视频格式，按优先顺序排序）
            "https://static-assets.mapbox.com/mapbox-gl-js/drone.mp4",
            "https://static-assets.mapbox.com/mapbox-gl-js/drone.webm"
        ], 
        "coordinates": [ // 坐标点集合（必填，指定要显示视频的坐标点）
            [-80.425, 46.437],
            [-71.516, 46.437],
            [-71.516, 37.936],
            [-80.425, 37.936]
        ]
    }
}
```

## 13. layers *
`layers`：图层集合（`必填`，包含了一系列图层 `layer`，这些图层指定了如何渲染数据源提供的数据）
```
"layers": []
```
每个图层 `layer` 都有 `id`（具有唯一性）和 `type` 属性，其中 type 属性指定了其具体的渲染类型：

* `fill`：填充
* `line`：线
* `circle`：圆点
* `symbol`：符号
* `background`：背景
* `raster`：栅格
* `heatmap`：热力图
* `hillshade`：坡面阴影
* `fill-extrusion`：三维填充

### (1) fill
`fill`：填充（用于给多边形 `polygon` 进行填充和描边）
```
"layers": [
    {
        "id": "fill-id", // 唯一 id （必填）
        "type": "fill", // 类型（必填）
        "metadata": { // 元数据（可选，用于为 layer 附加任意的属性。为避免冲突，建议添加前缀，如 mapbox:）
            "mapbox:name": "test"
        },
        "source": "source-name", // 数据源的名称（除了 layer 的 type 为 background 外，source 必填） 
        "source-layer": "source-layer-name", // 数据源的图层（只有数据源 source 的 type 为 vector 时，才能设置 source-layer，其他类型的不可以设置）
        "minzoom": 0, // 最小层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 小于此 minzoom 时，layer 将被隐藏）
        "maxzoom": 24, // 最大层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 大于此 maxzoom 时，layer 将被隐藏）
        "filter": [], // 过滤（可选，用特定的表达式过滤指定的数据源的要素。具体的表达式详见 expression）
        "layout": { // 布局类属性
            "visibility": "visible", // 可见性（可选，可选值为 none、visible，默认值为 visible）
        },
        "paint": { // 绘制类属性
            "fill-antialias": true, // 填充时是否反锯齿（可选，默认值为 true）
            "fill-opacity": 1, // 填充的不透明度（可选，取值范围为 0 ~ 1，默认值为 1）
            "fill-pattern": "", // 填充用的图案（可选，这里填写在 sprite 雪碧图中图标名称。为了图案能无缝填充，图标的高宽需要是 2 的倍数）
            "fill-color": "#000000", // 填充的颜色（可选，默认值为 #000000。如果设置了 fill-pattern，则 fill-color 将无效）
            "fill-outline-color": "#000000", // 描边的颜色（可选，默认和 fill-color 一致。如果设置了 fill-pattern，则 fill-outline-color 将无效。为了使用此属性，还需要设置 fill-antialias 为 true）
            "fill-translate": [0, 0], // 填充的平移（可选，通过平移 [x, y] 达到一定的偏移量。默认值为 [0, 0]，单位：像素。）
            "fill-translate-anchor": "map" // 平移的锚点，即相对的参考物（可选，可选值为 map、viewport，默认为 map）
        }
    }
]
```

### (2) line
`line`：线（用于绘制成一条条线）
```
"layers": [
    {
        "id": "line-id", // 唯一 id （必填）
        "type": "line", // 类型（必填）
        "metadata": { // 元数据（可选，用于为 layer 附加任意的属性。为避免冲突，建议添加前缀，如 mapbox:）
            "mapbox:name": "test"
        },
        "source": "source-name", // 数据源的名称（除了 layer 的 type 为 background 外，source 必填） 
        "source-layer": "source-layer-name", // 数据源的图层（只有数据源 source 的 type 为 vector 时，才能设置 source-layer，其他类型的不可以设置）
        "minzoom": 0, // 最小层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 小于此 minzoom 时，layer 将被隐藏）
        "maxzoom": 24, // 最大层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 大于此 maxzoom 时，layer 将被隐藏）
        "filter": [], // 过滤（可选，用特定的表达式过滤指定的数据源的要素。具体的表达式详见 expression）
        "layout": { // 布局类属性
            "visibility": "visible", // 可见性（可选，可选值为 none、visible，默认值为 visible）
            "line-cap": "butt", // 线末端的显示样式（可选，可选值为 butt、round、square，默认值为 butt）
            // --- butt：方型末端（仅绘制到线的端点）
            // --- round：圆型末端（以线宽的 1/2 为半径，以线的端点为圆心，绘制圆型端点，会超出线的端点）
            // --- square：方型末端（以线宽的 1/2 长度超出线的端点）
            "line-join": "miter", // 线交叉时的显示样式（可选，可选值为 bevel、round、miter，默认值为 miter）
            // --- bevel：方型交点（以线宽的 1/2 长度超出线的交点）
            // --- round：圆型交点（以线宽的 1/2 为半径，以线的交点为圆心，绘制圆型交点，会超出线的交点）
            // --- miter：尖型交点（以两线段的外沿相交，超出交点绘制）
            "line-miter-limit": 2, // 最大斜接长度（可选，用来将 miter 尖型交点自动转为 bevel 方型交点，默认值为 2。只有 line-join 为 miter 时，才需要设置此属性）
            "line-round-limit": 1.05, // 最小圆角半径（可选，用来将 round 圆型交点自动转为 miter 尖型交点，默认值为 1.05。只有 line-join 为 round 时，才需要设置此属性）
        },
        "paint": { // 绘制类属性
            "line-opacity": 1, // 线的不透明度（可选，取值范围为 0 ~ 1，默认值为 1）
            "line-pattern": "", // 线用的图案（可选，这里填写在 sprite 雪碧图中图标名称。为了图案能无缝填充，图标的高宽需要是 2 的倍数）
            "line-color": "#000000", // 线的颜色（可选，默认值为 #000000。如果设置了 line-pattern，则 line-color 将无效）
            "line-translate": [0, 0], // 线的平移（可选，通过平移 [x, y] 达到一定的偏移量。默认值为 [0, 0]，单位：像素。）
            "line-translate-anchor": "map", // 线的平移锚点，即相对的参考物（可选，可选值为 map、viewport，默认为 map）
            "line-width": 1, // 线的宽度（可选，值 >= 0，默认值为 1，单位：像素）
            "line-gap-width": 0, // 线的外部间距宽度（可选，值 >= 0，默认值为 0，单位：像素。用来在线的外部再绘制一部分，此值表示内间距）
            "line-offset": 0, // 线的偏移（可选，默认值为 0，单位：像素。对于单线，则是向右的偏移量；对于多边形，正值为内缩 inset，负值为外突 outset）
            "line-blur": 0, // 线的模糊度（可选，值 >= 0，默认值为 0，单位：像素）
            "line-dasharray": [0, 0], // 虚线的破折号部分和间隔的长度（可选，默认值为 [0, 0]。如果设置了 line-pattern，则 line-dasharray 将无效）
            "line-gradient": "#000000", // 线的渐变色（可选。如果设置了 line-pattern 或 line-dasharray，则 line-gradient 将无效。只有数据源 source 的 type 为 geojson ，且 source 的 lineMetrics 为 true 时，line-gradient 才有效）
        }
    }
]
```

### (3) circle
`circle`：圆点（用于绘制成一个个圆点）
```
"layers": [
    {
        "id": "circle-id", // 唯一 id （必填）
        "type": "circle", // 类型（必填）
        "metadata": { // 元数据（可选，用于为 layer 附加任意的属性。为避免冲突，建议添加前缀，如 mapbox:）
            "mapbox:name": "test"
        },
        "source": "source-name", // 数据源的名称（除了 layer 的 type 为 background 外，source 必填） 
        "source-layer": "source-layer-name", // 数据源的图层（只有数据源 source 的 type 为 vector 时，才能设置 source-layer，其他类型的不可以设置）
        "minzoom": 0, // 最小层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 小于此 minzoom 时，layer 将被隐藏）
        "maxzoom": 24, // 最大层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 大于此 maxzoom 时，layer 将被隐藏）
        "filter": [], // 过滤（可选，用特定的表达式过滤指定的数据源的要素。具体的表达式详见 expression）
        "layout": { // 布局类属性
            "visibility": "visible", // 可见性（可选，可选值为 none、visible，默认值为 visible）
        },
        "paint": { // 绘制类属性
            "circle-opacity": 1, // 圆点的不透明度（可选，取值范围为 0 ~ 1，默认值为 1）
            "circle-radius": 5, // 圆点的半径（可选，值 >= 0，默认值为 5，单位：像素）
            "circle-color": "#000000", // 圆点的颜色（可选，默认值为 #000000）
            "circle-blur": 0, // 圆点的虚化（可选，默认值为 0。当值为 1 时，表示把圆虚化到只有圆心是不透明的）
            "circle-translate": [0, 0], // 圆点的平移（可选，通过平移 [x, y] 达到一定的偏移量。默认值为 [0, 0]，单位：像素。）
            "circle-translate-anchor": "map", // 圆点的平移锚点，即相对的参考物（可选，可选值为 map、viewport，默认为 map）
            "circle-pitch-scale": "map", // 地图倾斜时圆点的缩放（可选，可选值为 map、viewport，默认为 map。值为 viewport 时，圆点不会缩放）
            "circle-pitch-alignment": "map", // 地图倾斜时圆点的对齐方式（可选，可选值为 map、viewport，默认为 map）
            "circle-stroke-width": 0, // 圆点的描边宽度（可选，值 >= 0，默认值为 0，单位：像素）
            "circle-stroke-color": "#000000", // 圆点的描边颜色（可选，默认值为 #000000）
            "circle-stroke-opacity": 1 // 圆点的描边不透明度（可选，取值范围为 0 ~ 1，默认值为 1）
        }
    }
]
```

### (4) symbol
`symbol`：符号（用于绘制成一个个图标或者文本标签等）
```
"layers": [
    {
        "id": "symbol-id", // 唯一 id （必填）
        "type": "symbol", // 类型（必填）
        "metadata": { // 元数据（可选，用于为 layer 附加任意的属性。为避免冲突，建议添加前缀，如 mapbox:）
            "mapbox:name": "test"
        },
        "source": "source-name", // 数据源的名称（除了 layer 的 type 为 background 外，source 必填） 
        "source-layer": "source-layer-name", // 数据源的图层（只有数据源 source 的 type 为 vector 时，才能设置 source-layer，其他类型的不可以设置）
        "minzoom": 0, // 最小层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 小于此 minzoom 时，layer 将被隐藏）
        "maxzoom": 24, // 最大层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 大于此 maxzoom 时，layer 将被隐藏）
        "filter": [], // 过滤（可选，用特定的表达式过滤指定的数据源的要素。具体的表达式详见 expression）
        "layout": { // 布局类属性
            "visibility": "visible", // 可见性（可选，可选值为 none、visible，默认值为 visible）
            "symbol-placement": "point", // 符号的位置（可选，可选值为 point、line、line-center，默认值为 point）
            // --- point：符号在几何形状的点上
            // --- line：符号在几何形状的线上（几何形状只能为 LineString 或 Polygon）
            // --- line-center：符号在几何形状的线的中心点上（几何形状只能为 LineString 或 Polygon）
            "symbol-spacing": 250, // 符号之间的距离（可选，值 >= 1，默认值为 250，单位：像素。只有 symbol-placement 为 line 时才有效）
            "symbol-avoid-edges": false, // 是否避免边缘冲突（可选，默认值为 false。当为 true 时，符号不会超过切片的边缘）
            "symbol-sort-key": 1, // 排序的参考值（可选，无默认值。值越大，越在上方） 
            "symbol-z-order": "auto", // z 轴上的顺序控制（可选，可选值为 auto、viewport-y、source，默认值为 auto）
            
            // 图标类属性（需要设置 icon-image）
            "icon-image": "", // 图标的图片（可选，这里填写在 sprite 雪碧图中图标名称）
            "icon-size": 1, // 图标的大小（可选，值 >= 0，默认值为 1。这里实际上是图标对应的原始图片的大小的缩放比例。值为 1 表示图标大小为原始图片的大小）
            "icon-padding": 2, // 图标的外边距（可选，值 >= 0，默认值为 2。可用于碰撞检测）
            "icon-offset": [0, 0], // 图标的偏移量（可选，默认值为 [0, 0]）
            "icon-anchor": "center", // 图标与锚点的位置关系（可选，可选值为 center、left、right、top、bottom、top-left、top-right、bottom-left、bottom-right，默认值为 center）
            "icon-rotation": 0, // 图标的顺时针旋转角度（可选，默认值为 0，单位：角度）
            "icon-allow-overlap": false, // 是否允许图标重叠（可选，默认值为 false。当值为 true 时，图标即使和其他符号触碰也会显示）
            "icon-ignore-placement": false, // 是否忽略图标位置（可选，默认值为 false。当值为 true 时，其他符号即使与此图标触碰也会显示）
            "icon-optional": false, // 图标是否可不显示（可选，默认值为 false。当值为 true 时，如果图标与文本标签碰撞，则显示文本标签）
            "icon-text-fit": "none", // 图标与文本的大小适应关系（可选，可选值为 none、width、height、both，默认值为 none）
            // --- none：图标按其本身的比例显示
            // --- width：图标在 x 轴上缩放以适应文本的宽度
            // --- height：图标在 y 轴上缩放以适应文本的高度
            // --- both：图标在 x 和 y 轴上缩放以适应文本的宽高
            "icon-text-fit-padding": [0, 0, 0, 0], // 图标与文本的内边距（可选，默认值为 [0,0,0,0]，单位：像素）
            "icon-keep-upright": false, // 当 icon-rotation-alignment 为 map，且 symbol-placement 为 line 或者 line-center 时，设置为 true 的话，可以避免图标上下颠倒
            "icon-rotation-alignment": "auto", // 地图旋转时图标的对齐方式（可选，可选值为 map、viewport、auto，默认值为 auto）
            // --- map：当 symbol-placement 为 point 时，图标与地图的东西方向对齐；当 symbol-placement 为 line 时，图标的 x 轴和线对齐
            // --- viewport：图标的 x 轴和视口的 x 轴对齐
            // --- auto：当 symbol-placement 为 point 时，和 viewport 一致；当 symbol-placement 为 line 时，和 map 一致
            "icon-pitch-alignment": "auto", // 地图倾斜时图标的对齐方式（可选，可选值为 map、viewport、auto，默认值为 auto）
            // --- map：图标的 x 轴与地图平面对齐
            // --- viewport：图标的 x 轴和视口的 x 轴对齐
            // --- auto：当 symbol-placement 为 point 时，和 viewport 一致；当 symbol-placement 为 line 时，和 map 一致
            
            // 文本类属性（需要指定 text-field）
            "text-rotation-alignment": "auto", // 与 icon-rotation-alignment 类似
            "text-pitch-alignment": "auto", // 与 icon-pitch-alignment 类似
            "text-field": "", // 文本所对应的字段（可选，默认值为 ""）
            "text-font": ["Open Sans Regular","Arial Unicode MS Regular"], // 文本的字体集合（可选，默认值为 ["Open Sans Regular","Arial Unicode MS Regular"]）
            "text-size": 16, // 文本的大小（可选，默认值为 16，单位：像素）
            "text-max-width": 10, // 文本的最大宽度，超过则折行（可选，默认值为 10，单位：ems） 
            "text-line-height": 1.2, // 文本的行高（可选，默认值为 1.2，单位：ems）
            "text-letter-spacing": 0, // 文本的字符间距（可选，默认值为 0，单位：ems）
            "text-justify": "center", // 文本的水平对齐方式（可选，可选值为 auto、left、center、right。默认值为 center）
            "text-anchor": "center", // 文本与锚点的位置关系（可选，可选值为 center、left、right、top、bottom、top-left、top-right、bottom-left、bottom-right，默认值为 center）
            "text-variable-anchor": "center", // 与 text-anchor（优先级更高） 类似，有点不懂
            "text-max-angle": 45, // 当 symbol-placement 为 line 或 line-center 时，文本相邻字符的最大夹角，默认 45 度
            "text-rotate": 0, // 文本的顺时针旋转角度（可选，默认值为 0，单位：角度）
            "text-padding": 2, // 文本的外边距（可选，值 >= 0，默认值为 2。可用于碰撞检测）
            "text-keep-upright": false, // 当 icon-rotation-alignment 为 map，且 symbol-placement 为 line 或者 line-center 时，设置为 true 的话，可以避免文本上下颠倒
            "text-transform": "none", // 文本大小写转换（可选，可选值为 none、uppercase、lowercase，默认值为 none）
            "text-offset": [0, 0], // 图标的偏移量（可选，默认值为 [0, 0]）
            "text-radial-offset": 0, // 文本的径向偏移量，优先级比 text-offset 高
            "text-allow-overlap": false, // 是否允许文本重叠（可选，默认值为 false。当值为 true 时，文本即使和其他符号触碰也会显示）
            "text-ignore-placement": false, // 是否忽略文本位置（可选，默认值为 false。当值为 true 时，其他符号即使与此文本触碰也会显示）
            "text-optional": false // 文本是否可不显示（可选，默认值为 false。当值为 true 时，如果文本与图标碰撞，则显示图标）
            
        },
        "paint": { // 绘制类属性
            
            // 图标类属性（需要设置 icon-image）
            "icon-opacity": 1, // 图标的不透明度（可选，取值范围为 0 ~ 1，默认值为 1）
            "icon-color": "#000000", // 图标的颜色（可选，默认值为 #000000）
            "icon-halo-color": "rgba(0,0,0,0)", // 图标的光晕颜色（可选，默认值为 rgba(0,0,0,0)）
            "icon-halo-width": 0, // 图标的光晕宽度（可选，值 >= 0，默认值为 0，单位：像素）
            "icon-halo-blur": 0, // 图标的光晕模糊宽度（可选，值 >= 0，默认值为 0，单位：像素）
            "icon-translate": [0, 0], // 图标的平移（可选，通过平移 [x, y] 达到一定的偏移量。默认值为 [0, 0]，单位：像素。）
            "icon-translate-anchor": "map", // 图标的平移锚点，即相对的参考物（可选，可选值为 map、viewport，默认为 map）
            
            // 文本类属性（需要设置 text-field）
            "text-opacity": 1, // 文本的不透明度（可选，取值范围为 0 ~ 1，默认值为 1）
            "text-color": "#000000", // 文本的颜色（可选，默认值为 #000000）
            "text-halo-color": "rgba(0,0,0,0)", // 文本的光晕颜色（可选，默认值为 rgba(0,0,0,0)）
            "text-halo-width": 0, // 文本的光晕宽度（可选，值 >= 0，默认值为 0，单位：像素）
            "text-halo-blur": 0, // 文本的光晕模糊宽度（可选，值 >= 0，默认值为 0，单位：像素）
            "text-translate": [0, 0], // 文本的平移（可选，通过平移 [x, y] 达到一定的偏移量。默认值为 [0, 0]，单位：像素。）
            "text-translate-anchor": "map", // 文本的平移锚点，即相对的参考物（可选，可选值为 map、viewport，默认为 map）
        }
    }
]
```

### (5) background
`background`：背景（用于绘制成整个地图的背景或者图案）
```
"layers": [
    {
        "id": "background-id", // 唯一 id （必填）
        "type": "background", // 类型（必填）
        "metadata": { // 元数据（可选，用于为 layer 附加任意的属性。为避免冲突，建议添加前缀，如 mapbox:）
            "mapbox:name": "test"
        },
        "minzoom": 0, // 最小层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 小于此 minzoom 时，layer 将被隐藏）
        "maxzoom": 24, // 最大层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 大于此 maxzoom 时，layer 将被隐藏）
        "layout": { // 布局类属性
            "visibility": "visible", // 可见性（可选，可选值为 none、visible，默认值为 visible）
        },
        "paint": { // 绘制类属性
            "background-color": "#000000", // 背景颜色（可选，默认值为 #000000。如果设置了 background-pattern，则 background-color 将无效）
            "background-pattern": "", // 背景图案（可选，这里填写在 sprite 雪碧图中图标名称。为了背景图案能无缝填充，图标的高宽需要是 2 的倍数）
            "background-opacity": 1 // 背景不透明度（可选，取值范围为 0 ~ 1，默认值为 1） 
        }
    }
]
```

### (6) raster
`raster`：栅格（用于绘制栅格地图，比如卫星影像）
```
"layers": [
    {
        "id": "raster-id", // 唯一 id （必填）
        "type": "raster", // 类型（必填）
        "metadata": { // 元数据（可选，用于为 layer 附加任意的属性。为避免冲突，建议添加前缀，如 mapbox:）
            "mapbox:name": "test"
        },
        "source": "source-name", // 数据源的名称（除了 layer 的 type 为 background 外，source 必填） 
        "source-layer": "source-layer-name", // 数据源的图层（只有数据源 source 的 type 为 vector 时，才能设置 source-layer，其他类型的不可以设置）
        "minzoom": 0, // 最小层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 小于此 minzoom 时，layer 将被隐藏）
        "maxzoom": 24, // 最大层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 大于此 maxzoom 时，layer 将被隐藏）
        "filter": [], // 过滤（可选，用特定的表达式过滤指定的数据源的要素。具体的表达式详见 expression）
        "layout": { // 布局类属性
            "visibility": "visible", // 可见性（可选，可选值为 none、visible，默认值为 visible）
        },
        "paint": { // 绘制类属性
            "raster-opacity": 1, // 图片的不透明度（可选，取值范围为 0 ~ 1，默认值为 1）
            "raster-hue-rotate": 0, // 在色轮上旋转色相的角度（可选，默认值为 0，单位：角度）
            "raster-brightness-min": 0, // 图片的最小亮度（可选，取值范围为 0 ~ 1，默认值为 0）
            "raster-brightness-max": 1, // 图片的最大亮度（可选，取值范围为 0 ~ 1，默认值为 1）
            "raster-saturation": 0, // 图片的饱和度（可选，取值范围为 -1 ~ 1，默认值为 0）
            "raster-contrast": 0, // 图片的对比度（可选，取值范围为 -1 ~ 1，默认值为 0）
            "raster-resampling": "linear", // 采样方式（可选，可选值为 linear、nearest，默认值为 linear） 
            "raster-fade-duration": 300 // 切换瓦片时的渐隐时间（可选，默认值为 300，单位：毫秒）
        }
    }
]
```

### (7) heatmap
`heatmap`：热力图（用于绘制成热力图的效果）
```
"layers": [
    {
        "id": "heatmap-id", // 唯一 id （必填）
        "type": "heatmap", // 类型（必填）
        "metadata": { // 元数据（可选，用于为 layer 附加任意的属性。为避免冲突，建议添加前缀，如 mapbox:）
            "mapbox:name": "test"
        },
        "source": "source-name", // 数据源的名称（除了 layer 的 type 为 background 外，source 必填） 
        "source-layer": "source-layer-name", // 数据源的图层（只有数据源 source 的 type 为 vector 时，才能设置 source-layer，其他类型的不可以设置）
        "minzoom": 0, // 最小层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 小于此 minzoom 时，layer 将被隐藏）
        "maxzoom": 24, // 最大层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 大于此 maxzoom 时，layer 将被隐藏）
        "filter": [], // 过滤（可选，用特定的表达式过滤指定的数据源的要素。具体的表达式详见 expression）
        "layout": { // 布局类属性
            "visibility": "visible", // 可见性（可选，可选值为 none、visible，默认值为 visible）
        },
        "paint": { // 绘制类属性
            "heatmap-opacity": 1, // 热力图的不透明度（可选，取值范围为 0 ~ 1，默认值为 1）
            "heatmap-radius": 30, // 一个热力图点的影响半径（可选，值 >= 1，默认值为 30，单位：像素）
            "heatmap-weight": 1, // 一个热力图点的权重（可选，值 >= 0，默认值为 1）
            "heatmap-intensity": 1, // 热力图的强度，控制了所有的热力图点（可选，值 >= 0，默认值为 1）
            "heatmap-color": [ // 热力图的颜色变化（可选，默认值如下）
                "interpolate", ["linear"], ["heatmap-density"],
                0, "rgba(0, 0, 255, 0)",
                0.1, "royalblue",
                0.3, "cyan",
                0.5, "lime",
                0.7, "yellow",
                1, "red"
            ]
        }
    }
]
```

### (8) hillshade
`hillshade`：坡面阴影（基于 `DEM` 数字高程模型进行坡面阴影的可视化渲染）
```
"layers": [
    {
        "id": "hillshade-id", // 唯一 id （必填）
        "type": "hillshade", // 类型（必填）
        "metadata": { // 元数据（可选，用于为 layer 附加任意的属性。为避免冲突，建议添加前缀，如 mapbox:）
            "mapbox:name": "test"
        },
        "source": "source-name", // 数据源的名称（除了 layer 的 type 为 background 外，source 必填） 
        "source-layer": "source-layer-name", // 数据源的图层（只有数据源 source 的 type 为 vector 时，才能设置 source-layer，其他类型的不可以设置）
        "minzoom": 0, // 最小层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 小于此 minzoom 时，layer 将被隐藏）
        "maxzoom": 24, // 最大层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 大于此 maxzoom 时，layer 将被隐藏）
        "filter": [], // 过滤（可选，用特定的表达式过滤指定的数据源的要素。具体的表达式详见 expression）
        "layout": { // 布局类属性
            "visibility": "visible", // 可见性（可选，可选值为 none、visible，默认值为 visible）
        },
        "paint": { // 绘制类属性
            "hillshade-illumination-direction": 335, // 光照的方向（可选，取值范围为 0 ~ 359，默认值为 335，单位：角度）
            "hillshade-illumination-anchor": "viewport", // 光照的锚点（可选，可选值为 map、viewport，默认值为 viewport）
            "hillshade-exaggeration": 0.5, // 阴影的强度（可选，取值范围为 0 ~ 1，默认值为 0.5）
            "hillshade-shadow-color": "#000000", // 阴影的颜色（可选，默认值为 #000000）
            "hillshade-highlight-color": "#ffffff", // 光照部分的颜色（可选，默认值为 #ffffff）
            "hillshade-accent-color": "#000000" // 用于强调地形的颜色（可选，默认值为 #000000）
        }
    }
]
```

### (9) fill-extrusion
`fill-extrusion`：三维填充（用于给三维多边形进行填充和描边）
```
"layers": [
    {
        "id": "fill-extrusion-id", // 唯一 id （必填）
        "type": "fill-extrusion", // 类型（必填）
        "metadata": { // 元数据（可选，用于为 layer 附加任意的属性。为避免冲突，建议添加前缀，如 mapbox:）
            "mapbox:name": "test"
        },
        "source": "source-name", // 数据源的名称（除了 layer 的 type 为 background 外，source 必填） 
        "source-layer": "source-layer-name", // 数据源的图层（只有数据源 source 的 type 为 vector 时，才能设置 source-layer，其他类型的不可以设置）
        "minzoom": 0, // 最小层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 小于此 minzoom 时，layer 将被隐藏）
        "maxzoom": 24, // 最大层级（可选，取值范围为 0 ~ 24。当 style 的 zoom 大于此 maxzoom 时，layer 将被隐藏）
        "filter": [], // 过滤（可选，用特定的表达式过滤指定的数据源的要素。具体的表达式详见 expression）
        "layout": { // 布局类属性
            "visibility": "visible", // 可见性（可选，可选值为 none、visible，默认值为 visible）
        },
        "paint": { // 绘制类属性
            "fill-extrusion-opacity": 1, // 三维填充的不透明度（可选，取值范围为 0 ~ 1，默认值为 1）
            "fill-extrusion-pattern": "", // 三维填充的图案（可选，这里填写在 sprite 雪碧图中图标名称。为了图案能无缝填充，图标的高宽需要是 2 的倍数）
            "fill-extrusion-color": "#000000", // 三维填充的颜色（可选，默认值为 #000000）
            "fill-extrusion-translate": [0, 0], // 三维填充的平移（可选，通过平移 [x, y] 达到一定的偏移量。默认值为 [0, 0]，单位：像素。）
            "fill-extrusion-translate-anchor": "map", // 平移的锚点，即相对的参考物（可选，可选值为 map、viewport，默认为 map）
            "fill-extrusion-height": 0, // 三维填充的高度（可选，值 >= 0，默认值为 0，单位：米）
            "fill-extrusion-base": 0, // 三维填充的底部高度（可选，值 >= 0，默认值为 0，单位：米。值必须小于等于 fill-extrusion-height）
            "fill-extrusion-vertical-gradient": true, // 是否开启垂直渐变（可选，默认值为 true）
        }
    }
]
```

## 14. Expressions
`Expressions`：表达式集合（并非 `style` 的属性，只是 `layer` 的任何 `layout` 布局属性和 `paint` 绘制属性，以及 `filter` 属性等，它们的值都可以指定成一个表达式 `Expression`）

一个 `Expression` 定义了一个公式，总体来说可以将公式中的操作符分为以下 `5` 种：

* `Mathematical operators`：数学操作符，用来对数值进行数学运算
* `Logical operators`：逻辑操作符，用来计算布尔值和条件控制
* `String operators`：字符串操作符，用来操作字符串
* `Data operators`：数据操作符，用来访问数据源中的要素 `feature`
* `Camera operators`：照相机操作符，用来访问当前地图视图的各个参数

`Expressions` 是 `Expression` 的集合。而 `Expression` 是以 `JSON` 数组的形式来表示的，数组的第一个元素是 `Expression` 的操作符的名称，后续的元素表示操作的参数（也可以是一个 `Expression`）。
```
[expression_name, argument_0, argument_1, expression_1, ...]
```
由以上 `5` 种操作符，相应地可以推出 `5` 种表达式集合 `Expressions`，并且相互之间可以组合使用：

* `Mathematical expressions`
* `Logical expressions`
* `String expressions`
* `Data expressions`
* `Camera expressions`

这里主要讲述 `Data expressions` 和 `Camera expressions`。

### (1) Data expressions
一个 `data expression` 是可以访问要素数据的任何表达式。而这些表达式使用了以下至少一种数据操作符：

* `get`：用于获取要素的属性值，格式为 `["get", "property_name"]`，余下具体的可以看 `Expression reference`
* `has`
* `id`
* `geometry-type`
* `properties`
* `feature-state`

通过 `data expression` 可以实现区分同一个图层中的不同要素，并以不同的形式呈现。比如设置颜色 circle-color：
```
{
    "circle-color": [
        "rgb", // rgb 操作符，用于表达颜色：rgb(red, green, blue)
        ["get", "temperature"], // 获取属性 temperature 的值，作为 rgb 中的 red 的值
        0, // rgb 中的 green 始终为 0
        ["-", 100, ["get", "temperature"]] // 用 100 减去属性 temperature 的值，作为 rgb 中的 blue 的值
    ]
}
```
需要注意的是，并非所有的 `layout` 布局类属性和 `paint` 绘制类属性都支持 `data expression`：

> 具体可以看 `SDK Support` 中的 `data-driven styling` 那一行；
>
> 而且使用了 `feature-state` 操作符的 `data expression` 仅在 `paint` 绘制类属性中可用。

以下是官网中记录的暂不支持数据表达式 `data expression` 的属性：
```
[
"fill-antialias",
"fill-translate",
"fill-translate-anchor",
"line-cap",
"line-miter-limit",
"line-round-limit",
"visibility",
"line-translate",
"line-translate-anchor",
"line-dasharray",
"line-gradient",
"symbol-placement",
"symbol-spacing",
"symbol-avoid-edges",
"symbol-z-order",
"icon-allow-overlap",
"icon-ignore-placement",
"icon-optional",
"icon-rotation-alignment",
"icon-text-fit",
"icon-text-fit-padding",
"icon-padding",
"icon-keep-upright",
"icon-pitch-alignment",
"text-pitch-alignment",
"text-rotation-alignment",
"text-line-height",
"text-variable-anchor",
"text-max-angle",
"text-padding",
"text-keep-upright",
"text-allow-overlap",
"text-ignore-placement",
"text-optional",
"icon-translate",
"icon-translate-anchor",
"text-translate",
"text-translate-anchor",
"raster-opacity",
"raster-hue-rotate",
"raster-brightness-min",
"raster-brightness-max",
"raster-saturation",
"raster-contrast",
"raster-resampling",
"raster-fade-duration",
"circle-translate",
"circle-translate-anchor",
"circle-pitch-scale",
"circle-pitch-alignment",
"fill-extrusion-translate",
"fill-extrusion-translate-anchor",
"heatmap-intensity",
"heatmap-color",
"heatmap-opacity",
"hillshade-illumination-direction",
"hillshade-illumination-anchor",
"hillshade-exaggeration",
"hillshade-shadow-color",
"hillshade-highlight-color",
"hillshade-accent-color"
]
```

### (2) Camera expressions
一个 `camera expression` 是使用了 `zoom` 操作符的任何表达式。

通过 `camera expression` 可以实现图层 `layer` 根据地图的缩放层级 `zoom` 有不同的表现。 比如设置半径 `circle-radius`：
```
{
    "circle-radius": [
        "interpolate", ["linear"], ["zoom"], // 通过 interpolate 操作符，为 circle-radius 和 zoom 之间定义一种线性关系 linear
        5, 1, // 当 zoom <= 5 时，circle-radius 为 1（单位：px）
        // 当 5 < zoom < 10 时，circle-radius 的值在 1 ~ 5 之间线性分布
        10, 5 // 当 zoom >= 10 时，circle-radius 为 5（单位：px）
    ]
}
```
所有可以使用 `Expression` 的属性都支持 `camera expression`。不过当用于 `layout` 布局类属性和 `paint` 绘制类属性时，必须是以下几种格式：
``` 
[ "interpolate", interpolation, ["zoom"], ... ]
``` 
或
``` 
[ "step", ["zoom"], ... ]
```
或
```
[
    "let",
    ... variable bindings...,
    [ "interpolate", interpolation, ["zoom"], ... ]
]
```
或
```
[
    "let",
    ... variable bindings...,
    [ "step", ["zoom"], ... ]
]
```
为什么呢？因为 `["zoom"]` 在 `layout` 布局类属性和 `paint` 绘制类属性中仅作为 `interpolate` 或 `step` 操作的输入参数。

需要注意，`layout` 布局类属性和 `paint` 绘制类属性有一个很重要的区别：

> `layout` 布局类属性中使用的 `camera expression` 只有在 `zoom` 的值是 `整数变化` 时才会重新计算。
>
> `paint` 绘制类型属性中使用的 `camera expression` 在`zoom` 的值是 `小数变化` 时也会重新计算。比如 `zoom` 从 `4.1` 变为 `4.6`。

## 15. Expression reference
前面介绍了表达式集合 `Expressions`，简单地讲述了其中的 `Data expressions` 和 `Camera expressions`，而这些表达式里涉及和很多的操作符，这里就对每个操作符进行分类介绍，作为表达式的参考 `Expression reference`。

主要分为以下几类操作符：

* `Types`
* `Feature data`
* `Lookup`
* `Decision`
* `Decision`
* `Variable binding`
* `String`
* `Color`
* `Math`
* `Zoom`
* `Heatmap`

### (1) Types
`Types`：这类操作符用于 `断言` 和 `转换` 数据的类型，包含的操作符如下：
```
// (1) string  用于断言输入值是字符串。其对应的表达式有两种形式
["string", value]: string
["string", value, fallback: value, fallback: value, ...]: string

// (2) boolean  用于断言输入的值是布尔值，如果不是则会报错。其对应的表达式有两种形式
["boolean", value]: boolean
["boolean", value, fallback: value, fallback: value, ...]: boolean

// (3) number  用于断言输入值是数值，如果不是则会报错。其对应的表达式有两种形式
["number", value]: number
["number", value, fallback: value, fallback: value, ...]: number

// (4) number-format  用于将数值转换为指定格式的字符串
["number-format",
    input: number,
    options: { "locale": string, "currency": string, "min-fraction-digits": number, "max-fraction-digits": number }
]: string

// (5) object  用于断言输入值是对象。其对应的表达式有两种形式
["object", value]: object
["object", value, fallback: value, fallback: value, ...]: object

// (6) array  用于断言输入的值是数组，如果不是则会被终止。其对应的表达式有三种形式
["array", value]: array
["array", type: "string" | "number" | "boolean", value]: array<type>
["array", type: "string" | "number" | "boolean", N: number (literal), value]: array<type, N>

// (7) literal  用于提供数组或对象的字面量
["literal", [...] (JSON array literal)]: array<T, N>
["literal", {...} (JSON object literal)]: Object

// (8) collator  通过设定本地 IETF 语言标记校对比较符
["collator", { "case-sensitive": boolean, "diacritic-sensitive": boolean, "locale": string }]: collator

// (9) format  用于格式化特定文本的大小和字体等。常见于对同个属性字段 text-field 的不同值的处理
["format",
    input_1: string, options_1: { "font-scale": number, "text-font": array<string> },
    ...,
    input_n: string, options_n: { "font-scale": number, "text-font": array<string> }
]: formatted

// (10) to-string  用于转换输入值为字符串
["to-string", value]: string

// (11) to-boolean  用于转换输入值为布尔值
["to-boolean", value]: boolean

// (12) to-number  用于转换输入值为数值
["to-number", value, fallback: value, fallback: value, ...]: number

// (13) to-color  用于转换输入值为颜色
["to-color", value, fallback: value, fallback: value, ...]: color

// (14) typeof  用于得到输入值的类型
["typeof", value]: string
```

### (2) Feature data
`Feature data`：这类操作符用于操作要素的数据。
```
// (1) accumulated  获取一个群组的累计值。只限于 geojson 类型的数据源，并且设置了 cluster
["accumulated"]: value

// (2) feature-state  从当前的要素状态获取属性值。要素状态不是数据源里自带的，只能通过编程设置
["feature-state", string]: value

// (3) geometry-type  获取要素的几何类型。如 Point、MultiPoint、LineString、MultiLineString、Polygon、MultiPolygon
["geometry-type"]: string

// (4) id  获取要素的 id 属性值
["id"]: value

// (5) line-progress  获取渐变线的进度。只能用于设置了 line-gradient 的
["line-progress"]: number

// (6) properties  获取要素的属性对象。直接用表达式 ["get", "property_name"] 效率更高
["properties"]: object
```

### (3) Lookup
`Lookup`：这类操作符用于查找并获取值
```
// (1) at  根据指定的索引，获取数组中的元素
["at", number, array]: ItemType

// (2) get  根据指定的属性名，从当前要素或者指定的对象中获取属性值。其对应的表达式有两种形式
["get", string]: value
["get", string, object]: value

// (3) has  用于检测指定的属性在当前要素或者指定的对象中是否存在。其对应的表达式有两种形式
["has", string]: value
["has", string, object]: value

// (4) length  获取指定的数组、字符串的长度
["length", string | array | value]: number
```

### (4) Decision
`Decision`：这类操作符用于条件判断
```
// (1) !  取反
["!", boolean]: boolean

// (2) !=  判断两数是否相等
["!=", value, value]: boolean
["!=", value, value, collator]: boolean

// (3) <  判断第一个数是否小于第二个数
["<", value, value]: boolean
["<", value, value, collator]: boolean

// (4) <=  判断第一个数是否小于等于第二个数
["<=", value, value]: boolean
["<=", value, value, collator]: boolean

// (5) ==  判断第一个数是否等于第二个数
["==", value, value]: boolean
["==", value, value, collator]: boolean

// (6) >  判断第一个数是否大于第二个数
[">", value, value]: boolean
[">", value, value, collator]: boolean

// (7) >=  判断第一个数是否大于等于第二个数
[">=", value, value]: boolean
[">=", value, value, collator]: boolean

// (8) all  判断是否所有的都为 true
["all", boolean, boolean]: boolean
["all", boolean, boolean, ...]: boolean

// (9) any  判断是否有为 true 的
["any", boolean, boolean]: boolean
["any", boolean, boolean, ...]: boolean

// (10) case  满足指定条件，则返回指定的数据
["case",
    condition: boolean, output: OutputType,
    condition: boolean, output: OutputType,
    ...,
    fallback: OutputType
]: OutputType

// (11) coalesce  计算每个的值，直到获取到非空值，然后返回那个值
["coalesce", OutputType, OutputType, ...]: OutputType

// (12) match  当输入值（比如从属性中获取 ["get", "property_name"] ）与指定的值匹配时，返回相应的值。
["match",
    input: InputType (number or string),
    label: InputType | [InputType, InputType, ...], output: OutputType,
    label: InputType | [InputType, InputType, ...], output: OutputType,
    ...,
    fallback: OutputType
]: OutputType
```

### (5) Ramps, scales, curves
`Ramps, scales, curves`：这类操作符用于渐变、缩放、曲线等特殊效果的设置。
```
// (1) interpolate  通过在输入值和输出值之间进行插值，来生成持续、平滑的数据。输入值必须是数字，并且各个断点的值按升序排序，输出值可能是数字、数组或者颜色
["interpolate",
    interpolation: ["linear"] | ["exponential", base] | ["cubic-bezier", x1, y1, x2, y2 ],
    input: number,
    stop_input_1: number, stop_output_1: OutputType,
    stop_input_n: number, stop_output_n: OutputType, ...
]: OutputType (number, array<number>, or Color)

// (2) interpolate-hcl  类似 interpolate，不过输出值必须是颜色，并且插值属于 Hue-Chroma-Luminance 颜色空间
["interpolate-hcl",
    interpolation: ["linear"] | ["exponential", base] | ["cubic-bezier", x1, y1, x2, y2 ],
    input: number,
    stop_input_1: number, stop_output_1: Color,
    stop_input_n: number, stop_output_n: Color, ...
]: Color

// (3) interpolate-lab  类似 interpolate，不过输出值必须是颜色，并且插值属于 CIELAB 颜色空间
["interpolate-lab",
    interpolation: ["linear"] | ["exponential", base] | ["cubic-bezier", x1, y1, x2, y2 ],
    input: number,
    stop_input_1: number, stop_output_1: Color,
    stop_input_n: number, stop_output_n: Color, ...
]: Color

// (4) step  通过分段函数，来生成离散的、逐步的数据。
["step",
    input: number,
    stop_output_0: OutputType,
    stop_input_1: number, stop_output_1: OutputType,
    stop_input_n: number, stop_output_n: OutputType, ...
]: OutputType
```

### (6) Variable binding
`Variable binding`：这类操作符用于变量绑定。
```
// (1) let  绑定表达式给指定的变量
["let",
    string (alphanumeric literal), any, string (alphanumeric literal), any, ...,
    OutputType
]: OutputType

// (2) var  使用通过 let 绑定的变量
["var", previously bound variable name]: the type of the bound expression
```

### (7) String
`String`：这类操作符用于操作字符串。
```
// (1) concat  用于连接各个输入的字符串，得到连接后的字符串
["concat", value, value, ...]: string

// (2) downcase  将字符串转为小写
["downcase", string]: string

// (3) upcase  将字符串转为大写
["upcase", string]: string

// (4) resolved-locale  获取通过 collator 设置的 IETF 语言标记
["resolved-locale", collator]: string

// (5) is-supported-script 判断输入的字符串是否清晰（额...有点没明白）
["is-supported-script", string]: boolean
```

### (8) Color
`Color`：这类操作符用于操作颜色。
```
// (1) rgb  创建由 red、green、blue 组成的 rgb 颜色。每个值的取值范围为 0 ~ 255
["rgb", number, number, number]: color

// (2) rgba  创建由 red、green、blue、alpha 组成的 rgba 颜色。除了 alpha 取值范围为 0 ~ 1 外，其他值的取值范围为 0 ~ 255
["rgba", number, number, number, number]: color

// (3) to-rgba  转换颜色为 rgba 颜色对应的数组 [red, green, blue, alpha]
["to-rgba", color]: array<number, 4>
```

### (9) Math
`Math`：这类操作符用于数学运算。
```
// (1) +  取输入值的总和
["+", number, number, ...]: number

// (2) -  对于两个数，返回第一个数减去第二个数的结果；对于一个数，则返回 0 减去这个数的结果（相当于取相反数）
["-", number, number]: number
["-", number]: number

// (3) *  取输入值的乘积
["*", number, number, ...]: number

// (4) /  返回第一个数除以第二个数的结果（包含小数）
["/", number, number]: number

// (5) %  返回第一个数除以第二个数的余数
["%", number, number]: number

// (6) ^  返回第一个数的第二个数次方
["^", number, number]: number

// (7) abs  取绝对值
["abs", number]: number

// (8) acos  取反余弦值
["acos", number]: number

// (9) asin  取反正弦值
["asin", number]: number

// (10) atan  取反正切值
["atan", number]: number

// (11) ceil  取大于等于输入值的最大整数
["ceil", number]: number

// (12) cos  取余弦值
["cos", number]: number

// (13) e  取数学常数 e 
["e"]: number

// (14) floor  取小于等于输入值的最大整数
["floor", number]: number

// (15) ln  取输入值的自然对数
["ln", number]: number

// (16) ln2  取数学常数 ln(2)
["ln2"]: number

// (17) log10  取输入值以 10 为底的对数
["log10", number]: number

// (18) log2  取输入值以 2 为底的对数
["log2", number]: number

// (19) max  取输入值中的最大值
["max", number, number, ...]: number

// (20) min  取输入值中的最小值
["min", number, number, ...]: number

// (21) pi  取圆周率 pi
["pi"]: number

// (22) round  取输入值四舍五入后的值
["round", number]: number

// (23) sin  取正弦值
["sin", number]: number

// (24) sqrt  取平方根
["sqrt", number]: number

// (25) tan  取正切值
["tan", number]: number
```

### (10) Zoom
`Zoom`：这类操作符只包含一个操作符 `zoom`，用于获取当前地图的缩放层级。
```
["zoom"]: number
```

### (11) Heatmap
`Heatmap`：这类操作符只包含一个操作符 `heatmap-density`，用于获取热力图的密度（特定像素内有多少个数据点），只能在 `heatmap-color` 中使用。
```
["heatmap-density"]: number
```

## 16. Functions
之前介绍了表达式集合 `Expressions`，我们知道了 `layout` 布局类属性和 `paint` 绘制类属性的值都可以设为一个表达式 `Expression`。

同样地，函数 `Function` 也可以作为其 `layout`布局类属性和 `paint` 绘制类属性的属性值。

> 需要注意的是，在使用 Function 作为属性值时，实际上是一个对象 {}。
>
> ps：不晓得 Function 翻译成 “函数” 对不对，还是说翻译成 “功能”......

`Functions` 是 `Function` 的集合。`Function` 可以用来根据 `地图缩放层级` 和 `地图要素的属性` 来控制地图要素的呈现。所以可以分为三类：

* `Zoom functions`
* `Property functions`
* `Zoom-and-property functions`

### (1) Zoom functions
一个 `zoom function` 允许地图的呈现根据 地图的缩放层级 而改变。
```
{
     "circle-radius": {
         "stops": [ // 断点（除了 type 为 identity 外必填，由输入值和输出值为一组，作为数组的元素）
             [5, 1], // zoom 为 5 时，circle-radius 为 1 （单位：px）
             [10, 2] // zoom 为 10 时，circle-radius 为 2 （单位：px）
         ],
         "base": 1, // 插值计算的基数（可选，默认值为 1）
         "type": "interval", // 类型（可选，可选值为 identity、exponential、interval、categorical，默认值为 interval）
         // --- identity：一致型（将输入值作为输出值）
         // --- exponential：指数连续型（在断点之间生成插值）
         // --- interval：间隔型（输出值刚好小于输入值的一系列输出，呈阶梯状）
         // --- categorical：分类型（将和输入值一致的输出）
         "defaul": 1, // 默认值
         "colorSpace": "rgb", // 色彩空间（可选，可选值为 rgb、lab、hcl）
     }
}
```

### (2) Property functions
一个 `property function` 允许地图的呈现根据 地图要素的属性 而改变。
```
{
     "circle-color": {
         "property": "temperature", // 属性名（填写后 stops 的输入值就是对应的属性值）
         "stops": [ // 断点（除了 type 为 identity 外必填，由输入值和输出值为一组，作为数组的元素）
             [0, "blue"], // 属性 temperature 的值为 0 时，circle-color 为 blue 蓝色
             [100, "red"] // 属性 temperature 的值为 100 时，circle-color 为 red 红色
         ],
         "base": 1, // 插值计算的基数（可选，默认值为 1）
         "type": "interval", // 类型（可选，可选值为 identity、exponential、interval、categorical，默认值为 interval）
         // --- identity：一致型（将输入值作为输出值）
         // --- exponential：指数连续型（在断点之间生成插值）
         // --- interval：间隔型（输出值刚好小于输入值的一系列输出，呈阶梯状）
         // --- categorical：分类型（将和输入值一致的输出）
         "defaul": "#000000", // 默认值
         "colorSpace": "rgb", // 色彩空间（可选，可选值为 rgb、lab、hcl）
     }
}
```

### (3) Zoom-and-property functions
一个 `zoom-property function` 允许地图的呈现根据 地图的缩放层级 和 地图要素的属性 而改变。
```
{
     "circle-radius": {
         "property": "rating",
         "stops": [
             [{zoom: 0, value: 0}, 0], // 当 zoom 为 0，且属性 rating 值为 0 时，circle-radius 为 0，依次类推
             [{zoom: 0, value: 5}, 5],
             [{zoom: 20, value: 0}, 0],
             [{zoom: 20, value: 5}, 20]
         ],
         "base": 1, // 插值计算的基数（可选，默认值为 1）
         "type": "interval", // 类型（可选，可选值为 identity、exponential、interval、categorical，默认值为 interval）
         // --- identity：一致型（将输入值作为输出值）
         // --- exponential：指数连续型（在断点之间生成插值）
         // --- interval：间隔型（输出值刚好小于输入值的一系列输出，呈阶梯状）
         // --- categorical：分类型（将和输入值一致的输出）
         "defaul": "#000000", // 默认值
         "colorSpace": "rgb", // 色彩空间（可选，可选值为 rgb、lab、hcl）
     }
}
```
（完）

[原文](https://my.oschina.net/u/3185947/blog/4819218)













