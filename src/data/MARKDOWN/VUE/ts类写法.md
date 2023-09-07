常规写法

``` xml
<template>
  <MapContainer />
  <div class="headwrap"></div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue'
import MapContainer from '../components/MapContainer.vue';
import { evt } from '../utils'
import http from '../utils/request/request'

let map;

// 可以获取到dom的回调事件、生命周期
onBeforeMount(() => {
  // console.log(document.querySelector('#map'))
})
onMounted(() => {
  // console.log(document.querySelector('#map'))

  evt.on('maploaded', msg => {
    map = (window as any)['map'];
    console.log(msg);
    getData();
  })

})

//
const getData = () => {
  let url = `${consts.dataServerHost}/sys/info`;
  http.get(url).then((result: any) => {
    console.log('%c success:返回 => ', 'color:#11BB36;font-weight:bold;', result);
  }).catch(error => {
    console.error('error:返回 => ', error);
  })
}

</script>
```

TS类写法
```

<template>
  <MapContainer />
  <div class="headwrap"></div>
</template>

<script lang="ts">
import MapContainer from '../components/MapContainer.vue';
import { Options, Vue } from 'vue-class-component'
import { evt } from '../utils'
import http from '../utils/request/request'

//@ts-ignore
@Options({
  name: "home-view",
  components: {
    MapContainer
  }
})

export default class HomeView extends Vue {

  private map: any;

  mounted(): void {
    evt.on('maploaded', msg => {
      this.map = (window as any)['map'];

      this.updateData();
    })
  }

  private updateData() {
    let url = `${consts.dataServerHost}/sys/info`;
    http.get(url).then((result: any) => {
      console.log('%c success:返回 => ', 'color:#11BB36;font-weight:bold;', result);
    }).catch(error => {
      console.error('error:返回 => ', error);
    })
  }

}

</script>
```
