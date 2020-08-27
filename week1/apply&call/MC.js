function b() {
  console.log(arguments);
}

function a() {
  let arr = [].slice.call(arguments, arguments.length - 3);
  b.apply(null, arr);
}

a(1, 2, 3, 4, 5, 6);
