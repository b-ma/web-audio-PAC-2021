import '@babel/polyfill';
import { resumeAudioContext } from '@ircam/resume-audio-context/resumeAudioContext.js';
import { render, html } from 'lit-html';
import loaders from 'waves-loaders';
import masters from 'waves-masters';

class StepSequencer {
  constructor(audioContext, score, buffers) {
    this.audioContext = audioContext;
    this.score = score;
    this.buffers = buffers;

    this.currentStep = 0;
    this._numSteps = score[0].length;
    this._period;
    this.BPM = 60;

    this.output = this.audioContext.createGain();
  }

  set BPM(value) {
    this._period = 60 / value;
  }

  connect(dest) {
    this.output.connect(dest);
  }

  advanceTime(currentTime) {
    for (let i = 0; i < this.score.length; i++) {
      const track = this.score[i];
      const buffer = this.buffers[i];

      const active = track[this.currentStep];

      if (active === 1) {
        // play sound
        const src = this.audioContext.createBufferSource();
        src.buffer = buffer;
        src.connect(this.output);
        src.start(currentTime);
      }
    }

    // compute the next step
    this.currentStep = (this.currentStep + 1) % this._numSteps;

    return currentTime + this._period;
  }
}

async function init() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  await resumeAudioContext(audioContext);

  const soundfiles = [
    'sounds/909-BD-low.wav',
    'sounds/909-SD-low.wav',
    'sounds/909-PC-rimshot.wav',
    'sounds/909-HH-closed.wav',
    'sounds/909-CY-ride.wav',
    'sounds/909-HT-low.wav',
    'sounds/909-LT-low.wav',
    'sounds/909-MT-low.wav',
    'sounds/909-PC-clap.wav',
  ];

  const loader = new loaders.AudioBufferLoader();
  const buffers = await loader.load(soundfiles);

  const scheduler = new masters.Scheduler(() => audioContext.currentTime);

  const BPM = 120;
  const numSteps = 16;
  const numTracks = soundfiles.length;
  const score = [];
  // create tracks
  for (let i = 0; i < numTracks; i++) {
    const track = [];
    // populate each track with numSteps zeros
    for (let j = 0; j < numSteps; j++) {
      track[j] = (i === 0 ? 1 : 0); // fill first track w/ 1 for audio testing
      // track[j] = 0;
    }
    // add track to score
    score[i] = track;
  }

  // console.log(score);

  const stepSequencer = new StepSequencer(audioContext, score, buffers);
  stepSequencer.BPM = BPM;
  stepSequencer.connect(audioContext.destination);

  scheduler.add(stepSequencer);

  const template = html`
    <div>
      BPM
      <input
        type="number"
        min="20"
        max="1000"
        step="1"
        value="${BPM}"
        @change="${e => stepSequencer.BPM = parseInt(e.target.value)}"
      />
    </div>
    ${score.map((track, trackIndex) => {
      return html`
        <div>
          <span style="display: inline-block; width: 300px">
            ${soundfiles[trackIndex]}
          </span>
          ${track.map((stepValue, stepIndex) => {
            return html`
              <input
                type="checkbox"
                ?checked="${stepValue}"
                @change="${e => score[trackIndex][stepIndex] = e.target.checked ? 1 : 0}"
              />
            `;
          })}
        </div>
      `;
    })}
  `;

  const $container = document.body;
  render(template, $container);
}

// wait for the page to be fully loaded before launching app
window.addEventListener('load', init);









