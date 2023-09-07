引用 调用
``` typescript
import { Request, UploadFile } from '../../basics/request/request';

/** 普通POST请求接口调用.... */
Request({
  url: `${consts.dataServerHost}/sys/info`,
  data: { name: '' }
}).then(result => {
  console.log('%c success:返回', "color:#11BB36;font-weight:bold;");
}).catch(error => {
  console.error('error:返回');
}).finally(() => {
  console.warn('不管成功与否，都会执行的操作');
});

/** 上传文件接口调用.... */
$('btn').click(() => {
  let _file = document.querySelector('input[name=inputFile]');
  if (_file.files[0]) {
    let formData = new FormData();
    formData.append('file', _file.files[0]);
    uploadFile(formData);
  }
})

function uploadFile(formData) {
  UploadFile({
    url: `${consts.dataServerHost}/sys/uploadFile`,
    data: formData
  }).then((result) => {
    console.log('%c success:返回 => ', 'color:#11BB36;font-weight:bold;', result);
  }).catch(error => {
    console.error('error:返回 => ', error);
  }).finally(() => {
    console.warn('不管成功与否，都会执行的操作');
  });
}

/** 多个接口查询返回数据整合 */
let warnTypeArr = ["typea", "typeb"];
let _requestArr = [];
warnTypeArr.forEach(item => {
  let _request = Request({
    url: `${consts.dataServerHost}/warn/info`,
    type: 'GET',
    isNoabort: true,
    data: { type: item }
  }).then((result) => {
    result['type'] = item;
    return result;
  }).catch(error =>{
    return { type: item };
  });
  _requestArr.push(_request)
});

Promise.all(_requestArr).then((result) => {
  console.log('%c success:返回 => ', 'color:#11BB36;font-weight:bold;', result);
}).catch(error => {
  console.error('error:返回 => ', error);
});
```


request.ts
``` typescript
let Requesting = {};

/**
 * ES6 Promise() 封装通用的后台接口调用方法
 * @param params 参数 {url:'',data:{}}
 */
export const Request = (params) => {
  return new Promise((resolve, reject) => {

    if (!params.isNoabort && Requesting[params.url]) Requesting[params.url].abort();

    Requesting[params.url] = $.ajax({
      ...params,
      url: params.url,
      /* 设置请求超时时间 */
      // timeout: 3000,
      /* 默认值true异步请求，false同步请求 */
      async: params.async == undefined ? true : params.async,
      /* 默认值POST请求，当GET请求时参数中带type */
      type: params.type || 'POST',
      /* 默认值json数据类型，当数据类型为其它类型时参数中带dataType */
      dataType: params.dataType || 'json',
      /* 默认值'application/x-www-form-urlencoded;charset=utf-8'，'application/json'请求参数data只能是json字符串 data:JSON.stringify({id:0}) 或 data:'{id:0}'*/
      contentType: params.contentType == 'json' ? 'application/json;charset=utf-8' : 'application/x-www-form-urlencoded;charset=utf-8',
      success: (result) => {
        resolve(result)
      },
      error: (err) => {
        reject(err);
      }
    });

  })
}

/**
 * ES6 Promise() 封装通用的文件上传接口调用方法
 * @param params 参数 {url:'',data:formData}
 */
export const UploadFile = (params) => {
  return new Promise((resolve, reject) => {

    if (!params.isNoAbort && Requesting[params.url]) Requesting[params.url].abort();

    Requesting[params.url] = $.ajax({
      ...params,
      url: params.url,
      data: params.data, // 上传formdata封装的数据,下面三个参数要指定，如果不指定，会报一个JQuery的错误
      cache: false, // 不缓存
      processData: false, // jQuery不要去处理发送的数据
      contentType: false,  // 不设置内容类型  jQuery不要去设置Content-Type请求头
      dataType: 'json',
      success: (result) => {
        resolve(result)
      },
      error: (err) => {
        reject(err);
      }
    });

  })
}


// 1.引用
// import { Request } from '../../basics/request/request'

// 2.使用
// Request({
//   url: ``,
//   data: {}
// }).then((result: any) => {
//   console.log('%c success:返回 => ', 'color:#11BB36;font-weight:bold;', result);
// }).catch(error => {
//   console.error('error:返回 => ', error);
// });
```
