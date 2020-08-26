### Promise

> 实现 `Promise.each()` `Promise.race()` `Promise.trunk()`

#### Reduce

[Reduce方法详解](https://zhuanlan.zhihu.com/p/89644715)

```js
arr.reduce(reducer, initial)
reducer = (total/prev, current, currentIndex, arr)
initial为初始值
```

以累加为例

```javascript
const arr = [1, 2, 3, 4]
const accumulator = (total, current, currentIndex, arr) => {
  console.log(total, current, currentIndex, arr);
	return total + current
}
console.log(arr.reduce(accumulator),3)
```

输出

![img](https://picb.zhimg.com/80/v2-80dd865fe8dd4fe248eab5ce909623e9_720w.jpg)



#### Promise.each()

非标准API，实现逐个处理

根据reduce，逐个处理的promise可以写成

```javascript
let userIDs = [1,2,3];

userIDs.reduce( (previousPromise, nextID) => {
  return previousPromise.then(() => {
    return methodThatReturnsAPromise(nextID);
  });
}, Promise.resolve());
```

改进为

```javascript
let userIDs = [1,2,3];

userIDs.reduce( async (previousPromise, nextID) => {
  await previousPromise;
  return methodThatReturnsAPromise(nextID);
}, Promise.resolve());
```

refer: [Why Using reduce() to Sequentially Resolve Promises Works](https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/)

#### Promise.race()

The `Promise.race()` method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.

返回最快获得的结果，不管是resolve还是reject

refer: [理解和使用Promise.all和Promise.race](https://www.jianshu.com/p/7e60fc1be1b2)

#### Promise.trunk()

类似`_.chunk()`, 将promise分组执行

refer: [Underscore.js|_.chunk()](https://www.geeksforgeeks.org/underscore-js-_-chunk/#:~:text=chunk()%20function%3A,of%20arrays%20using%20this%20function)

