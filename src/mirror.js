import color from "color";

export default class Mirror {
  constructor(refX, refY) {
    this.refX = refX;
    this.refY = refY;
    this.color = color.rgb(0, 0, 255);
    this.initColor = false;
  }

  draw(ctx, world) {
    if (!this.initColor) {
      this.initColor = true;
      this.color = this.color.rotate((world.x + world.y) * 6);
    }

    const x = world.xPos + this.refX.x;
    const y = world.yPos + this.refY.y;

    ctx.beginPath();
    ctx.strokeStyle = this.color.toString();
    ctx.arc(x, y, 1, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();

    this.color = this.color.rotate(world.deltaTime * 15);
  }
}
