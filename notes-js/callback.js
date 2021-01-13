function doSomethingNow(func) {
  const param = 2 + 2;
  func(param);
}


function doSomethingWhenDone(name, callback) {
  setTimeout(() => callback(name), Math.random() * 1000);
}

function log(value) {
  console.log(value);
}

doSomethingWhenDone('1', log);


doSomethingWhenDone('2', function (value) {
  console.log(value);
});

//
// doSomethingWhenDone('tada', function(name) {
//   // do something...
//   console.log(name);
// });

//


