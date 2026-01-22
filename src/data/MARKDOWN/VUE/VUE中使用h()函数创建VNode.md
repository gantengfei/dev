通过 **Vue** 的 `h()` 函数 创建 **VNode**

# Element Plus 虚拟表格

`el-table-v2` 的 `cellRenderer` 类型为：
``` TypeScript
(cellProps: CellProps) => VNode | string
```

`cellRenderer` 参数结构:

在 **Element Plus ≥ v2.13.0** 中，`el-table-v2` 的 `cellRenderer` 回调函数参数类型为：
``` TypeScript
type CellRenderProps<T> = {
  cellData: T
  column: Column<T>
  columns: Column<T>[]
  columnIndex: number
  rowData: any
  rowIndex: number
}
```

## ❑ 使用 `h()` 渲染 `span`

推荐使用 `h()` 创建 **VNode**，性能更好且类型安全：

``` TypeScript
import { h } from 'vue'
import { type Column } from 'element-plus';

public tableColumns: Column<any>[] = [
  {
    key: 'name', title: '名称', dataKey: 'name', width: 200, align: 'center',
    cellRenderer: ({ cellData: name }) => this.code2name(name),
  },
  {
    key: 'state', title: '状态', dataKey: 'state', width: 200, align: 'center',
    cellRenderer: ({ cellData: state }) => h('span', { class: `state${state}` }, this.statecode2name(state)),
  }
];

private statecode2name(code: string) {
  switch (code) {
    case '0': return '正常';
    case '1': return '异常';
    default: return code;
  }
}
```

## ❑ 使用 `h()` 渲染 `el-link` 并绑定 `click`

``` TypeScript
import { reactive, h } from 'vue'
import { type Column } from 'element-plus';

public tableData: any = reactive([])
public tableColumns: Column<any>[] = [
  {
    key: 'operation', title: '操作', width: 320, align: 'center',
    cellRenderer: ({ rowIndex }) => {
      return h(
        ElLink,
        {
          size: 'small',
          type: 'primary',
          underline: false,
          onClick: () => this.handleEdit(this.tableData[rowIndex])
        },
        { default: () => '编辑' }
      )
    }
  }
];

private handleEdit(row: any) {
  console.log('要编辑的行:', row)
}
```
