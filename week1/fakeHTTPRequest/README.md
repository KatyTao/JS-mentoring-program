### fakeHTTPRequest

> 解决先发出请求后接到响应的问题，要求不改变fakeHTTPRequest
>
> 预期打印结果如下
>
> ```javascript
> It's the 3th result
> It's the 3th result
> It's the 3th result
> ```
>
> ```javascript
> const fakeHTTPRequest = (() => {
>   let i = 0;
>   return () => {
>       i += 1
>       console.log(`it will response in ${3 - i % 4}s`)
>       const value = `It's the ${i}th result`
>       return new Promise((r) => { setTimeout(() => r(value), (3 - i % 4) * 1000) })
>   }
> })();
> 
> 
> (async () => { console.log(await fakeHTTPRequest()) })();
> (async () => { console.log(await fakeHTTPRequest()) })();
> (async () => { console.log(await fakeHTTPRequest()) })();
> ```

