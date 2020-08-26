function add(value) {
  const curry = function () {
    let args = [];
      const adder = function() {
          Array.prototype.push.apply(args,Array.prototype.slice.apply(arguments))
          return adder;
      }
      adder.toString = function () { //toString返回的是一个表现和数字一样对象, 隐式转换
          return args.reduce(function(a, b=0) {
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