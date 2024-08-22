在Vue中使用Element UI时，如果在动态加载的内容上使用ref属性，可能会遇到获取不到DOM元素的问题。这通常是因为在组件渲染时，`ref`所指向的DOM元素尚未生成。

为了解决这个问题，可以在Vue中的事件中使用`this.$ref.popoverRef`调用，它会在DOM更新完成后执行回调函数，确保你可以获取到最新的DOM元素。

```
<template>
<ul>
  <li v-for="(item, index) in menuLists" :key="index">
    <el-popover ref="randomtimePopoverRef" v-if="item.prodCode == 'random'" :visible="isRandomtimeVisible" trigger="click">
      <template #reference>
        <el-icon :color="isRandomtimeVisible ? '#ff8d08' : '#fff'"
          @click="handleTimeRangeShow"
          v-click-outside="handMoreOutside">
          <Calendar />
        </el-icon>
      </template>
      <template #default>
        <el-col>
          <el-col class="popover_calendarrangebox">
            <span>开始时间：</span>
            <el-date-picker v-model="StartTimeRange" type="datetime" :clearable="false" prefix-icon="Calendar"
              placement="bottom-end"
              value-format="YYYY-MM-DD HH:mm:ss" class="calendarrangebox"
              @change="handleDateRangeChange('start')"
              @visible-change="TimeChangeVisibleChange" />
          </el-col>
          <el-col class="popover_calendarrangebox">
            <span>结束时间：</span>
            <el-date-picker v-model="EndTimeRange" type="datetime" :clearable="false" prefix-icon="Calendar"
              placement="bottom-end"
              value-format="YYYY-MM-DD HH:mm:ss" class="calendarrangebox"
              @change="handleDateRangeChange('end')"
              @visible-change="TimeChangeVisibleChange" />
          </el-col>
        </el-col>
      </template>
    </el-popover>

    <span :class="{ 'actived': item.isActive }" @click="handleMenu(item)">{{ item.prodName }}</span>
  </li>
</ul>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ref, reactive, unref } from 'vue'

//@ts-ignore
@Options({
  name: "module-name",
  components: {},
  emits: [],
  props: {}
})

export default class ModuleName extends Vue {
  public menuLists: any = reactive([
    { prodName: '24h', prodCode: '24' }, { prodName: '08-08', prodCode: '08' }, { prodName: '20-20', prodCode: '30' },
    { prodName: '任意时段', prodCode: 'random' }
  ])
  public arbitrarilyLoading: any = ref(false);// 任意时间段
  public isRandomtimeVisible: any = ref(false);
  public randomtimePopoverRef: any = ref()
  public StartTimeRange: any = ref()
  public EndTimeRange: any = ref()

  mounted(): void {}

  public handleMenu(selfItem: any) {
    const { prodCode, prodName } = selfItem

    this.menuLists.forEach((v: any) => {
      if (v.prodCode == prodCode) {
        v.isActive = !v.isActive;
        this.isLoading = v.isActive;
      } else {
        v.isActive = false
      }
    })

    if (prodCode == 'random') { // 任意时间段
      this.initRandomTime()
      this.isRandomtimeVisible = this.isLoading
      this.arbitrarilyLoading = this.isLoading
    } else {
      this.isRandomtimeVisible = false
      this.arbitrarilyLoading = false
    }
  }

  public handleTimeRangeShow() {
    if (!this.arbitrarilyLoading) return
    this.isRandomtimeVisible = !this.isRandomtimeVisible;
  }
  private TimePicker = false;
  public TimeChangeVisibleChange(visible: boolean) {
    this.TimePicker = visible;
  }
  public handMoreOutside(e: any) {
    try {
      /**
       * 使用 unref(this.randomtimePopoverRef).popperRef.contentRef.contains(e.target)
       * unref(this.randomtimePopoverRef).popperRef 此时DOM为空
       * 使用 this.$refs.randomtimePopoverRef 获取DOM
       */
      const popperDom: any = this.$refs.randomtimePopoverRef; // 获取DOM
      if (this.isRandomtimeVisible
        && !unref(popperDom[0]).popperRef.contentRef.contains(e.target)
        && !this.TimePicker) {
        this.isRandomtimeVisible = false;
      }
    } catch (error) {
      console.log(error);
    }
  }
  public handleDateRangeChange(type: string) {
    if (type == 'start' && new Date(this.StartTimeRange).getTime() > new Date(this.EndTimeRange).getTime()) {
      evt.fire(consts.notice_noticewarning_show, { firer: '时间范围有误，开始时间不能大于结束时间' })
      return
    }
    if (type == 'end' && new Date(this.EndTimeRange).getTime() < new Date(this.StartTimeRange).getTime()) {
      evt.fire(consts.notice_noticewarning_show, { firer: '时间范围有误，结束时间不能小于开始时间' })
      return
    }

    this.updateData()
  }

  private updateData() {}

}
</script>
```

通过在`this.handMoreOutside`的回调函数中访问`this.$refs.randomtimePopoverRef`，可以确保获取到的是已经渲染好的DOM元素。
