
const priorityQueue = []; // elements ordered accroding to their `time` attribute

// WARNING - WON'T WORK !!!
// inside scheduler
(function tick() {
  const now = getTimeFunction(); // audioContext.currentTime;

  // check time of the closest event
  while (priorityQueue[0] && priorityQueue[0].time < now + this.lookahead) {
    // retrieve closest event and reorder queue
    const engine = priorityQueue[0];
    const nextTime = engine.advanceTime(engine.time);

    priorityQueue.shift(); // remove first element

    // if nextTime re-insert the event in the queue and reorder it
    if (nextTime !== undefined) {
      engine.time = nextTime;
      priorityQueue.push(engine); // re-add engine
      priorityQueue.sort((a, b) => a.time < b.time ? -1 : 1);
    }
  }

  setTimeout(() => tick(), this.period);
}());

