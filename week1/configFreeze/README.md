### JS对象的冻结

> 对项目的 `config` 配置项进行处理，避免团队成员误操作而改变原始值
>
> ```javascript
> const config = {
>   wechat: {
>     appKey: 'mock appKey',
>     appSecret: 'mock appSecret'
>   }
> }
> 
> config.wechat.appKey = 'change app key' // 避免改变 config 内部的任何值
> 
> expect(config.wechat.appKey).toBe('mock appKey')
> ```

### 冻结对象

`Object.defineProperties()`

```javascript
const object1 = {};

Object.defineProperties(object1, {
  property1: {
    value: 42,
    writable: true
  },
  property2: {}
});

console.log(object1.property1);
// expected output: 42
```

`Object.defineProperty()`

```javascript
const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false
});

object1.property1 = 77;
// throws an error in strict mode

console.log(object1.property1);
// expected output: 42

```

#### 扩展 

```Object.freeze()```

冻结的对象既不可以扩展，又是密封的，而且对象数据属性的`writable`特性会被设置为`false`。 



`Object.preventExtensions()`

仅阻止添加自身的属性。但属性仍然可以添加到对象原型。

可以用 `Object.isExtensible(obj)` 来判断对象是否可扩展



`Object.seal()`

密封对象不可扩展，而且已有的属性成员`configurable`特性将被设置成`false`

可以用 `Object.isSealed()` 来判断对象是否已经被密封