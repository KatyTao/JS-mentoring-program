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

const bsRequest = (fakeHTTPRequest) => {
  const behavior$ = new BehaviorSubject();
  return async () => {
    let temp = null;
    behavior$.next(fakeHTTPRequest());
    await behavior$.subscribe({ next: (value) => (temp = value) });
    return temp;
  };
};

const myRx = bsRequest(fakeHTTPRequest);

(async () => {
  console.log(await myRx());
})();
(async () => {
  console.log(await myRx());
})();
(async () => {
  console.log(await myRx());
})();
