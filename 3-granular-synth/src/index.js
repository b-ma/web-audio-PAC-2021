import '@babel/polyfill';
import { resumeAudioContext } from '@ircam/resume-audio-context/resumeAudioContext.js';
import loaders from 'waves-loaders';
import masters from 'waves-masters';
import GranularEngine from './GranularEngine.js';

async function init() {
  // make it Safari compatible
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  await resumeAudioContext(audioContext);

  const loader = new loaders.AudioBufferLoader();
  const buffer = await loader.load('drum-loop.wav');

  const data = buffer.getChannelData(0); // left
  console.log(data);

  const getTimeFunction = () => audioContext.currentTime;
  const scheduler = new masters.Scheduler(getTimeFunction);
  // console.log(scheduler);

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
    // resamplingRate: {
    //   min: -1200,
    //   max: 1200,
    //   default: engine.position,
    // },
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
