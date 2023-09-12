
> ## TIP
> 一般单行注释是以`@ts-`开头

`@ts-ignore` 和 `@ts-expect-error` \
`@ts-ignore` 和 `@ts-expect-error` 仅仅对紧随其后的那一行代码做约束,可以写在代码的任意位置

---
`@ts-check` 和 `@ts-nocheck` \
`@ts-check` 和 `@ts-nocheck` 是对整个文件的代码做约束, 只能写在代码的最前面

---
`@ts-nocheck`: 用与`.js`文件和`.ts`文件里 \
在`.ts`文件就不用说了

---
在`.js`文件为什么会用到 `@ts-nocheck`呢? js就没有类型检测这回事啊?

---
原因是`ts.config.json`配置项有个`checkJs`如果设置为`true`,那么所有的`.js`文件就会有类型检测,这个时候`@ts-nocheck`就派上用场了,它会允许我们将一部分的`.js`类型检测给禁用掉.

---
`@ts-check`: 用与`.js`文件里, 开启文件的类型检测

---
已经是string类型的age, 无法再赋值为number类型了
