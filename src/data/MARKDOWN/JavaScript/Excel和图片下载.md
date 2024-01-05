# 1.Table Html 转 Excel
``` JavaScript
let tableBox = $('.tablecontent').html();

PublicEvent.UittableDownload(tableBox, "filename")
```

``` JavaScript
/** Htm表格生成excel下载 */
export function UittableDownload(tableTheadTbody: any, fileName: any) {
  let str = tableTheadTbody;
  //下载的表格模板数据
  let excelFile = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
    <x:Name>${fileName}</x:Name>
    <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
    </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
    </head><body><table>${str}</table></body></html>`;
  //下载模板
  // let uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
  // let uri = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(excelFile);
  let blob = new Blob([excelFile], { type: "text/csv;charset=utf-8" });
  blob = new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type });
  let uri = window.URL.createObjectURL(blob);
  let link = document.createElement("a");
  link.href = uri;
  link.download = fileName + '.xls';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
```

# 2.Json Data 转 Excel
``` JavaScript
let datas = {
  "title":[{"value":"时间/日期"},{"value":"00"},{"value":"01"},{"value":"02"},{"value":"03"},{"value":"04"},{"value":"05"},{"value":"06"},{"value":"07"},{"value":"08"},{"value":"09"},{"value":"10"},{"value":"11"},{"value":"12"},{"value":"13"},{"value":"14"},{"value":"15"},{"value":"16"},{"value":"17"},{"value":"18"},{"value":"19"},{"value":"20"},{"value":"21"},{"value":"22"},{"value":"23"}],
  "data":[
    [{"value":"2024-01-03"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"8.8"},{"value":"7.4"},{"value":"6.7"},{"value":"5.4"},{"value":"4.6"},{"value":"4.0"},{"value":"3.7"}],
    [{"value":"2024-01-04"},{"value":"3.7"},{"value":"4.4"},{"value":"4.6"},{"value":"5.9"},{"value":"7.9"},{"value":"9.2"},{"value":"10.4"},{"value":"10.6"},{"value":"11.0"},{"value":"12.1"},{"value":"13.4"},{"value":"14.1"},{"value":"15.0"},{"value":"15.5"},{"value":"15.6"},{"value":"15.8"},{"value":"15.5"},{"value":"15.0"},{"value":"14.5"},{"value":"13.1"},{"value":"11.4"},{"value":"9.6"},{"value":"8.3"},{"value":"8.3"}],
    [{"value":"2024-01-05"},{"value":"8.7"},{"value":"7.6"},{"value":"7.0"},{"value":"7.7"},{"value":"7.4"},{"value":"7.9"},{"value":"8.2"},{"value":"7.6"},{"value":"6.6"},{"value":"6.5"},{"value":"5.7"},{"value":"4.9"},{"value":"4.2"},{"value":"3.9"},{"value":"3.8"},{"value":"3.7"},{"value":"3.6"},{"value":"3.5"},{"value":"3.2"},{"value":"2.9"},{"value":"2.7"},{"value":"2.8"},{"value":"2.4"},{"value":"2.4"}],
    [{"value":"2024-01-06"},{"value":"2.3"},{"value":"1.7"},{"value":"1.2"},{"value":"0.7"},{"value":"0.4"},{"value":"0.5"},{"value":"0.9"},{"value":"1.8"},{"value":"3.0"},{"value":"4.2"},{"value":"5.7"},{"value":"7.1"},{"value":"8.3"},{"value":"9.1"},{"value":"10.2"},{"value":"11.6"},{"value":"12.7"},{"value":"12.3"},{"value":"12.4"},{"value":"12.6"},{"value":"12.1"},{"value":"12.2"},{"value":"11.1"},{"value":"10.8"}],
    [{"value":"2024-01-07"},{"value":"10.5"},{"value":"10.1"},{"value":"9.7"},{"value":"9.3"},{"value":"8.9"},{"value":"8.6"},{"value":"8.1"},{"value":"7.6"},{"value":"7.1"},{"value":"6.3"},{"value":"5.4"},{"value":"4.8"},{"value":"4.5"},{"value":"4.2"},{"value":"3.7"},{"value":"3.0"},{"value":"2.4"},{"value":"2.0"},{"value":"1.5"},{"value":"0.9"},{"value":"1.0"},{"value":"1.7"},{"value":"2.4"},{"value":"3.1"}],
    [{"value":"2024-01-08"},{"value":"3.5"},{"value":"4.0"},{"value":"4.5"},{"value":"5.2"},{"value":"5.4"},{"value":"6.1"},{"value":"6.5"},{"value":"6.7"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"},{"value":"-"}]
  ]
}

JSONToExcelConvertor(datas.title, datas.data, 'fliename')
```

``` JavaScript
/**
 *
 * @param JSONData 表数据
 * @param FileName 文件名
 * @param ShowLabel 表数据头
 */
export function JSONToExcelConvertor(ShowLabel, JSONData, FileName) {
  //先转化json
  let arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

  let excel = '<table>';

  //设置表头
  let row = "<tr>";
  for (let i = 0, l = ShowLabel.length; i < l; i++) {
    row += "<td>" + ShowLabel[i].value + '</td>';
  }
  // 换行
  excel += row + "</tr>";

  //设置数据
  for (let i = 0; i < arrData.length; i++) {
    let row = "<tr>";
    for (let index in arrData[i]) {
      let value = arrData[i][index].value === "." ? "" : arrData[i][index].value;
      row += '<td>' + value + '</td>';
    }
    excel += row + "</tr>";
  }

  excel += "</table>";

let excelFile =`<html xmlns:o='urn:schemas-microsoft-com:office:office'
  xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>
  <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
  <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
  <x:Name>${FileName}</x:Name>
  <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
  </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
  </head><body>${excel}</body></html>`;

  let uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);

  let link: any = document.createElement("a");
  link.href = uri;

  link.style = "visibility:hidden";
  link.download = FileName + ".xls";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
```


# 3.Echarts 转 图片
``` JavaScript
export function saveChartImg(filename) {
  let myChart = echarts.getInstanceByDom(<HTMLDivElement>document.getElementById('group_forecast_chart'));
  let url = myChart.getConnectedDataURL({
    pixelRatio: 5,　　//导出的图片分辨率比率,默认是1
    backgroundColor: '#fff',　　//图表背景色
    excludeComponents: [　　//保存图表时忽略的工具组件,默认忽略工具栏
      'toolbox'
    ],
    type: 'png'　　//图片类型支持png和jpeg
  });
  let $a = document.createElement('a');
  let type = 'png';
  $a.download = filename + '.' + type;
  $a.target = '_blank';
  $a.href = url;
  // Chrome and Firefox
  if (typeof MouseEvent === 'function') {
    let evt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: false
    });
    $a.dispatchEvent(evt);
  }
  // IE
  else {
    let html = ''
    + '<body style="margin:0;">'
    + '<img src="' + url + '" style="max-width:100%;" title="' + filename + '" />'
    + '</body>';
    let tab = window.open();
    tab.document.write(html);
  }
}
```

# 4.下载并重命名
``` JavaScript
Filedownload('data/excel/name.xlsx', `name_${new Date().getTime()}.xlsx`)
```

``` JavaScript
// 下载并重命名
/**
 * 获取 blob
 * @param  {String} url 目标文件地址
 * @return {cb}
 */
