`Axios`，基于 `Promise` 的网络请求库，作用于node.js和浏览器中。

# axios安装
使用npm
``` bash
npm install axios
```

# axios二次封装

``` TypeScript
import axios from 'axios';

const BASE_URL = "";

// 初始化axios
const service = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true, // 跨域请求时发送cookies
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  timeout: 1000 * 30 // 请求超时
})

// 请求拦截器
service.interceptors.request.use((config) => {
  // 判断是否存在token,把token添加点请求头中，每次请求携带token传给后端
  // if (isToken) {
  //   config.headers['tokenName'] = 'tokenValue';
  // }
  return config;
}, (error) => {
  // 处理错误请求
  console.error('Request Error:', error)
  return Promise.reject(error);
})


// 响应拦截器
service.interceptors.response.use(
  response=> {
    const res = response.data
    if (res.code !== 200) {
      // 请求失败（包括token失效，302，404...根据和后端约定好的状态码做出不同的处理）
      return res
    }else{
      // 请求成功
      return res
    }
  }
  return config
},
error => {
  // 处理错误响应
  return Promise.reject(error)
}

export default service
```

> ## TIP
> ts路径：src\utils\request\request.ts
``` TypeScript
import axios from 'axios';

const BASE_URL = "";

const service = axios.create({
  baseURL: BASE_URL,
  // timeout: 1000 * 30
})

// const respCodeObj = {
//   "1511": "当前会话未登录",
//   "1512": "未能从请求中读取到token",
//   "1513": "已读取到token，但是token无效",
//   "1514": "已读取到token，但是token已经过期",
//   "1515": "已读取到token，但是token已被顶下线",
//   "1516": "已读取到token，但是token已被踢下线",

//   "1521": "权限认证失败",
// }

// request interceptors 请求拦截
service.interceptors.request.use((config) => {

  // if (!config.isNotoken) {
  //   const xxUser: any = sessionStorage.getItem('xxUser');
  //   const UserInfo = JSON.parse(xxUser);
  //   if (UserInfo && UserInfo.token) {
  //     config.headers.token = `${UserInfo.token}`;
  //   }
  // }

  return config;
}, (error) => {
  // 请求错误处理
  console.error('Request Error:', error)
  return Promise.reject(error);
})

// response interceptors 响应拦截
service.interceptors.response.use((response) => {

  // if (Object.keys(respCodeObj).includes(response.returnCode)) {
  //   // 清除 token 信息并跳转到登录页面
  //   sessionStorage.removeItem('xxUser');
  //   window.location.href = consts.loginUrl;
  // }

  return response;
}, (error) => {
  console.error('Request Error:', error)
  return Promise.reject(error)
})

export default service

```


# axios使用
get / post 请求数据
``` TypeScript
import request from '@/utils/request/request'

// 异步获取数据
private updateData1(){

  // GET 获取数据
  let url1 = '';
  request.get(url1).then((result: any) => {
    console.log('%c success:返回 => ', 'color:#11BB36;font-weight:bold;', result.data);

  }).catch(error => {
    console.error('error:返回 => ', error);
  })

  // POST 获取数据
  let url2 = '';
  request.post(url2, { type: 2 }).then((result: any) => {
    console.log('%c success:返回 => ', 'color:#11BB36;font-weight:bold;', result.data);

  }).catch(error => {
    console.error('error:返回 => ', error);
  })

}

// 同步获取数据
private async updateData2(){
  try {
    const result = await request.get('/data/xxx.json');
    let datas = result.data;

  } catch (e) {
    console.error(e);
  }
}
```

同步获取数据使用场景
``` TypeScript

public async updateData() {

  let { colorObj } = await this.prodColorMap(prodCode);

}

private prodColorObj: any = {};
private minValue: any;
private maxValue: any;
private async prodColorMap(id: any): Promise<any> {
  if (!this.prodColorObj[id]) {
    try {
      const result = await request.get(`/config/products/xxx/${id}.json`);
      let datas = result.data;
      // let colorMap = new Map();
      let colorObj: any = {};
      let colors = datas.color;

      //填色标
      for (var i = 0; i < colors.length; i++) {
        let val = colors[i]['val'];
        let col = colors[i]['col'];
        if (i == 0) {
          this.minValue = val;
        }
        if (i == colors.length - 1) {
          this.maxValue = val;
        }
        // colorMap.set(val, col);
        colorObj[val] = col;
      }
      return { colorObj, unit: datas.palette.unit };
    } catch (e) {
      console.error(e);
    }
  } else {
    return this.prodColorObj[id];
  }
  return {}
}

```
