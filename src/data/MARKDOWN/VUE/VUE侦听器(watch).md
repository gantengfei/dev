# 基本语法 script_setup
要启用该语法，需要在 `<script>` 代码块上添加 `setup`

```
watch(source, callback, options?)
```

> 监视【ref】定义的【对象类型】数据，监视的是对象的地址值。如果想要监视对象的属性，需要使用watchEffect \
> watch第一个参数是：被监视的数据 \
> watch第二个参数是：监视的回调 \
> watch第三个参数是：配置对象（deep、immediate等等……） immediate表示是否立即执行回调

1.immediate \
immediate选项可以用于指定watch在组件创建时立即执行一次回调函数，而不必等待数据的变化

2.deep \
deep选项可以用于深度监听一个对象或数组的变化。当我们监听一个对象或数组时，默认情况下只会监听对象或数组的引用变化，而不会监听其内部数据的变化。如果我们需要深度监听对象或数组内部数据的变化，可以使用deep选项。

3.flush \
flush选项可以用于指定watch的回调函数在何时执行 \
`sync`：同步模式下执行 \
`pre`：在数据变化之前执行回调函数 \
`post`：在数据变化之后执行回调函数，但是需要等待所有依赖项都更新后才执行


**情况一**、监视ref定义的基本类型的数据，直接填写数据名即可，监视的是其value值的改变

> 监视的适合不需要写.value
``` html
<script lang="ts" setup>
import { ref,watch } from 'vue';

let sum = ref(0)

watch(sum, (newVal,oldVal) => {
  console.log('sum发生了变化',newVal,oldVal);
})
</script>
```


**情况二**、监视ref定义的对象类型的数据，直接写数据名，监视的是对象的地址值，如果想监视对象内部的数据，要手动开启深度监视
``` html
<script lang="ts" setup>
import { ref,watch } from 'vue';

let options = ref({
  name:'',
  date:''
})

watch(options, (Value) => {
  console.log('options发生了变化',Value);
},{ deep: true, immediate: true })
</script>
```

> 如果修改的是ref定义的对象中的属性，newValue和oldValue都是新值，因为他们是同一个对象
> 如果修改整个ref定义的对象，newValue是新值，oldValue是旧值，因为不是同一个对象了


**情况三**、监视【reactive】定义的【对象类型】数据，且默认是开启深度监听的，该深度监听是递归的且无法关闭
``` html
<script lang="ts" setup>
import { ref,watch } from 'vue';

let options = reactive({
  name:'',
  date:''
})

watch(options, (newValue,oldValue) => {
  console.log('options发生了变化',newValue,oldValue);
})
</script>
```

**情况四**、监视ref或者reactive定义的【对象类型】数据中的某个属性
``` html
<script lang="ts" setup>
import { ref,watch } from 'vue';

let options = reactive({
  name:'',
  date:'',
  data:{
    time:''
  }
})

// 监视：监视响应式对象的某个属性，而且该属性是基本类型的，要写成函数式
watch(()=>{return options.name}, (newValue,oldValue) => {
  console.log('options发生了变化',newValue,oldValue);
})

// 监视：监视响应式对象的某个属性，而且该属性是对象类型的，要写成函数式，也可以直接写，但是不太推荐有时候容易出问题
watch(()=>options.data, (value) => {
  console.log('options.data发生了变化',value);
},{ deep: true })
</script>
```

**情况五**、监视多个数据
``` html
<script lang="ts" setup>
import { ref,watch } from 'vue';

let options = reactive({
  name:'',
  date:'',
  data:{
    time:''
  }
})

watch(()=>[options.data.time,options.name], (value) => {
  console.log('options.data.time或options.name发生了变化',value);
})
</script>
```

# 普通语法 script
在 `<script>` 中使用

``` html
<script lang="ts">
import { Options, Vue } from 'vue-class-component'

//@ts-ignore
@Options({
  name: "draw-tool",
  components: {},
  props: {
    isshowDrawTool: Boolean,
    source: String
  }
})

export default class DrawTool extends Vue {

  public source: any
  public isshowDrawTool: any
  public sourceType: any = ref('')

  private propsWatch = watch(this.$props, (val: any) => {
    if (val.source != this.sourceType) {
      this.sourceType = val.source
      this.updateType()
    }
  }, { deep: true, immediate: true })

  mounted(): void {}

  private updateType() {
    // ...
  }
}
</script>
```
