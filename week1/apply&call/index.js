function b() { console.log(arguments) }

function a() {
  let arr = [].slice.call(arguments).slice(-3);
  b.apply(null, arr);
}
a(1,2,3,4,5,6)
