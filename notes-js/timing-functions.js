// setTimeout (delay)

// @param func {Function} - function to execute later
// @param delay {Number} - delay in `ms` (!!! different from WebAudio API)
// @return id
const timeoutId = setTimeout(func, delay);
// cancel
clearTimeout(timeoutId);


// @example
setTimeout(() => {
  console.log('ping');

  setTimeout(() => {
    console.log('pong');
  }, 1000);
}, 1000);

// [wait 1s] --> 'ping' --> [wait 1s] --> 'pong'

// setInterval (metronome...)

// @param func {Function} - function to execute later
// @param period {Number} - period in `ms` (!!! different from WebAudio API)
// @return id
const intervalId = setInterval(func, period);
// cancel
clearInterval(intervalId);

// requestAnimationFrame (graphical loop)

// @param func {Function} - function to execute on next screen refresh (try to reach 60 FPS (16.6ms))
// @return id
const animFrameId = requestAnimationFrame(func);
// cancel
cancelAnimationFrame(animFrameId);

// @example
let animFrameId;

function render() {
  // render stuff
  animFrameId = requestAnimationFrame(render);
}

render();

// pseudo code
const intervalId = setInterval(() => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  // let played = false;

  if (hours === 18 && minutes === 0 && seconds === 0 /* && !played */) {
    // played = true;
    const currentTime = audioContext.currentTime;
    mySynth.playSomething(currentTime);
    clearInterval(intervalId);
  }
}, 100);

//
let tickId = null;
function tick() {
  // do something
  const meteo = await getMeteoInfos(); // async
  display(meteo);

  // wait for 100ms to call function again
  tickId = setTimeout(tick, 100);
}

tick();


