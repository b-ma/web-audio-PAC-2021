import '@babel/polyfill';
import { resumeAudioContext } from '@ircam/resume-audio-context/resumeAudioContext.js';
import { render, html } from 'lit-html';

async function init() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  await resumeAudioContext(audioContext);


}

// wait for the page to be fully loaded before launching app
window.addEventListener('load', init);
