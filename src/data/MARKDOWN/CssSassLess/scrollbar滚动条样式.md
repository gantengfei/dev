# ➤ 原始滚动条样式修改
``` scss
div{
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    // 设置滚动条大小及背景颜色
    &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: transparent;
    border-radius: 4px;
    }
    // 设置滚动条轨道背景色
    &::-webkit-scrollbar-track {
    background-color: transparent;
    }
    // 设置滑块背景色
    &::-webkit-scrollbar-thumb {
    background-color: rgba(204, 204, 204, 1);
    border-radius: 4px;
    }
    // 设置水平和垂直滚动条交叉部分的背景色
    &::-webkit-scrollbar-corner {
    background-color: transparent;
    }
}
```

---

# ➤ 常用样式
``` scss
div {
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    width: 8px;
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 4px;
  }
}
```

# ➤ 隐藏滚动条
``` scss
div {
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    visibility: hidden;
    width: 0;
  }
}
```
