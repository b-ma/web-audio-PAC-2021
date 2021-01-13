const audioContext = new AudioContext();
// get button from html
const $resumeBtn = document.querySelector('#resume-context');

$resumeBtn.addEventListener('click', function() {
  audioContext.resume().then(function() {
    console.log('audioContext resumed');

    $resumeBtn.remove();
    initSynth();
  });
});

function triggerSine() {
  const now = audioContext.currentTime;
  const attackTime = 0.01;
  const releaseTime = 3;

  const env = audioContext.createGain();
  env.connect(audioContext.destination);

  env.gain.value = 0;
  env.gain.setValueAtTime(0, now);
  env.gain.linearRampToValueAtTime(0.2, now + attackTime);
  env.gain.exponentialRampToValueAtTime(0.0001, now + releaseTime);

  const osc = audioContext.createOscillator();
  osc.frequency.value = 200 + Math.random() * 600;
  osc.connect(env);
  osc.start(now);
  osc.stop(now + releaseTime);
}

function initSynth() {
  // get control area
  const $controls = document.querySelector('#controls');
  // create a button
  const $trigger = document.createElement('button');
  // set the text of the button
  $trigger.textContent = 'trigger';
  // put the button into the control zone
  $controls.appendChild($trigger);

  $trigger.addEventListener('click', function() {
    triggerSine();
    // setInterval(triggerSine, 100);
  });
}

