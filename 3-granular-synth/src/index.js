import '@babel/polyfill';
import { resumeAudioContext } from '@ircam/resume-audio-context/resumeAudioContext.js';
import loaders from 'waves-loaders';
import masters from 'waves-masters';

  // const engine = {
  //   advanceTime: (currentTime) => {
  //     // console.log(currentTime);
  //     // const currentTime = audioContext.currentTime;
  //     const attackTime = 0.01;
  //     const releaseTime = 3;

  //     const env = audioContext.createGain();
  //     env.connect(audioContext.destination);

  //     env.gain.value = 0;
  //     env.gain.setValueAtTime(0, currentTime);
  //     env.gain.linearRampToValueAtTime(0.1, currentTime + attackTime);
  //     env.gain.exponentialRampToValueAtTime(0.0001, currentTime + releaseTime);

  //     const osc = audioContext.createOscillator();
  //     // osc.frequency.value = 200 + Math.random() * 600;
  //     osc.connect(env);
  //     osc.start(currentTime);
  //     osc.stop(currentTime + releaseTime);

  //     return currentTime + 1;
  //   },
  // };

class GranularEngine {
  constructor(audioContext, buffer) {
    this.audioContext = audioContext;
    this.buffer = buffer;

    this.period = 0.05;
    this.duration = 0.2;
    this.position = 0;

    this.output = this.audioContext.createGain();
  }

  connect(destination) {
    this.output.connect(destination);
  }

  advanceTime(currentTime) {
    const env = this.audioContext.createGain();
    env.connect(this.output);
    env.gain.value = 0;
    env.gain.setValueAtTime(0, currentTime);
    env.gain.linearRampToValueAtTime(1, currentTime + this.duration / 2);
    env.gain.linearRampToValueAtTime(0, currentTime + this.duration);

    const src = this.audioContext.createBufferSource();
    src.connect(env);
    src.buffer = this.buffer;

    src.start(currentTime, this.position);
    src.stop(currentTime + this.duration);

    return currentTime + this.period;
  }
}

async function init() {
  // make it Safari compatible
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  await resumeAudioContext(audioContext);

  const loader = new loaders.AudioBufferLoader();
  const buffer = await loader.load('drum-loop.wav');
  const getTimeFunction = function() { return audioContext.currentTime };
  const scheduler = new masters.Scheduler(getTimeFunction);

  const engine = new GranularEngine(audioContext, buffer);
  engine.connect(audioContext.destination);

  scheduler.add(engine);

  // interfaces
  const guiConfig = {
    period: {
      min: 0.02,
      max: 1,
      default: engine.period,
    },
    duration: {
      min: 0.02,
      max: 1,
      default: engine.duration,
    },
    position: {
      min: 0,
      max: buffer.duration,
      default: engine.position,
    },
  };

  for (let key in guiConfig) {
    const config = guiConfig[key];

    const $div = document.createElement('div');

    const $title = document.createElement('p');
    $title.textContent = key;

    const $slider = document.createElement('input');
    $slider.type = 'range';
    $slider.min = config.min;
    $slider.max = config.max;
    $slider.step = 0.001; // 1
    $slider.value = config.default;
    $slider.addEventListener('input', function(e) {
      engine[key] = parseFloat($slider.value);
    });

    $div.appendChild($title);
    $div.appendChild($slider);

    document.body.appendChild($div);
  }
}

// wait for the page to be fully loaded before launching app
window.addEventListener('load', init);
