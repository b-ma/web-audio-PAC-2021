function renderCanvas(ctx, state) {
  if (state.metroValue === 1) {
    setTimeout(() => {
      state.metroValue = 0;
    }, 100);
  }

  // console.log(state.metroValue);
  const { width, height } = ctx.canvas;
  // console.log(width, height);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = state.metroValue === 1 ? 'red' : 'white';
  ctx.rect(0, 0, width, height);
  ctx.fill();

  window.requestAnimationFrame(() => renderCanvas(ctx, state)); // 60 FPS
}

export default renderCanvas;
