在 JavaScript 中捕获当前 CSS `translate()`位置，可以通过以下步骤实现：

- 1.获取元素的样式属性：首先，使用 JavaScript 的`querySelector()`或`getElementById()`等方法获取需要操作的元素。然后，使用`window.getComputedStyle()`方法获取该元素的计算样式对象。
- 2.解析`translate()`属性值：通过计算样式对象的`transform`属性，可以获取元素的`transform`属性值。使用正则表达式或字符串处理方法，提取出`translate()`函数中的参数值。
- 3.解析参数值：将提取出的参数值进行解析，获取 X 轴和 Y 轴的偏移量。

```JavaScript
// 获取元素
const element = document.querySelector('.element-class');

// 获取计算样式对象
const computedStyle = window.getComputedStyle(element);

// 获取transform属性值
const transformValue = computedStyle.transform;

// 解析translate()参数值
const translateValues = transformValue.match(/translate\((.*?)\)/)[1].split(',');

// 获取X轴和Y轴的偏移量
const translateX = parseFloat(translateValues[0]);
const translateY = parseFloat(translateValues[1]);

console.log('当前translate()位置：', translateX, translateY);
```

VUE 中应用

```TypeScript
const boxDom: any = this.$refs['element-ref'];
let translateX = 0, translateY = 0;
// 获取boxdom偏移量 获取transform属性值
const transformValue = boxDom.style.transform;
if (transformValue) {
  // 解析translate()参数值
  const translateValues = transformValue.match(/translate\((.*?)\)/)[1].split(',')
  // 获取X轴和Y轴的偏移量
  translateX = parseFloat(translateValues[0]);
  translateY = parseFloat(translateValues[1]);
}
const top = boxDom.offsetTop + translateY;
const left = boxDom.offsetLeft + translateX;
const width = boxDom.offsetWidth;
const height = boxDom.offsetHeight;
```
