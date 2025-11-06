# 修饰符
在TS中可以给类的属性、方法及构造器设置修饰符，来限定它们的作用范围。默认修饰符是public，因此可以当前类和子类自由访问程序中定义的成员。

| public               | private                                                | protected                              |
| :------------------- | :----------------------------------------------------- | :------------------------------------- |
| 默认修饰符，共用成员 | 私有修饰符，私有成员                                   | 受保护的修饰符                         |
| 可以在任何位置访问   | 只能在声明类内部使用，不能被子类调用，不能在实例中访问 | 只能在子类中进行访问，不能在实例中使用 |

``` typescript
class Father{
  //公共成员
  public name:string;
  //私有成员
  private age:number;
  //受保护成员
  protected address:string;
  public constructor(name:string,age:number,address:string){
    this.name = name;
    this.age = age;
    this.address = address;
  }

  public eat(meters:number){
    console.log(`${this.name} moved ${meters}`);
  }
}

class Son extends Father{
  constructor(){
    super()
  }
  test(){
    console.log(this.name);//可访问
    console.log(this.age);//属性“age”为私有属性，只能在类“Father”中访问。
    console.log(this.address);//可访问
  }
}

const bigLiu = new Father("bigLiu",32,"四川省成都市");
console.log(bigLiu.name);//可访问
console.log(bigLiu.age);//属性“age”为私有属性，只能在类“Father”中访问。
console.log(bigLiu.address);//属性“address”受保护，只能在类“Father”及其子类中访问。

const smallLiu = new Son();
console.log(bigLiu.name);//可访问
console.log(bigLiu.age);//属性“age”为私有属性，只能在类“Father”中访问。
console.log(bigLiu.address);//属性“address”受保护，只能在类“Father”及其子类中访问。
```
