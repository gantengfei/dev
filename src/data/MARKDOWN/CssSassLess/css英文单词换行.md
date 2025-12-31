在 CSS 中，英文单词默认不会在单词中间换行（除非使用 `<wbr>` 或特殊字符），这可能导致在窄容器中出现横向溢出。要让英文（尤其是长单词、URL、技术术语等）自动换行，可以使用以下 CSS 属性：
``` css
.word-wrap {
  word-wrap: break-word;        /* 兼容旧浏览器 */
  overflow-wrap: break-word;    /* 现代标准（推荐） */
  word-break: break-word;       /* 可选：更激进的断词 */
}
```


# 各属性详解
| 属性            | 值                         | 作用                                                                                                                                                                       | 兼容性                                      |
| :-------------- | :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------ |
| `overflow-wrap` | `break-word`               | 优先推荐。只在必要时（如长单词超出容器）在任意位置断开单词换行，尽量保持单词完整。                                                                                         | 现代浏览器（IE9+）                          |
| `word-wrap`     | `break-word`               | `overflow-wrap` 的旧别名，功能相同。为兼容老代码保留。                                                                                                                     | 广泛支持                                    |
| `word-break`    | `break-all` / `break-word` | 激进断词：<br>- `break-all`：在任意字符处断开（包括中文/英文），可能破坏单词可读性。<br>- `break-word`（非标准，仅部分浏览器支持）：行为类似 `overflow-wrap: break-word`。 | `break-all` 支持好；<br>`break-word` 不标准 |

> 注意：`word-break: break-word` 不是标准属性（尽管 Chrome/Firefox 支持），应优先使用 `overflow-wrap: break-word`。


# 最佳实践总结
| 场景                               | 推荐 CSS                                            |
| :--------------------------------- | :-------------------------------------------------- |
| 普通文本容器（含可能的长单词/URL） | `overflow-wrap: break-word;`                        |
| 代码块、日志（允许任意断行）       | `word-break: break-all; `                           |
| 需要最大兼容性（含 IE）            | `word-wrap: break-word; overflow-wrap: break-word;` |


# 强制不换行（反向需求）
如果你不希望换行（如表格单元格）：
``` css
.nowrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```