export function getBlob(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
        if (xhr.status === 200) {
            cb(xhr.response);
        }
    };
    xhr.send();
}
/**
 * 保存
 * @param  {Blob} blob
 * @param  {String} filename 想要保存的文件名称
 */
export function saveAs(blob, filename) {
    if (window.navigator['msSaveOrOpenBlob']) {
        navigator['msSaveBlob'](blob, filename);
    } else {
        var link = document.createElement('a');
        var body = document.querySelector('body');

        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        // fix Firefox
        link.style.display = 'none';
        body.appendChild(link);

        link.click();
        body.removeChild(link);

        window.URL.revokeObjectURL(link.href);
    };
}
/**
 * 下载
 * @param  {String} url 目标文件地址
 * @param  {String} filename 想要保存的文件名称
 */
export function Filedownload(url, filename) {
    getBlob(url, function (blob) {
        saveAs(blob, filename);
    });
};
```


# 5.Html 转 图片
``` JavaScript
/** 下载图片 */
private DownloadImg() {
  evt.fire(consts.notice_noticewarning_show, { firer: "图片生成中..." })

  var targetDom = document.querySelector("#TableContent");
  var tableDom = document.querySelector("#TableContent .table_content");
  var copyDom: any = targetDom.cloneNode(true);
  copyDom.style.width = (tableDom.scrollWidth + 120) + "px";
  copyDom.style.height = (tableDom.scrollHeight + 96 + 60) + "px";
  document.querySelector("body").appendChild(copyDom);

  html2canvas(copyDom, {
    background: "#ffffff",
    onrendered: (canvas) => {
      // console.log(canvas.toDataURL("image/png"));//生成base64图片
      let imgData = canvas.toDataURL("image/png");
      this.downloadFile(`pngname(${new Date().getTime()}).png`, imgData);
      copyDom.remove();
    }, useCORS: true
  });

}

//下载
private downloadFile(fileName, content) {
  let aLink = document.createElement('a');
  let blob = this.base64ToBlob(content); //new Blob([content]);

  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);

  // aLink.dispatchEvent(evt);
  //aLink.click()
  aLink.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));//兼容火狐
}
//base64转blob
private base64ToBlob(code) {
  let parts = code.split(';base64,');
  let contentType = parts[0].split(':')[1];
  let raw = window.atob(parts[1]);
  let rawLength = raw.length;

  let uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}
```
