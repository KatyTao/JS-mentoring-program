const { BehaviorSubject } = require("rxjs");

const fakeHTTPRequest = (() => {
  let i = 0;
  return () => {
    i += 1;
    console.log(`it will response in ${3 - (i % 4)}s`);
    const value = `It's the ${i}th result`;
    return new Promise((r) => {
      setTimeout(() => r(value), (3 - (i % 4)) * 1000);
    });
  };
})();

const bsRequest = () => {
  const behavior$ = new BehaviorSubject();
  const requests = [],
    results = [];
  return async (callback) => {
    const key = Symbol(callback);
    requests.push(key);
    behavior$.next({ key: key, value: await callback() });
    behavior$.subscribe((value) => {
      results[requests.indexOf(value.key)] = value.value;
    });
    let target = requests.length - 1;
    while (!results[target]) target--;
    return results[target];
  };
};

const myRx = bsRequest();

(async () => {
  console.log(await myRx(fakeHTTPRequest));
})();
(async () => {
  console.log(await myRx(fakeHTTPRequest));
})();
(async () => {
  console.log(await myRx(fakeHTTPRequest));
})();
