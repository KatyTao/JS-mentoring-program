const prom1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "one");
});
const prom2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "two");
});
const prom3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "three");
});
const prom4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "four");
});
const prom5 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "five");
});
const prom6 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "six");
});

Promise.each = function (promises) {
  promises.reduce(async (pre, next) => {
    if (!pre) return;
    return await pre.then(() =>
      next.then((data) => {
        console.log(data);
        return next;
      })
    );
  }, Promise.resolve());
};

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(
        (data) => {
          resolve(data);
          return;
        },
        (err) => reject(err)
      );
    });
  });
};

Promise.each([prom1, prom2]);

// Promise.race([prom1, prom2]).then((value) => {
//   console.log(value);
// });
