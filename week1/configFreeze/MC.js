const config = {
  wechat: {
    appKey: "mock appKey",
    appSecret: "mock appSecret",
  },
};

Object.entries(config.wechat).forEach(([key, value]) =>
  Object.defineProperty(config.wechat, key, {
    value,
    writable: false,
  })
);

config.wechat.appKey = "change app key"; // 避免改变 config 内部的任何值
config.wechat.appSecret = "change app secret"; // 避免改变 config 内部的任何值

console.log(config.wechat.appKey);
console.log(config.wechat.appSecret);
