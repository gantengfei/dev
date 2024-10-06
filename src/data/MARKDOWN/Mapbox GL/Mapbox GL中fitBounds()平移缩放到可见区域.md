
# 一、常规用法

> ## TIP
> Mapbox GL Js > Example \
> [Fit to the bounds of a LineString](https://docs.mapbox.com/mapbox-gl-js/example/zoomto-linestring/) \
> 官方案例：适合LineString的边界


1、一个多边形平移和缩放到地图可见区域范围内，`geojson`是多边形`"type":"Polygon"`类型。
``` TypeScript
const geojson = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'properties': {},
        'coordinates': [[[101.70515341063032,35.32805534825013],[101.70695177947175,35.32810705929711],[101.70994881854699,35.328199883913385],[101.71174677615375,35.32825955848108],[101.72163218058694,35.32860896863059],[101.70515341063032,35.32805534825013]]]
      }
    }
  ]
};

// LineString的地理坐标
const coordinates = geojson.features[0].geometry.coordinates[0];
// 创建一个'LngLatBounds'，两个角在第一个坐标。
const bounds = new mapboxgl.LngLatBounds(
  coordinates[0],
  coordinates[0]
);
// 扩展'LngLatBounds'以包含边界结果中的每个坐标。
for (const coord of coordinates) {
  bounds.extend(coord);
}
// 平移和缩放地图以将其可见区域包含在指定的地理范围内。如果在映射上设置了填充，则边界适合插入。
this.map.fitBounds(bounds, {
  padding: 80,
  // padding: { top: 80, bottom: 80, left: 80, right: 80 },
  maxZoom: 13
});
```

2、一段线段平移和缩放到地图可见区域范围内，`geojson`是线段`"type":"LineString"`类型。
``` TypeScript
const geojson = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'properties': {},
        'coordinates': [[-77.0366048812866, 38.89873175227713],[-77.03364372253417, 38.89876515143842],[-77.03364372253417, 38.89549195896866],[-77.02982425689697, 38.89549195896866],[-77.02400922775269, 38.89387200688839],[-77.01519012451172, 38.891416957534204],[-77.01521158218382, 38.892068305429156],[-77.00813055038452, 38.892051604275686],[-77.00832366943358, 38.89143365883688],[-77.00818419456482, 38.89082405874451],[-77.00815200805664, 38.88989712255097]]
      }
    }
  ]
};

// LineString的地理坐标
const coordinates = geojson.features[0].geometry.coordinates[0];
// 创建一个'LngLatBounds'，两个角在第一个坐标。
const bounds = new mapboxgl.LngLatBounds(
  coordinates[0],
  coordinates[0]
);
// 扩展'LngLatBounds'以包含边界结果中的每个坐标。
for (const coord of coordinates) {
  bounds.extend(coord);
}
// 平移和缩放地图以将其可见区域包含在指定的地理范围内。如果在映射上设置了填充，则边界适合插入。
this.map.fitBounds(bounds, {
  padding: 80,
  // padding: { top: 80, bottom: 80, left: 80, right: 80 },
  maxZoom: 13
});
```


# 二、多类型判断
将地图视图尽可能大地设定在给定的地理边界内
``` TypeScript
const init = async () => {
  let GeoJson = (await fileAction('./data/xxGeoJson.json')).data

  let coordinates: any = [];
  // const { geometry } = GeoJson.features[0]
  let geometry: any = {}
  if (GeoJson.type == 'FeatureCollection') {
    geometry = GeoJson.features[0].geometry
  } else if (GeoJson.type == 'Feature') {
    geometry = GeoJson.geometry
  }

  if (geometry.type == 'Polygon') {
    coordinates = geometry.coordinates[0]
  } else if (geometry.type == 'MultiPolygon') {
    geometry.coordinates.forEach((cooItem: any) => {
      coordinates = [...coordinates, ...cooItem[0]]
    })
  }

  const bounds = new mapboxgl.LngLatBounds(
    coordinates[0], coordinates[0]
  )

  for (const coord of coordinates) {
    bounds.extend(coord);
  }

  map.fitBounds(bounds, {
    // padding: { top: 16, bottom: 16, left: 16, right: 16 },
    padding: 16,
    maxZoom: 7
  })

}
```

# 三、区域掩膜图层
``` TypeScript
async setMaskArea(area: string, map: any = this.myMap) {
  const areaData = (await fileAction(`./data/${area}.json`)).data;

  const mask = turf.polygon([[[55.152, 20.585], [55.152, 56.111], [119.238, 56.111], [119.238, 20.585], [55.152, 20.585]]]);

  const masked = turf.mask(areaData, mask);

  const source = map.getSource('maskarea_source');
  if (source) {
    source.setData(masked);
  } else {
    map.addSource('maskarea_source', {
      "type": "geojson",
      "data": masked
    })

    const maskareaLayer = {
      "id": "maskarea",
      "type": "fill",
      "source": "maskarea_source",
      "layout": {},
      "paint": {
        "fill-color": "#FFF",
        "fill-opacity": 1
      }
    }
    map.addLayer(maskareaLayer, 'borderBoldLayer');
  }
}
```
