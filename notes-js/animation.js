class Object {
  constructor() {
    // param
  }

  update(dt) {
    // update physic
  }

  render(ctx) {
    // drawing
  }
}

const worldObjects = [/**/];
let lastTime = 0;

function loop(timestamp) {
  const dt = timestamp - lastTime;
  lastTime = timestamp;

  worldObjects.forEach(object => object.update(dt));
  worldObjects.forEach(object => object.render(ctx));

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
