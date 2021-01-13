class AMSynth {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this._carrier = audioContext.createOscillator();
    this._carrier.frequency.value = 200;

    this._mod = audioContext.createOscillator();
    this._mod.frequency.value = 2;

    this._depth = audioContext.createGain();
    this._depth.gain.value = 0.5;

    this._am = audioContext.createGain();
    this._am.gain.value = 0.5;

    this._carrier.connect(this._am);

    this._mod.connect(this._depth);
    this._depth.connect(this._am.gain);
  }

  set carrier(value) {
    const now = this.audioContext.currentTime;
    this._carrier.frequency.setTargetAtTime(value, now, 0.005);
  }

  set mod(value) {
    const now = this.audioContext.currentTime;
    this._mod.frequency.setTargetAtTime(value, now, 0.005);
  }

  set depth(value) {
    const now = this.audioContext.currentTime;
    this._depth.gain.setTargetAtTime(value / 2, now, 0.005);
    this._am.gain.setTargetAtTime(1 - (value / 2), now, 0.005);
  }

  connect(dest) {
    this._am.connect(dest);
  }

  start(time) {
    this._carrier.start();
    this._mod.start();
  }

  stop(time) {
    this._carrier.stop();
    this._mod.stop();
  }
}

export default AMSynth;
