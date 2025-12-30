**【错误提示】**
> <span style="color:#dc362e;">Uncaught (in promise) TypeError: Cannot write private member to an object whose class did not declare it</span>

![输入图片说明](./src/img/images/13b41258_4993153.png "")

当vue使用`ref/reactive`声明一个响应式的对象时，若该对象的某个成员变量（也是个对象）会操作它自己的私有变量

**【错误原因】**

ref代理后导致其地址改变，在私有变量看来不再是私有变量所属的类，因此会报错无法访问其他类的私有变量。

**【解决办法】**

使用`shallowRef`进行浅层响应式，但是要注意，使用`shallowRef`会造成所有的引用类型的成员变量都无法进行响应式更新

通过使用`shallowRef`和`shallowReactive`，我们可以更加灵活地处理响应式数据。它们能够提高性能，并且在某些场景下帮助我们避免不必要的响应式更新。

当我们明确知道某个值或对象的内部属性不需要进行深层次的响应式处理时，就可以选择使用`shallowRef`或`shallowReactive`来优化我们的代码。


# shallowRef
## 功能和用法

`shallowRef`是一个函数，用于创建一个基本类型的响应式引用。与`ref`不同，`shallowRef`只会对其传入的值进行浅层次的响应式处理。也就是说，如果传入的是对象，则不会对对象内部的属性进行响应式处理。

``` TypeScript
import { shallowRef } from 'vue'

const count = shallowRef(0)
console.log(count.value) // 输出：0

count.value++
console.log(count.value) // 输出：1
```

## 优势

使用`shallowRef`可以避免不必要的响应式更新，提高性能。当我们知道某个数据不需要进行深层次的响应式处理时，就可以选择使用`shallowRef`。

例如，当我们从服务器获取到一个包含大量数据的对象时，我们可能只需要对该对象的某个属性进行响应式处理，而不需要对整个对象进行响应式处理。这时候，使用`shallowRef`可以更好地满足我们的需求。

# shallowReactive
## 功能和用法

`shallowReactive`是一个函数，用于创建一个浅层次的响应式对象。与`reactive`不同，`shallowReactive`只会对对象的第一层属性进行响应式处理，不会递归地将对象内部的属性都变成响应式。

``` TypeScript
import { shallowReactive } from 'vue'

const user = shallowReactive({
  name: 'John',
  age: 25,
  address: {
    city: 'New York',
    country: 'USA'
  }
})

console.log(user.name) // 输出：'John'
console.log(user.age) // 输出：25
user.age++
console.log(user.age) // 输出：26

// 注意，address仍然是非响应式的
console.log(user.address.city) // 输出：'New York'
```

## 优势

使用`shallowReactive`可以避免在某些场景下产生不必要的响应式数据。当我们确定某个对象的内部属性不需要进行响应式处理时，可以选择使用`shallowReactive`。

例如，在某些情况下我们可能会从后端接口得到一些包含大量属性的嵌套对象，但我们只需要对其中的一部分属性进行响应式处理，这时使用`shallowReactive`就非常合适。
