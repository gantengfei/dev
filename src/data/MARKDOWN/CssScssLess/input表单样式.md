
# input:-internal-autofill-selected
`input:-internal-autofill-selected`是CSS伪类选择器，用于处理浏览器自动填充表单时的样式问题，尤其针对Chrome浏览器的默认行为。
``` css
input:-internal-autofill-selected {
  background-color: transparent !important; /* 设置透明背景 */
  -webkit-text-fill-color: #000 !important; /* 覆盖文本颜色 */
  transition: background-color 1000s ease-out 0.5s; /* 平滑过渡效果 */
}
```

如果不是想设置为透明色，可直接使用box-shadow
``` css
input:-internal-autofill-selected {
  -webkit-box-shadow: 0 0 0 60px white inset !important;
}
```
