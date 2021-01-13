
// const callbacks = []; // new Set();
const callbacks = new Set();
const state = {
  name: 'home',
};

const eventListener = {
  addListener(callback) {
    // callbacks.push(callback);
    callbacks.add(callback);
  }

  removeListener(callback) {
    // const index = callbacks.indexOf(callback);
    // callbacks.slice(index, 0);
    callbacks.remove(callback);
  }

  emit(name) {
    state.name = name;
    callbacks.forEach(callback => callback(event));
  }
};

