当用户停留在当前页面很久，此时页面升级更新。若用户不刷新，就会一直停留在当前旧版本的页面上。现给予用户升级版本的提醒：

在`utils/helpers`文件夹下新建`autoUpdateSystem.ts`

``` TypeScript
import { ElMessageBox } from 'element-plus';

let lastScripts: string[] = [];
const DURATION = 5 * 60 * 1000; //设置每5分钟更新一次

//提取html中的script标签的src属性
async function extractNewScripts(html: string): Promise<string[]> {
  const scriptReg = /<script.*src=["'](?<src>[^"']+)/gm; //匹配script标签并捕获src属性内的URL
  const result: string[] = [];
  let match;
  while ((match = scriptReg.exec(html))) {
    result.push(match.groups?.src ?? '');
  }
  return result;
}

//判断是否需要更新
async function needUpdate(): Promise<boolean> {
  //获取当前页面的script标签src属性
  const newScripts = await extractNewScripts(await fetch(import.meta.env.VITE_APP_WEB_PATH_API).then((resp) => resp.text()));
  //如果是第一次加载，则不更新
  if (!lastScripts.length) {
    lastScripts = newScripts;
    return false;
  }
  //判断是否需要更新 长度不同-更新
  if (newScripts.length !== lastScripts.length) {
    lastScripts = newScripts;
    return true;
  }
  //比较两个数组是否相等 长度相同，内容不同-更新
  for (let i = 0; i < lastScripts.length; i++) {
    if (lastScripts[i] !== newScripts[i]) {
      lastScripts = newScripts;
      return true;
    }
  }
  return false;
}

/* 自动刷新 */
export const autoRefresh = (): void => {
  setTimeout(async () => {
    const willUpdate = await needUpdate();
    if (willUpdate) {
      ElMessageBox.confirm('系统有更新，点击确定刷新系统页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        location.reload();
      }).catch(() => { });
    }
    else {
      autoRefresh();// 如果不需要更新数据，继续执行下一次判断
    }
  }, DURATION);
};

```

在首页App.vue中使用

``` TypeScript
import { onMounted } from 'vue';
import { autoRefresh } from '@/utils/helpers/autoUpdateSystem';

onMounted(() => {
  // 监听系统是否需要自动更新
  if (import.meta.env.MODE !== 'development') autoRefresh();
})
```
