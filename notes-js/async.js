
// EventListener


// cf. 2-webaudio
$resumeBtn.addEventListener('click', function() {
  audioContext.resume().then(function() {
    console.log('audioContext resumed');

    $resumeBtn.remove();
    initSynth();
  });
});


document.body.addEventListener('click', event => {
  // do something...
});

//
const onClick = async () => {
  await audioContext.resume();
  console.log('audioContext resumed!');
  // do something
}


// with promise async / await keywords
$resumeBtn.addEventListener('click', onClick);

// Promise
const promise = audioContext.resume();
promise.then(() => {
  // do something
}).catch(err => {
  // window.reload();
});





function asyncAdd(a, b) {
  return Promise.resolve(a + b);
}


// given a, b, c, async stuff

// sequencial = function(callback) {
//   a((resA) => {
//     b(resA, resB => {
//       c(resB, resC => {
//         callback(resC);
//       });
//     });
//   });
// }

async function sequenciel() {
  const resA = await a();
  const resB = await b(resA);
  const res = await c(resB);
  return res;
}

// const promises = [a(), b(), c()];

function parallel() {
  const promiseA = a();
  const promiseB = b();
  const promiseC = c();
  const promises = [promiseA, promiseB, promiseC];
  return Promise.all(promises);
}





