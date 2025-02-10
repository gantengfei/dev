
# 一、常规使用
1.在需要获取的元素标签上添加ref属性 \
2.创建ref对象，存储ref属性标记的内容 \
3.通过ref上的value属性即可获取当前dom元素
``` html
<template>
  <div class="chartwrap" ref="chartRef"></div>
</template>

<style lang="scss"></style>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'

const chartRef = ref()

onMounted(() => {

  console.log(chartRef.value) // 获取DOM

})

</script>
```

> ## TIP
> 如果在动态加载的内容上使用ref属性，可能会遇到获取不到DOM元素的问题。这通常是因为在组件渲染时，`ref`所指向的DOM元素尚未生成。使用以下方法获取

# 二、getCurrentInstance()：获取当前组件实例
1.在需要获取的元素标签上添加ref属性 \
2.通过getCurrentInstance解构出proxy \
3.通过proxy.$refs.xxx即可获取当前dom元素
``` html
<template>
  <div class="chartwrap" v-for="(item, index) in pollutant" :key="index" :ref="`chart_${item}`"></div>
</template>

<style lang="scss"></style>

<script lang="ts" setup>
import { onMounted, ref, reactive, getCurrentInstance } from 'vue'

const pollutant: any = ['AQI', 'PM2.5', 'PM10', 'O3']
//@ts-ignore
const { proxy } = getCurrentInstance();

onMounted(() => {

  pollutant.forEach((item: any) => {
    const chartDom: any = proxy.$refs[`chart_${item}`]; // 获取DOM
    console.log(chartDom);
  })

})

</script>
```

# 三、this.$refs：访问该 DOM 元素‌
使用`this.$refs.xxxxxRef`调用，它会在DOM更新完成后执行回调函数，确保你可以获取到最新的DOM元素。
``` html
<template>
  <div class="chartwrap" v-for="(item, index) in pollutant" :key="index" :ref="`chart_${item}`"></div>
</template>

<style lang="scss"></style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

//@ts-ignore
@Options({
  name: "module-name",
  components: {}
})

export default class ModuleName extends Vue {

  public pollutant: any = ['AQI', 'PM2.5', 'PM10', 'O3']

  mounted(): void {

    this.pollutant.forEach((item: any) => {
      const chartDom: any = this.$refs[`chart_${item}`]; // 获取DOM
      console.log(chartDom);
    })

  }

}
</script>
```
