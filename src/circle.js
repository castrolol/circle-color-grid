export default class Circle {
  constructor(speed, top) {
    this.elapsed = top ? Math.PI / 3 : 0;
    this.speed = speed;
    this.top = top;
  }

  draw(ctx, world) {
    let x = world.xPos + world.width / 2;
    let y = world.yPos + world.height / 2;
    let radius = (Math.min(world.width, world.height) / 2) * 0.8;

    ctx.beginPath();

    ctx.strokeStyle = "#eef";
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();

    this.elapsed += world.deltaTime * this.speed;

    x += Math.sin(this.elapsed) * radius;
    y += Math.cos(this.elapsed) * radius;

    this.x = x - world.xPos;
    this.y = y - world.yPos;

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  update(world) {}
}
