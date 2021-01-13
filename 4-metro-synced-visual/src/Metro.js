class Metro {
  constructor(audioContext, state) {
    this.audioContext = audioContext;
    this.state = state;
    this.period = 1;
    this.output = this.audioContext.createGain();
    this.beat = 0;
  }

  connect(destination) {
    this.output.connect(destination);
  }

  advanceTime(currentTime, audioTime, dt) {
    const freq = this.beat === 0 ? 600 : 400;
    const src = this.audioContext.createOscillator();
    src.frequency.value = freq;
    src.connect(this.output);
    src.start(currentTime);
    src.stop(currentTime + 0.02);

    this.beat = (this.beat + 1) % 4;

    // try to sync data and visual state to audio...
    setTimeout(() => {
      this.state.metroValue = 1;

      setTimeout(() => {
        this.state.metroValue = 0;
      }, 100);
    }, Math.floor(dt * 1000));

    return currentTime + this.period;
  }
}

export default Metro;
