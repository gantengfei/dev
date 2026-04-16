# 动态设置地图中心点和等级
``` javascript
map.setCenter([0, 0]);
map.setZoom(9);
```

以上设置无动画效果相对生硬，使用`flyTo`改变任何组合的中心，变焦，轴承，和俯仰，动画过渡沿着曲线，唤起飞行。动画无缝地结合缩放和平移，以帮助用户保持他们的轴承，即使经过了很长的距离。

如果用户在其操作系统中启用了减少运动辅助功能，则动画将被跳过，这将等同于`jumpTo`，除非‘options’包含`essential: true`。

``` javascript
// fly with default options to null island
map.flyTo({center: [0, 0], zoom: 9});
// using flyTo options
map.flyTo({
    center: [0, 0],
    zoom: 9,
    speed: 0.2,
    curve: 1,
    easing(t) {
        return t;
    }
});

// fly with padding 中心位置往左上偏移
map.flyTo({ center: [lon, lat], padding: { top: 0, bottom: 300, left: 0, right: 560 } })
```

# 设置图层样式
``` javascript
// 设置图层样式
map.setPaintProperty('xxxxxLayer', 'text-color', '#f9fa96')

// 批量设置图层样式
const idArr = [11, 16, 19]
map.setPaintProperty('xxxxxLayer', 'text-color', ['case', ['in', ['get', 'id'], idArr], '#ff0000', '#f9fa96'])

// 批量设置图层样式
const idsArr = ['11', '16', '19']
map.setPaintProperty('xxxxxLayer', 'text-color', ['case', ['in', ['get', 'id'], ['literal', idsArr]], '#ff0000', '#f9fa96'])

// 控制图层显隐 visible（可见）/none（不可见）
map.setLayoutProperty('xxxxxLayer', 'visibility', 'visible')
```
