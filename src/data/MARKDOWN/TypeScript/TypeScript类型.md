# TypeScript 类型
## 1.基础类型

- ● **原始类型：**`number`、`string`、`boolean`、`null`、`undefined`、`void`、`any`、`unknown`、`never`、`symbol`、`bigint`
- ● **对象类型：**`object`、`Array`、`Tuple`、`Enum`、`Function`
- ● **联合类型‌：**通过 `|` 组合多个类型，如 `string | number`
- ● **‌交叉类型‌：**通过 `&` 合并多个类型，如 `type A = { a: number } & { b: string }`

## 2.高级类型

- ● **‌类型别名‌：**使用 `type` 关键字定义复杂类型，如 `type MyType = { name: string }`
- ● **‌接口‌：**通过 `interface` 定义对象结构，支持继承和扩展
- ● **‌泛型‌：**允许创建可重用的类型模板，如 `Array<T>`
- ● **‌字面量类型‌：**通过字面量限制变量值，如 `type Gender = 'male' | 'female'`

## 3.特殊类型

- ● **`‌any`‌**：放弃类型检查，允许任意类型值
- ● **`‌unknown`‌**：安全的 `any` 替代品，需类型断言后使用
- ● **`‌never`‌**：表示永远不会发生的类型，如函数抛出异常
- ● **`‌void`‌**：表示无返回值的函数类型

**关键特性**
- ● **‌类型推断‌：**编译器自动推断变量类型，可省略显式声明
- ● ‌**类型断言‌：**强制类型转换，如 `let x: any = 1; let y = x as number`
- ● **‌类型兼容性‌：**子类型和父类型关系，如 `string` 是 `any` 的子类型

TypeScript 通过这些类型系统增强了代码的可读性、可维护性和类型安全性。

## 4.类型断言
基本语法
``` TypeScript
// 两种写法
value as Type
<Type>value
```

# TypeScript 类型断言
类型断言（Type Assertion）是 TypeScript 中一种强制类型转换的机制，允许开发者明确指定变量的类型，绕过编译器的类型检查。

## 1.类型别名（Type Alias）
通过 `type` 关键字创建临时类型，仅在当前作用域有效。
``` TypeScript
type TempType = { key: string };
const obj: TempType = { key: "value" };
```
**特点‌：**编译时存在，运行时消失，不影响全局类型系统。

## 2. ‌接口（Interface）
通过 `interface` 关键字创建临时接口，支持继承和扩展。
``` TypeScript
interface TempInterface {
  id: number;
}
const item: TempInterface = { id: 1 };
```
**特点‌：**支持合并声明，适合复杂类型定义。

## 3.类型断言（Type Assertion）
通过 `as` 或 `<Type>` 将值强制转换为临时类型。
``` TypeScript
const data = {} as Record<string, any>;
data.key = "value"; // 动态添加属性
```
**特点‌：**绕过类型检查，需确保运行时类型安全。

## 4. ‌泛型（Generics）
通过 `<T>` 创建可重用的临时类型模板。
``` TypeScript
function create<T>(value: T): T {
  return value;
}
const result = create<string>("hello");
```
**特点‌：**支持类型参数化，增强代码复用性。

## 5. ‌字面量类型（Literal Types）
通过字面量限制临时变量的值范围。
``` TypeScript
type Status = "active" | "inactive";
const state: Status = "active";
```
**‌特点‌：**精确控制值域，减少类型错误。

## 6. ‌联合类型（Union Types）
通过 | 组合多个临时类型。
``` TypeScript
type Result = string | number;
const value: Result = "success";
```
**特点‌：**支持多类型值，增强灵活性。

## 7. ‌交叉类型（Intersection Types）
通过 & 合并多个临时类型。
``` TypeScript
type User = { name: string } & { age: number };
const user: User = { name: "Alice", age: 30 };
```
**特点‌：**组合属性，避免重复定义。

## 8. ‌类型推断（Type Inference）
编译器自动推断临时变量的类型。
``` TypeScript
const arr = [1, 2, 3]; // 编译器推断为 number[]
```
**特点‌：**减少显式类型声明，提高开发效率。

## 9. 类型保护（Type Guards）
通过条件判断确保临时变量的类型安全。
``` TypeScript
function isString(value: any): value is string {
  return typeof value === "string";
}
if (isString(data)) {
  data.toUpperCase(); // 类型安全
}
```
**‌特点‌：**增强类型安全性，避免运行时错误。

**关键注意事项**
- ●**‌类型安全‌：**临时类型需确保与实际值匹配，避免运行时错误。
- ●**‌作用域限制‌：**临时类型仅在定义作用域内有效，不影响全局类型系统。
- ●**‌性能影响‌：**编译时类型检查不影响运行时性能，但复杂类型可能增加编译时间。
- ●**‌最佳实践‌：**优先使用类型推断和类型别名，避免过度使用类型断言。
