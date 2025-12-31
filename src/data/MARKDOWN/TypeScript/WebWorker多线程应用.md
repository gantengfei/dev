
# 1.单Worker应用
使用单线程处理数据，当遇到上一个worker还未结束，需要排队有序依次处理。

## 1.1 创建Worker文件

在`src/utils/worker/`文件夹中创建`gridEditData.worker.ts`
``` TypeScript
addEventListener("message", (event) => {
  const { data, isendow, lastData } = event.data; // 接收主线程传来的数据

  // console.log('--Worker--', data, isendow);
  console.time('gridData Organize Worker')

  const _lastData = JSON.parse(JSON.stringify(lastData))

  // 处理数据
  if (isendow) {
    data.forEach((item: any) => {
      if (Math.abs(item[3]) == 9999) item[3] = 9999

      _lastData[`${item[0]}_${item[1]}`] = item
    })
  } else {
    // 删除数据
    data.forEach((item: any) => {
      if (Object.prototype.hasOwnProperty.call(_lastData, `${item[0]}_${item[1]}`)) {
        delete _lastData[`${item[0]}_${item[1]}`]
      }
    })
  }

  console.timeEnd('gridData Organize Worker')
  postMessage({ lastData: _lastData })

})
```

## 1.2 主线程调用
``` TypeScript
  GridEditDataOrganize: markRaw({} as Record<string, any>), // 网格编辑数据整理
  workerNum: 0,
  workerObj: markRaw({} as Record<string, any>)

  /**
   * 网格编辑数据
   * @param data 网格编辑的数据
   * @param bool 赋予/撤销
   */
  setGridEditData(datas: { data: Record<string, any>, bool: boolean }) {

    this.workerNum++
    this.workerObj[this.workerNum] = {
      data: datas.data,
      bool: datas.bool,
    }

    const loadWorker = (num: number) => {
      const worker = new Worker(new URL('@/utils/worker/gridEditData.worker.ts', import.meta.url))

      const msg = JSON.parse(JSON.stringify({
        data: this.workerObj[num].data,
        isendow: this.workerObj[num].bool,
        lastData: JSON.parse(JSON.stringify(this.GridEditDataOrganize))
      }))

      worker.postMessage(msg);

      worker.onmessage = (e) => {
        // 处理 worker 返回的结果
        const result = e.data;
        // console.log('Worker 返回结果:', result);
        this.GridEditDataOrganize = result.lastData;

        worker.terminate(); // 完成后终止 worker

        this.workerNum--
        delete this.workerObj[num]
        if (this.workerNum != 0) {
          const objarr = Object.keys(this.workerObj).map(v => { return Number(v) })
          loadWorker(Math.min(...objarr))
        }
      }
    }

    if (this.workerNum == 1) loadWorker(this.workerNum)

  }
```


# 2.多个Worker应用

## 2.1 创建Worker文件

在`src/utils/worker/`文件夹中创建`turf.worker.ts`

当前`worker`中依赖`turf.js`需要提前将依赖库内置，将`turf.min.js`放置在`src/utils/basics/`目录中。

> ## WARN
> **注意：**打包后找不到这个引入的包，同时需要将`turf.min.js`放置在`public/basics/`目录中。

``` TypeScript
// @ts-ignore
importScripts('../external/turf.min.js')

addEventListener("message", (event) => {
  const { grids, hArr, gridX, gridY } = event.data; // 接收主线程传来的数据
  const _grids: any = {}

  try {
    for (let yy = hArr[0]; yy < hArr[1]; yy++) {
      _grids[yy] = grids[yy]
      for (let xx = 0; xx < gridX.length; xx++) {
        if (grids[yy][xx] == undefined) {
          continue;
        }
        let val_min = -9999;//该点在那个多边形内部的数值,从外到内依次计算
        // 当前应用省略处理过程...
        _grids[yy][xx] = val_min
        // End...
      }
    }
    postMessage({ grids: _grids })
  } catch (error) {
    console.error(error)
    postMessage({ error })
  }
})
```

## 1.2 主线程调用

在主线程中调用封装的方法中使用`worker`，需异步获取返回的结果。
``` TypeScript
async getPointArea(pt: any, geo: any) {
  console.time('网格化耗时')
  const grid2: any = await uti.arrayInterpolate(gridOpts, geos1, grid);//射线法, 只适合规则逻辑下的插值

  console.timeEnd('网格化耗时')
  mload.removeLoading('idloading')
}
```

``` TypeScript
/** 将网格拆分多行到10个池子中同时处理
 * grids [[unll,unll],[unll,unll],[unll,unll]]
 * _grids {0:[unll,unll],1:[unll,unll],2:[unll,unll]}
 */
export function arrayInterpolate(options: any, geos: any, grids: any) {
  return new Promise((res, rej) => {
    //根据射线法重置格点数值
    // 1. 确定格网边界
    const minX = options.xStart, maxX = options.xEnd, dx = options.xDelta;
    const minY = options.yEnd, maxY = options.yStart, dy = options.yDelta;
    // 2. 生成格网坐标（间隔为1）
    const gridX: any = [];
    const gridY: any = [];
    //根据面积排序计算2个多边形组合之间
    const geos_copy = JSON.parse(JSON.stringify(geos))
    for (let x = minX; x <= maxX; x += dx) gridX.push(x);
    for (let y = minY; y <= maxY; y -= dy) gridY.push(y);

    // 多线程处理
    // 创建Worker池10个
    const workerNum = 10;
    let workers: any = [];
    for (let i = 0; i < workerNum; i++) {
      const worker = new Worker(new URL('@/utils/worker/turf.worker.ts', import.meta.url))
      workers.push(worker)
    }

    let _grids: any = {}
    const runTask = (worker: any, hArr: []) => {
      const msg = { grids, hArr, gridX, gridY }
      worker.postMessage(msg)

      worker.onmessage = (event: any) => {
        // 处理 worker 返回的结果
        const result = event.data;
        // console.log(result);
        if (result.grids) {
          _grids = { ..._grids, ...result.grids }
        }

        workers.push(worker); //返回线程池中
        if (workers.length == workerNum) {
          for (const _worker of workers) {
            _worker.terminate(); // 完成后终止 worker
          }
          workers = [];

          for (const index in _grids) {
            grids[index] = _grids[index]
          }

          res(grids)
        }
      }
    }

    if (workers.length > 0) {
      const hSumNum = gridY.length
      // console.log(hSumNum);
      const whnum = Math.ceil(hSumNum / workerNum)
      let index = 0
      const newArray: any = []
      while (index < hSumNum) {
        const n = [index, index += whnum]
        if (n[1] > hSumNum) n[1] = hSumNum
        newArray.push(n);
      }
      // console.log(newArray);
      for (const [index, worker] of workers.entries()) {
        runTask(worker, newArray[index])
      }
      workers.splice(0, workerNum);
    }
  })
}
```
