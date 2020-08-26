### CurriedAdd

> 函数的柯里化：写出函数`Add`的实现
>
> ```javascript
> add(1)            => 返回 1
> add(1)(2)         => 返回 3
> add(1)(2)(3)      => 返回 6
> ```

#### 初始

现在有一个加法函数

```javascript
function add(x,y,z) {
  return x+y+z
}
```

调用方式是 `add(1,2,3)`

将它柯里化实现`add(1)(2)(3)`

```javascript
function curriedAdd1(x) {
  return function (y) {
    return function (z) {
      return x + y + z
    }
  }
}
```

#### 进阶

现在要让它不止可以接受三个参数，原理是规定**当不再传入参数的时候，就执行函数**

`arguments`实现

```javascript
const sum = function(val1, val2) {
  return val1 + val2;
}

function curry(sum) {
  let arr = [];
  return function reply() {
    const arg = Array.prototype.slice.call(arguments);
    arr = arr.concat(arg);

    if(arg.length === 0) { //递归结束条件
      return arr.reduce(function(p,c) {
        return p = sum(p,c);
      }, 0)
    } else {
      return reply;
    }
  }
}
let add = curry(sum);
console.log(add(1)(2)()) //3
add = curry(sum);
console.log(add(1)(2)(3)()); //6
```

#### 忽略最后一个()

```javascript
function add(value) {
  const curry = function () {
      let args = [];
      const adder = function adder() {
          Array.prototype.push.apply(args,Array.prototype.slice.apply(arguments))
          return adder;
      }
      adder.toString = function () {
          return args.reduce(function(a, b) {
              return a + b;
          })
      }
      return adder;
  }
  return curry()(value);
}

console.log(parseInt(add(1))); //隐式转换
console.log(parseInt(add(1)(2)));
console.log(parseInt(add(1)(2)(3)));
```



#### 参考资料

[JS专题之函数柯里化](https://zhuanlan.zhihu.com/p/55785190)

[隐式转换](https://dorey.github.io/JavaScript-Equality-Table/)



