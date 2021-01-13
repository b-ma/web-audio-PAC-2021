import '@babel/polyfill';
import { resumeAudioContext } from '@ircam/resume-audio-context/resumeAudioContext.js';
// rendering dependencies
import { render, html } from 'lit-html';
import '@ircam/simple-components/sc-text.js';
import '@ircam/simple-components/sc-slider.js';

import AMSynth from './AMSynth.js';

async function init() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  await resumeAudioContext(audioContext);

  const params = {
    carrier: {
      min: 50,
      max: 2000,
      default: 200,
    },
    mod: {
      min: 0,
      max: 2000,
      default: 2,
    },
    depth: {
      min: 0,
      max: 1,
      default: 1,
    },
  };

  const amSynth = new AMSynth(audioContext);
  amSynth.connect(audioContext.destination);

  // init synth with default params
  for (let name in params) {
    amSynth[name] = params[name].default;
  }

  // create synth controls
  const template = html`
    ${Object.keys(params).map(name => {
      return html`<div>
        <sc-text value="${name}"></sc-text>
        <sc-slider
          display-number
          min="${params[name].min}"
          max="${params[name].max}"
          value="${params[name].default}"
          @input="${e => amSynth[name] = e.detail.value}"
        ></sc-slider>
      </div>`;
    })}
    </div>
  `;
  const $container = document.body;

  render(template, $container);

  // start synth
  amSynth.start();
}

// wait for the page to be fully loaded before launching app
window.addEventListener('load', init);

















