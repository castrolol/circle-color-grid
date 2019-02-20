const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function clear() {
  ctx.clearRect(0, 0, canvas.height, canvas.height);
}

const world = { deltaTime: 0, lastTime: new Date(), width: canvas.width, height: canvas.height };

function draw(action) {
  world.deltaTime = (new Date().getTime() - world.lastTime.getTime()) / 1000;

  action(ctx, world);
  requestAnimationFrame(() => draw(action));

  world.lastTime = new Date();
}

export { draw };
