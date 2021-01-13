class GranularEngine {
  constructor(audioContext, buffer) {
    this.audioContext = audioContext;
    this.buffer = buffer;

    this.period = 0.05;
    this.duration = 0.2;
    this.position = 0;
    // this.resamplingRate = 0; // cents

    this.output = this.audioContext.createGain();
  }

  connect(destination) {
    this.output.connect(destination);
  }

  advanceTime(currentTime) {
    const jit = Math.random() * 0.002;
    const triggerTime = currentTime + jit;

    const env = this.audioContext.createGain();
    env.connect(this.output);
    env.gain.value = 0;
    env.gain.setValueAtTime(0, triggerTime);
    env.gain.linearRampToValueAtTime(1, triggerTime + this.duration / 2);
    env.gain.linearRampToValueAtTime(0, triggerTime + this.duration);

    const src = this.audioContext.createBufferSource();
    src.connect(env);
    src.buffer = this.buffer;

    src.start(triggerTime, this.position);
    src.stop(triggerTime + this.duration);

    return currentTime + this.period;
  }
}

export default GranularEngine;
