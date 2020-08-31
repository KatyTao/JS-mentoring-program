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

const takeLast = () => {
  const registry = [];
  const responses = [];

  return (promise) => {
    registry.push(promise);
    return new Promise((...callbacks) => {
      const newCallBacks = callbacks.map((callback) => (res) => {
        responses[registry.indexOf(promise)] = res;
        let target = registry.length - 1;
        while (!responses[target]) target--;
        callback(responses[target]);
      });
      promise.then(...newCallBacks);
    });
  };
};

const last = takeLast();

(async () => {
  console.log(await last(fakeHTTPRequest()));
})();
(async () => {
  console.log(await last(fakeHTTPRequest()));
})();
(async () => {
  console.log(await last(fakeHTTPRequest()));
})();
