#### Array-like objects

> `slice` method can also be called to convert Array-like objects/collections to a new Array. You just [`bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) the method to the object. The [`arguments`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) inside a function is an example of an 'array-like object'.

```js
function list() {
  return Array.prototype.slice.call(arguments)
}

let list1 = list(1, 2, 3) // [1, 2, 3]
```

其中`Array.prototype.slice.call(arguments)` 可缩写为`[].slice.call(arguments)`

#### Call vs Apply

>  Call and apply are very similar: both invoke the function they are called on, and take a ‘this’ argument as their first argument.

* `call()` passes all arguments after the first one on to the invoked function
* `apply()` takes an array as its second argument and passes the members of that array as arguments

The following have the same effect.

```js
someFunc.call(thisArg, 1, 2, 3)
someFunc.apply(thisArg, [1, 2, 3])
```

It is used to set the value of *this* inside the function you’re invoking, just as if the function were a method invoked on the object you pass as your this argument.

```js
const someFunc = function () {
	return this.length
}
someFunc.apply([1, 2, 3]) //3
someFunc.call([1, 2, 3]) //3
//以上均等同于
[1, 2, 3].someFunc(); //3 ([1,2,3].length)
```

另外`someFunc`如果没有特殊绑定的话会返回`undefined`因为此时的`this`指向了`window`

如果想把一个数组作为单独的参数传递给某个函数，可以使用

```javascript
someFunc.apply(null,array); 
//es6中等同于↓
someFunc(...array)
```



