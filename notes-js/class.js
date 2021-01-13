

class Synth {
  constructor(audioContext, freq, period) {
    this.audioContext = audioContext;
    this.freq = freq;
    this.period = period;
    this.attackTime = 0.01;
    this.releaseTime = 3;

    this.output = this.audioContext.createGain();
  }
  connect(destination) {
    this.output.connect(destination);
  }
  advanceTime(currentTime) {
    const env = audioContext.createGain();
    env.connect(this.output);

    env.gain.value = 0;
    env.gain.setValueAtTime(0, currentTime);
    env.gain.linearRampToValueAtTime(1, currentTime + this.attackTime);
    env.gain.exponentialRampToValueAtTime(0.0001, currentTime + this.releaseTime);

    const osc = audioContext.createOscillator();
    osc.frequency.value = this.freq;
    osc.connect(env);
    osc.start(currentTime);
    osc.stop(currentTime + this.releaseTime);

    // call me back in this.period seconds
    return currentTime + this.period;
  }
}

// const synth1 = new Synth(audioContext, 400 * 1, 1);
// const synth2 = new Synth(audioContext, 400 * 2, 1/2);
// const synth3 = new Synth(audioContext, 400 * 3, 1/3);

// scheduler.add(synth1);
// scheduler.add(synth2);
// scheduler.add(synth3);

const numVoices = 4;
const baseFreq = 200;

for (let i = 0; i < numVoices; i++) {
  const synth = new Synth(audioContext, baseFreq * (i + 1), 1 / (i + 1));
  scheduler.add(synth);
}


// extend classes
class Animal {
  constructor(numLegs, name) {
    this.numLegs = 0;
    this.name = name;
  }

  saySomething() {
    // to be implemented by derived classes
  }
}

class Dog extends Animal {
  constructor(name) {
    super(4, name);
  }

  saySomething() {
    console.log('wouaf');
  }
}

class Human extends Animal {
  constructor(name) {
    super(2, name);
  }

  saySomething() {
    console.log('hello', this.name);
  }
}

const bob = new Human('bob');
bob.saySomething();

const bidule = new Dog('bidule');
bidule.saySomething();

[bob, bidule].forEach(animal => {
  animal.saySomething();
});

