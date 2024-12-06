
**类型错误**
```
<script lang="ts">
  import { Options, Vue } from 'vue-class-component'

  //@ts-ignore
  @Options({
    name: "testView",
    components: {}
  })

  export default class testView extends Vue {
    private mapids = ['map', 'map2', 'map3', 'map4'];
    private maps: any = {}

    mounted(): void {
      this.mapids.forEach((item, index) => {
        evt.on(`${item}loaded`, () => {
          if (item == 'map') this.maps[index] = (window as any)[item];
          else this.maps[index] = (window as any)[`${item}_m`];

          this.loadLayer(this.maps[index])
        })
      })
    }

    private loadLayer(maplayer: any) {

      let layer // ....图层
      maplayer.addLayer(layer);

    }
  }
</script>
```
地图`maplayer`类型结构，如图所示：
![输入图片说明](https://foruda.gitee.com/images/1731637352458283420/4e937db8_4993153.png "")

具体的错误信息如下：`未捕获的类型错误：无法从类未声明的对象中读取私有成员`
<span class="error">Uncaught TypeError: Cannot read private member from an object whose class did not declare it</span>

![输入图片说明](https://foruda.gitee.com/images/1731637465218695013/3678a195_4993153.png "")

【解决办法】
```
import { shallowReactive } from 'vue'

private maps: any = shallowReactive({})
```
地图`maplayer`类型结构，如图所示：
![输入图片说明](https://foruda.gitee.com/images/1731637613541422932/b99659e3_4993153.png "")
