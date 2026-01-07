
# 初始化Map

``` TypeScript @mapbox.svc.ts
const map = new mapboxgl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {},
    layers: []
  }
})
```

> 白色背景显示地图

# 墨卡托投影

``` TypeScript @mapbox.svc.ts
const map = new mapboxgl.Map({
  projection: 'mercator', // 初始为墨卡托(mercator) 无需配置
})
```

``` scss
#map {
  background-color: #021B3A;
}
```

![输入图片说明](./src/img/images/2026-01-07_13-45-01.png "")

# 球体

``` TypeScript @mapbox.svc.ts
const map = new mapboxgl.Map({
  projection: 'globe', // 球体(globe)
})
```

![输入图片说明](./src/img/images/2026-01-07_13-46-19.png "")

> ## WARN
> 球体海上没有填充颜色，看起来陆地漂浮在空中 \
> **需将背景层设置为所需的颜色**

``` TypeScript
const map = new mapboxgl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {},
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': '#021B3A',
        },
      },
    ],
  },
})
```

``` json @gismap_basics.json
  "styles": [
    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "#021B3A"
      }
    }
  ]
```

![输入图片说明](./src/img/images/2026-01-07_13-47-51.png "")

# 墨卡托投影与球体切换

``` TypeScript
public mapProjectionArr = reactive([
  { name: '墨卡托', type: 'mercator', isActive: true },
  { name: '球体', type: 'globe' }])

/** 地图显示切换 */
public mapprojection(type: string) {
  this.mapProjectionArr.forEach((v: any) => v.type === type ? v.isActive = true : v.isActive = false);
  this.map.setProjection(type);
  if (type == 'globe') {
    if (this.wind10mActived) {
      this.wind10mActived = false;
      this.removeWind();
    }

    this.map.setFog({
      "color": "#dc9f9f",
      "horizon-blend": 0.5,
      "high-color": "#245bde",
      "space-color": "#000000",
      "star-intensity": 0.15
    });
  }
  else {
    this.map.setFog(null); // 清除天空
  }
  this.handleMapcenter()
}

/** 地图中心 */
public handleMapcenter() {
  let mapcenter = (window as any)["mapCenter"];
  let mapzoom = (window as any)["mapZoom"];

  this.map.setCenter(mapcenter);
  this.map.setZoom(mapzoom);
  this.map.resetNorth();
  this.map.resetNorthPitch();
}
```
