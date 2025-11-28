# · 变量使用
``` css
/* 原生css 和 wxss 也是支持变量*/
page{
    /* 定义主题颜色 */
    --themeColor: #fff;
    /* 定义统一字体大小 */
    /* 假设设计稿 大小是375px */
    /* 1px = 2rpx */
    /* 14px = 28rpx */
    font-size: 28rpx;
}

/* 使用 主题颜色*/
view{
    color: var(--themeColer);
}
```


# · calc() 函数用于动态计算长度值
``` less
/* less中使用calc时候注意 */
view{
    height: ~'calc(100% - 90rpx)';
}
```
``` scss
/* sass中使用calc时候注意 */
view{
    $menuHeight: 32px;
    height: calc(100% - #{$menuHeight});
}


input{
  --el-input-height: 60px;
  --el-input-inner-height: calc(var(--el-input-height, 32px) - 6px);
}
```


# · flex 布局
``` css
.item{
    display: flex;
    .img_wrap{
        flex: 2; /* 站比2 */
        dispiay: flex;
        justify-content: center; /*水平居中*/
        align-items: center; /*垂直居中*/
    }
    .info_wrap{
        flex: 3; /* 站比3 */
        /* 上下 */
        display: flex; /* 伸缩盒子 */
        flex-direction: column; /* 主轴方向：列的方向 */
        justify-content: space-around; /* 空白环绕 */
        .name{
            /* 文字两个超出显示... */
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            /* 文字一行超出显示... */
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .price{

        }
    }
}


{
    display: flex;
    justify-content: space-between; /*两端对齐*/
}
```


# · table 设置宽度无效时使用解决
``` css
table{
    table-layout: fixed;
}
```


# · 伪类 ::after ::before
``` scss
&.actived {
    position: relative;
    color: #ffffff;
    background-color: #f88c6f;
    &::after{
        content: "";
        display: block;
        width: 10px;
        height: 6px;
        background: url(../images/icon/actived2.png);
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translate(-50%);
    }
    &::before{
        content: "";
        display: block;
        width: 10px;
        height: 6px;
        background: url(../images/icon/actived1.png);
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translate(-50%);
    }
}
```


# · content:attr(属性) 插入标签属性值
``` scss
// <div class="nodata" nodata="当前时刻暂无预警"></div>
&.nodata {
  position: relative;

  &::before {
    content: attr(nodata);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-4deg);
    color: #FFFFFF80;
    font-size: 12px;
    padding: 4px 8px;
    border: 2px solid #416BA480;
  }
}
```


# · text-shadow 文字描边
``` scss
// 语法
text-shadow: h-shadow v-shadow blur color;
```
| 值       | 描述                             |
| :------- | :------------------------------- |
| h-shadow | 必需。水平阴影的位置。允许负值。 |
| v-shadow | 必需。垂直阴影的位置。允许负值。 |
| blur     | 可选。模糊的距离。               |
| color    | 可选。阴影的颜色。               |

``` scss
span {
  color: #000;
  text-shadow: -1px 1px 0 #fff, 1px 1px 0 #fff, 1px -1px 0 #fff, -1px -1px 0 #fff;
}
```


# · 背景色渐变 linear-gradient() 函数
``` scss
// 语法
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);
```
| 值                           | 描述                               |
| :--------------------------- | :--------------------------------- |
| direction                    | 用角度值指定渐变的方向（或角度）。 |
| color-stop1, color-stop2,... | 用于指定渐变的起止颜色。           |


``` scss
// 从左侧开始的线性渐变
div{
  background-image: linear-gradient(to right, rgba(161, 241, 141, 1), rgba(61, 186, 61, 1), rgba(96, 184, 255, 1), rgba(0, 0, 255, 1), rgba(250, 0, 250, 1));
}
```
