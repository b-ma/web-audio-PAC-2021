// AudioNode
const osc = audioContext.createOscillator()

// audioContext = {
//   createOscillator() {
//     return new Oscillator(this);
//   }
// }
// or...
// osc = new Oscillator(audioContext);

// ...contains
osc.frequency // -> AudioParam

// AudioParams - same API for all AudioParams
AudioParam {
  value
  setValueAtTime(value, time);
  linearRampToValueAtTime(value, time);
  exponentialRampToValueAtTime(value, time);
  cancelScheduledValues(time);
  cancelScheduledValuesAndHold(time);
  setTargetAtTime(target, startTime, timeConstant);
}

