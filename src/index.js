import { draw } from "./canvas";
import Bola from "./bola";
import Circle from "./circle";
import Grid from "./grid";
import Mirror from "./mirror";

const cores = ["red", "green", "blue", "blue"];

function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const x = 100;
const y = 100;
const bola = new Bola(x, y, cores[0]);

const rows = 12;
const cols = 12;

const grid = new Grid(rows, cols);

for (let x = 1; x < rows; x++) {
  grid.add(x, 0, new Circle(x, true), true);
}
for (let y = 1; y < cols; y++) {
  grid.add(0, y, new Circle(y), true);
}

for (let x = 1; x < rows; x++) {
  for (let y = 1; y < cols; y++) {
    grid.add(x, y, new Mirror(grid.get(x, 0), grid.get(0, y)), false);
  }
}

draw((ctx, world) => {
  // draw time

  grid.draw(ctx, world);
});
