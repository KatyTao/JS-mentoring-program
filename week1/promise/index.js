//refer: https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/
//refer: https://zhuanlan.zhihu.com/p/89644715

const prom1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("1st");
  }, 1000);
});
const prom2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("2nd");
  }, 500);
});
const prom3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("3rd");
  }, 1200);
});
const prom4 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("4th");
  }, 1300);
});
const prom5 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("5th");
  }, 1500);
});
const prom6 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("6th");
  }, 1600);
});

Promise.each = (arr) => {
  arr.reduce(async (prevPromise, nextID) => {
    await prevPromise;
    return methodThatReturnsAPromise(nextID);
  }, Promise.resolve());
};

async function methodThatReturnsAPromise(nextID) {
  await nextID.then((res) => {
    console.log(res);
  });
}

const arr = [prom1, prom2, prom3];
//Promise.each(arr); //1st, 2nd, 3rd

Promise.race = (arr) => {
  return new Promise((resolve, reject) => {
    if (arr.length === 0) {
      return;
    } else {
      for (let item of arr) {
        item.then((data) => {
          resolve(data);
        }, reject);
      }
    }
  }).then((value) => {
    console.log(value);
  });
};
raceArr = [prom1, prom2];
Promise.race(raceArr); //2nd

Promise.trunk = (arr, length) => {
  const data = arr
    .reduce(
      ([groups, subIndex], d) => {
        // subIndex 根据cols在[0, cols]区间循环，通过取余来更新subIndex
        // 所以, subIndex === 0 表示产生了一个新的分组
        if (subIndex === 0) {
          groups.unshift([]);
          //此时建立一个新分组
        }
        //把新分好的分组加入进去
        groups[0].push(d);
        return [groups, (subIndex + 1) % length];
      },
      [[], 0] //初始值
    )[0]
    .reverse(); //取groups[0]并reverse

  for (let item of data) {
    Promise.each(item);
  }
};

Promise.trunk([prom3, prom4, prom5, prom6], 2);
