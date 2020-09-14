const { BehaviorSubject } = require("rxjs");

const fakeHTTPRequest = (() => {
  let i = 0;
  return () => {
      i += 1
      console.log(`it will response in ${3 - i % 4}s`)
      const value = `It's the ${i}th result`
      return new Promise((r) => { setTimeout(() => r(value), (3 - i % 4) * 1000) })
  }
})();

const getLatestResponse = (request) => {
  const behaviorSub = new BehaviorSubject();
  return async () => {
    let temp;
    behaviorSub.next(request());
    await behaviorSub.subscribe({next: (value) => (temp = value)});
    return temp
  }
}

(async () => {
  console.log(await getLatestResponse(fakeHTTPRequest));
})();
(async () => {
  console.log(await getLatestResponse(fakeHTTPRequest));
})();
(async () => {
  console.log(await getLatestResponse(fakeHTTPRequest));
})();