const { merge, from } = require("rxjs");
const { first } = require("rxjs/operators");

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

const rxWrapper = (fakeHTTPRequest) => {
  const arr = [];
  const rst = [];
  return () =>
    new Promise((resolve) => {
      const rx = from(fakeHTTPRequest());
      arr.push(rx);
      merge(...arr)
        .pipe(first())
        .subscribe((data) => {
          rst[arr.indexOf(v)] = data;
          let target = arr.length;
          while (!rst[target]) target--;
          return resolve(rst[target]);
        });
    });
};

const myRx = rxWrapper(fakeHTTPRequest);

(async () => {
  console.log(await myRx());
})();
(async () => {
  console.log(await myRx());
})();
(async () => {
  console.log(await myRx());
})();
