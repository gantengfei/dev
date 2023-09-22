# 概述
通过前面的文章[初识mapbox GL](https://lzugis.blog.csdn.net/article/details/105079832)我们对mapbox GL有了一个相对比较全面的认识，本节结合一些示例，重点讲述一下mapbox GL里面的filter和paint的用法。

# 说明
本文中的示例数据源是北京的区边界数据，格式为geojson，数据字段与详情如下：
![输入图片说明](https://foruda.gitee.com/images/1688621879077333043/c99ccf2a_4993153.png "")

# filter
[filter](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#filter)是layer里面的一个属性，通过一些条件表达式实现仅显示与过滤器匹配的要素，即图层的过滤显示，其官方说明如下图：
![输入图片说明](https://foruda.gitee.com/images/1688622215092052349/768a6cad_4993153.png "")

## 1、==和!=
`==`和`!=`可实现根据某个字段图层的过滤展示。如：只在地图上展示昌平区或者在地图上展示除昌平外的所有区域。
``` JavaScript
// 只在地图上展示昌平区
var filter = ['==', 'name', '昌平区'];

//地图上展示除昌平外的所有区域
var filter = ['!=', 'name', '昌平区'];
```
![输入图片说明](https://foruda.gitee.com/images/1688622330072924229/f86072f7_4993153.png "")
![输入图片说明](https://foruda.gitee.com/images/1688622339501624675/fe48e7aa_4993153.png "")

## 2、>、>=、<、<=
`>、>=、<、<=`是通过比较大小的方式，实现图层的过滤，所以此处需要的字段得是数字类型或者通过to-number将字段转换成数字类型。如：展示`count>=10`的区域。
``` JavaScript
var filter = ['>=', 'count', 10];
```
![输入图片说明](https://foruda.gitee.com/images/1688622421296775175/891522c4_4993153.png "")

## 3、in和match
`in`和`match`都可实现对图层根据某个字段进行多值过滤。如：在地图上展示昌平区和海淀区。
``` JavaScript
// in
var filter = [
  'in',
  'name',
  '昌平区',
  '海淀区'
];
// match
var filter = [
  "match",
  [
    "get",
    "name"
  ],
  [
    "昌平区",
    "海淀区",
  ],
  true,
  false
]
```
![输入图片说明](https://foruda.gitee.com/images/1688622488236609364/a85de230_4993153.png "") \
接着上面的例子，如果我们要实现在地图中展示除海淀和昌平区外的其他区域，我们可以直接用!in和将match的条件互换的方式来实现，如下：
``` JavaScript
// in
var filter = [
  '!in',
  'name',
  '昌平区',
  '海淀区'
];
// match
var filter = [
  "match",
  [
    "get",
    "name"
  ],
  [
    "昌平区",
    "海淀区",
  ],
  false,
  true
]
```
![输入图片说明](https://foruda.gitee.com/images/1688622529969448466/0056eb1c_4993153.png "")

## 4、多条件
有时候，会存在多条件的过滤，例如：我们选择`type==1`并且`count>10`的区域，我们可以这么写：
``` JavaScript
var filter = [
  'all',
  ['>=', 'count', 10],
  ['==', 'type', 1]
]
```
![输入图片说明](https://foruda.gitee.com/images/1688622596749117953/183d8871_4993153.png "")
当然，有时我们会存在根据几何类型来进行过滤，此时，我们可用：
``` JavaScript
var filter = [
    "==",
    ["geometry-type"],
    "LineString"
  ];
```



# paint
`paint`是layer的一个属性，负责图层的渲染与呈现。

## 1、match
`match`通常用于枚举型的字段渲染，如唯一值渲染。
``` JavaScript
'circle-color': [
 'match',
 ['get', 'type'],
 1, '#FFD273',
 2, '#E86D68',
 '#A880FF'
]
```
![输入图片说明](https://foruda.gitee.com/images/1688622743802440396/27a37ab0_4993153.png "")

## 2、case
`case`通常用于分段数值型的字段渲染，值域是前关后开，如分级渲染。
``` JavaScript
'circle-color': [
  'case',
  ['<', ['get', 'speed'], 10.8], 'rgba(0,0,0,0)', //<10.8
  ['<', ['get', 'speed'], 17.2], 'rgba(153, 255, 153, .9)', //>=10.8 & <17.2
  ['<', ['get', 'speed'], 24.5], 'rgba(102, 204, 255, .9)',
  ['<', ['get', 'speed'], 32.7], 'rgba(255, 255, 102, .9)',
  ['<=', ['get', 'speed'], 41.5], 'rgba(253, 139, 0, .9)',
  ['<=', ['get', 'speed'], 50.1], 'rgba(255, 51, 0, .9)', //>=41.5 & <50.1
  'rgba(255, 0, 255, .9)' // 默认值, >=50.1
]
```
**注意：**\
1.第一个的判断是 `<`;\
2.中间的判断是 `>=` 和 `<` ;\
3.最后一个判断是 `>=` ;\
![输入图片说明](https://foruda.gitee.com/images/1688622862714649665/2d24b3eb_4993153.png "")

## 3、step
`step`和上面的`case`很类似，只是值域是前开后关的。
``` JavaScript
// <=100, 100-500, >500
"circle-color": [
  "step",
  ["get", "count"],
  "#51bbd6", 100,
  "#f1f075", 500,
  "#f28cb1" // other
]

'circle-color': [
  'step',
  ['to-number', ['get', 'CID']],
  '#0098A3',  10,
  '#00CA8D', 20,
  '#37C508', 30,
  '#98F300',  40,
  '#EFFF85'
]
```
**说明：**\
1.对于**非数值型**的字段，我们可以用`to-number`对字段进行转换。\
![输入图片说明](https://foruda.gitee.com/images/1688622995844752162/f39cd280_4993153.png "")

## 4、interpolate
`interpolate`，中文的翻译是“插值”，在mapbox GL中，我们可通过`interpolate`实现按照比例的插值渲染。
**说明：**\
1.`zoom`是一个特殊字符，特制地图的缩放级别，同样的还有`geometry-type`,特指的是geom类型。\
![输入图片说明](https://foruda.gitee.com/images/1688623065386349093/8c0fc69b_4993153.png "")



完整测试代码如下：
``` JavaScript
var rootPath = 'http://127.0.0.1:3000/mapbox/lib/';
// var filter = ['match', ['get', 'name'],
//   ['昌平区', '海淀区'], false, true
// ];
// var filter = ['!in', 'name', '昌平区', '海淀区'];

// var filter = [
//   'all',
//   ['>=', 'count', 10],
//   ['==', 'type', 1]
// ];

var filter = ['>=', 'count', 0];
// var fillColor = 'rgba(255, 0, 0, 0.5)';

// 唯一值图
// var fillColor = [
//   'match',
//   ['get', 'type'],
//   1, '#FFD273',
//   2, '#E86D68',
//   '#A880FF'
// ];

// 分级色彩图
// var fillColor = [
//   'case',
//   ['<', ['get', 'count'], 10], '#FFD273',
//   ['<', ['get', 'count'], 20], '#E86D68',
//   ['<', ['get', 'count'], 30], '#A880FF',
//   ['<', ['get', 'count'], 40], '#68E0E8',
//   ['<=', ['get', 'count'], 50], '#9BFF69',
//   '#000' // 默认值
// ];

// 比例符号图
var fillColor = [
  'interpolate',
  ['linear'],
  ['get', 'count'],
  15, '#FFD273',
  30, '#E86D68',
  50, '#9BFF69'
];

// 步长图
// var fillColor = [
//   'step',
//   ['get', 'count'],
//   '#0098A3',
//   10, '#00CA8D',
//   20, '#37C508',
//   30, '#98F300',
//   40, '#EFFF85'
// ]
var mapStyle = {
  "version": 8,
  "name": "Dark",
  "sources": {
    "geojson": {
      type: 'geojson',
      data: '../data/beijing.geojson'
    }
  },
  "glyphs": rootPath + "fonts/mapbox/{fontstack}/{range}.pbf",
  "layers": [{
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "#999"
      }
    },
    {
      'id': 'geojson',
      'source': 'geojson',
      'type': 'fill',
      'paint': {
        'fill-color': fillColor,
        'fill-opacity': .8
      },
      filter: filter
    },
    {
      'id': 'geojson-border',
      'source': 'geojson',
      'type': 'line',
      'paint': {
        'line-color': '#FFF',
        'line-width': 1.5
      },
      filter: filter
    },
    {
      'id': 'points',
      'type': 'symbol',
      'source': 'geojson',
      'layout': {
        'text-field': ['get', 'name'],
        "text-size": 22
      },
      paint: {
        'text-color': '#000000'
      },
      filter: filter
    }
  ]
};
map = new mapboxgl.Map({
  container: 'map',
  maxZoom: 18,
  minZoom: 6,
  zoom: 8,
  center: {
    lng: 116.6552,
    lat: 40.2482
  },
  style: mapStyle,
  attributionControl: false,
  localIdeographFontFamily: "'全新硬笔行书简'"
});
```


[原文](https://blog.csdn.net/GISShiXiSheng/article/details/105157145)
