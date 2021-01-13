import '@babel/polyfill';
import { resumeAudioContext } from '@ircam/resume-audio-context/resumeAudioContext.js';
import masters from 'waves-masters';
import Metro from './Metro.js';
import renderCanvas from './renderCanvas.js';
import renderGui from './renderGui.js';

const state = {
  metroValue: 0,
  started: false,
};

async function init() {
  // make it Safari compatible
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  await resumeAudioContext(audioContext);

  const getTimeFunction = function() { return audioContext.currentTime };
  const scheduler = new masters.Scheduler(getTimeFunction);

  const metro = new Metro(audioContext, state);
  metro.connect(audioContext.destination);

  const $guiContainer = document.querySelector('#controls');

  function toggleStarted() {
    state.started = !state.started;

    if (state.started) {
      scheduler.add(metro);
    } else {
      scheduler.remove(metro);
    }

    renderGui($guiContainer, state, toggleStarted);
  }

  renderGui($guiContainer, state, toggleStarted);

  const $canvas = document.querySelector('canvas');
  const ctx = $canvas.getContext('2d');
  renderCanvas(ctx, state); // launch visual rendering

}

// wait for the page to be fully loaded before launching app
window.addEventListener('load', init);
