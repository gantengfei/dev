
红色`[255, 0, 0, 1]`到绿色`[0, 255, 0, 1]`渐变步长设置`10`

``` typescript
gradientColors([255, 0, 0, 1], [0, 255, 0, 1], 10)
```

![输入图片说明](./src/img/images/e20e37ee_4993153.png "")

> <span style="display: inline-block;width: 20px;">0</span>	<span style="background-color:rgba(255, 0, 0, 1);padding:2px 4px;color:#FFF;">rgba(255, 0, 0, 1)</span> \
> <span style="display: inline-block;width: 20px;">0.1</span>	<span style="background-color:rgba(230, 26, 0, 1);padding:2px 4px;color:#FFF;">rgba(230, 26, 0, 1)</span> \
> <span style="display: inline-block;width: 20px;">0.2</span>	<span style="background-color:rgba(204, 51, 0, 1);padding:2px 4px;color:#FFF;">rgba(204, 51, 0, 1)</span> \
> <span style="display: inline-block;width: 20px;">0.3</span>	<span style="background-color:rgba(179, 77, 0, 1);padding:2px 4px;color:#FFF;">rgba(179, 77, 0, 1)</span> \
> <span style="display: inline-block;width: 20px;">0.4</span>	<span style="background-color:rgba(153, 102, 0, 1);padding:2px 4px;color:#FFF;">rgba(153, 102, 0, 1)</span> \
> <span style="display: inline-block;width: 20px;">0.5</span>	<span style="background-color:rgba(128, 128, 0, 1);padding:2px 4px;color:#FFF;">rgba(128, 128, 0, 1)</span> \
> <span style="display: inline-block;width: 20px;">0.6</span>	<span style="background-color:rgba(102, 153, 0, 1);padding:2px 4px;color:#FFF;">rgba(102, 153, 0, 1)</span> \
> <span style="display: inline-block;width: 20px;">0.7</span>	<span style="background-color:rgba(77, 179, 0, 1);padding:2px 4px;color:#FFF;">rgba(77, 179, 0, 1)</span> \
> <span style="display: inline-block;width: 20px;">0.8</span>	<span style="background-color:rgba(51, 204, 0, 1);padding:2px 4px;color:#FFF;">rgba(51, 204, 0, 1)</span> \
> <span style="display: inline-block;width: 20px;">0.9</span>	<span style="background-color:rgba(26, 230, 0, 1);padding:2px 4px;color:#FFF;">rgba(26, 230, 0, 1)</span> \
> <span style="display: inline-block;width: 20px;">1</span>	<span style="background-color:rgba(0, 255, 0, 1);padding:2px 4px;color:#FFF;">rgba(0, 255, 0, 1)</span>

``` typescript
// 计算两个RGBA颜色之间的渐变值
export function gradientColors(color1: any[], color2: any[], steps: number) {

  const r1 = parseInt(color1[0], 10);
  const g1 = parseInt(color1[1], 10);
  const b1 = parseInt(color1[2], 10);
  const a1 = parseFloat(color1[3]);

  const r2 = parseInt(color2[0], 10);
  const g2 = parseInt(color2[1], 10);
  const b2 = parseInt(color2[2], 10);
  const a2 = parseFloat(color2[3]);

  const rStep = (r2 - r1) / steps;
  const gStep = (g2 - g1) / steps;
  const bStep = (b2 - b1) / steps;
  const aStep = (a2 - a1) / steps;

  const gradientColors = [];
  for (let i = 0; i < steps; i++) {
    const r = Math.round(r1 + i * rStep);
    const g = Math.round(g1 + i * gStep);
    const b = Math.round(b1 + i * bStep);
    const a = a1 + i * aStep;
    // gradientColors.push(`rgba(${r}, ${g}, ${b}, ${a})`);
    gradientColors.push([r, g, b, a]);
  }

  return gradientColors;
}
```
