在 **VUE** 中 **Mapbox** 未初始完成是无法加载图层的，所以需要在 **Mapbox** 初始完成后执行事件

# ➤ 主模块入口

``` vue @src/views/.../outlineView.vue
<template>
  <div class="explainoutlinewrap">
    <div class="leftwrap"></div>
    <div class="centerwrap">
      <div class="itemwrap" v-for="(item, index) in curPageInfo.data" :key="index"
        :class="[`m${curPageInfo.data.length}`, `${index == curPageInfo.index ? 'actived' : ''}`]"
        @click="handleCenterView(index)">
        <makeMap v-if="item.config.type == 'map'" :mapIndex="index" />
      </div>
    </div>
    <div class="rightwrap"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { getAction } from '@/api/manage';
import { curPageInfoStore, useOutlineStore } from '@/stores/explainmake';
import makeMap from '@/views/.../module/makeMap.vue'
import { pptMapLoad } from '@/utils/module/pptMapLoad';

//@ts-ignore
@Options({
  name: "outlineView",
  components: {
    makeMap,
  }
})

export default class outlineView extends Vue {

  private outlineStore = useOutlineStore()
  public curPageInfo: any = reactive(curPageInfoStore)
  private mapLoadedEvents: any = {
    map0: [] as Array<() => void>,
    map1: [] as Array<() => void>,
    map2: [] as Array<() => void>,
    map3: [] as Array<() => void>,
  }

  mounted(): void {

    this.updatePageData()

    for (let i = 0; i < 4; i++) {
      evt.on(`map${i}loaded`, () => {
        while (this.mapLoadedEvents[`map${i}`].length) {
          const task = this.mapLoadedEvents[`map${i}`].shift();
          task && task();
        }
      })
    }

  }

  private async updatePageData() {
    const result = await getAction('/detail',{matId: 'matId', id: 'curPageId'})
    const { data } = result
    try {
      this.curPageInfo.data = data.DS.contents;
      this.curPageInfo.index = 0;

      this.laodOtherItemInitData()
    } catch (error) {
      console.error("error:返回 => ", error)
    }
  }

  /** 加载其它项初始数据 */
  private laodOtherItemInitData() {
    let datas = this.curPageInfo.data
    for (let i = 0; i < datas.length; i++) {
      if (i == this.curPageInfo.index) continue;
      let item = datas[i];
      if (item.config) {
        const elems = item.config.elems?.split(',') || [];
        // 实况产品叠加
        if (!this.outlineStore.mapload[`map${i}`]) {
          this.mapLoadedEvents[`map${i}`].push(() => pptMapLoad.addLiveProd(i))
        } else {
          pptMapLoad.addLiveProd(i)
        }

        // 管制信息叠加
        let controlInfo = elems.filter((item: any) => this.outlineStore.elementTypeObj.controlInfo.includes(item))
        if (controlInfo.length > 0) {
          controlInfo.forEach((item: any) => {
            if (!this.outlineStore.mapload[`map${i}`]) {
              this.mapLoadedEvents[`map${i}`].push(() => this.getControlInfo(item, i))
            } else {
              this.getControlInfo(item, i)
            }
          })
        }
      }
    }
  }

  private async getControlInfo(typeid: string, mapid: any) {
    if (typeid == 'airport') await pptMapLoad.getAirportInfo(mapid)
    if (typeid == 'airline') await pptMapLoad.getAirlineInfo(mapid)
    if (typeid == 'terminal') await pptMapLoad.getTerminalInfo(mapid)
  }
}
</script>
```

# ➤ Map容器组件 初始化Map

``` vue @src/views/.../module/makeMap.vue
<template>
  <div class="map-container">
    <div class="mapbox" :id="mapid"></div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'
import { evt } from '@/utils'
import { useOutlineStore } from '@/stores/explainmake'

const props = defineProps({
  mapIndex: {
    type: Number,
    default: () => {
      return 1
    }
  }
})

let outlineStore = useOutlineStore()
let mapid: any = ref('')
let map: any = shallowRef(null)

onBeforeMount(() => {
  evt.off(`${mapid.value}loaded`, () => { });
})

onMounted(() => {

  watch(() => props.mapIndex, (value: any) => {
    mapid.value = `map${value}`
    initMap()
  }, { deep: true, immediate: true })

})

const initMap = async () => {

  const _map = new mapboxgl.Map({
    container: mapid.value,
    // ....
  });

  _map.on('load', async () => {
    console.log(`%c ✔ ${mapid.value} loading succeeded`, 'color:#11BB36;');

    (window as any)[mapid.value] = _map;

    // 使用pinia储存 监听mapload状态
    outlineStore.setMapload(mapid.value, true)
    // 或发送事件
    evt.fire(`${mapid.value}loaded`, { firer: "", data: _map });

  })

}

onUnmounted(() => {
  delete (window as any)[mapid.value]
  outlineStore.setMapload(mapid.value, false)
})

</script>
```

# ➤ pinia储存mapload状态

``` TypeScript @src/stores/explainmake.ts
import { defineStore } from 'pinia'
import { reactive } from 'vue';

export const useOutlineStore = defineStore('explainoutline', {
  state: () => {
    mapload: {
      map0: false,
      map1: false,
      map2: false,
      map3: false,
    } as any,
  },
  actions: {
    setMapload(id: string, bol: boolean) {
      this.mapload[id] = bol
    },
  }
})

export const curPageInfoStore: { index: number, data: any[] } = reactive({
  index: 0,
  data: []
})
```

# ➤ 获取加载到地图产品数据

``` TypeScript @src/utils/module/pptMapLoad.ts
import { curPageInfoStore, useOutlineStore } from '@/stores/explainmake';

class pptMapLoadService {

  private outlineStore = useOutlineStore()
  private curPageInfo = curPageInfoStore

  /** 添加实况产品 */
  addLiveProd(mapid: any) {
    this.resData = {}
    const liveprods = this.outlineStore.elementTypeObj.live;
    const elems = this.curPageInfo.data[Number(mapid)].config.elems?.split(',');
    const prods = elems.filter((item: any) => { return liveprods.includes(item) })
    prods.forEach((item: any) => {
      const prodCode = this.findComponentProdCode(item)
      this.updateLiveProd(prodCode, String(mapid))
    })
  }

  private updateLiveProd(prodCode: string, mapid: string) {
    // 获取prodCode的数据
    // ...
    // 加载到mapid的图层中
    const map = (window as any)[`map${mapid}`]
    if (!map) return
    // ...
  }

  /** 获取元素产品Code */
  private findComponentProdCode(item: any) {
    // return prodCode
    return undefined;
  }

  /** 获取机场信息 */
  async getAirportInfo(mapid: any) {
    const map = (window as any)[`map${mapid}`]
    if (!map) return
    const source = map.getSource('airportLayer');
    if (!source) {
      // ...
    }
  }
  /** 获取航线信息 */
  async getAirlineInfo(mapid: any) {}
  /** 获取终端区信息 */
  async getTerminalInfo(mapid: any) {}

}

export const pptMapLoad = new pptMapLoadService()
```
