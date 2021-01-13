
const priorityQueue = []; // .head() is the most urgent thing to do

// WARNING - WON'T WORK !!!
// inside scheduler
(function tick() {
  const now = getTimeFunction(); // audioContext.currentTime;

  while (priorityQueue.head().time < now + this.lookahead) {
    const engine = priorityQueue.pop();
    const nextTime = engine.advanceTime(engine.time);

    if (nextTime) {
      engine.time = nextTime;
      priorityQueue.add(engine);
    }
  }

  setTimeout(() => tick(), this.period);
}());

