import mouse from "./mouse";
const GRAVITY = 300;

export default class Bola {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.velX = 100;
    this.velY = 0;
    this.color = color;
  }

  draw(ctx, world) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.closePath();
  }
  changeColor() {
    if (this.color == "red") {
      this.color = "green";
    } else if (this.color == "green") {
      this.color = "blue";
    } else {
      this.color = "red";
    }
  }
  update(world) {
    // this.x += this.velX * world.deltaTime;
    // this.y += this.velY * world.deltaTime;
    let velX = this.velX;

    let isOnGround = false;

    if (this.y + 35 > world.height) {
      isOnGround = true;
    }

    if (!isOnGround) {
      velX *= 0.25;
    }

    this.color = "green";

    if (mouse.key("ArrowRight")) {
      var movement = velX * world.deltaTime;

      if (this.x + movement + 30 > world.width) {
        movement = 0;
      }

      this.x += movement;

      this.color = "red";
    }

    if (mouse.key("ArrowLeft")) {
      var movement = -velX * world.deltaTime;

      if (this.x - movement - 30 < 0) {
        movement = 0;
      }

      this.x += movement;
      this.color = "blue";
    }
    var gravityFactor = GRAVITY;

    if (this.velY > 0) {
      this.velY -= GRAVITY * world.deltaTime * 2;

      if (mouse.key("Space")) {
        gravityFactor *= 0.65;
      } else if (this.velY < GRAVITY) {
        gravityFactor *= 1.15;
      }
    } else {
      this.velY = 0;
    }
    if (mouse.key("Space") && isOnGround) {
      this.velY = 600;
    }

    var movement = gravityFactor * world.deltaTime;
    movement += -this.velY * world.deltaTime;

    if (this.y + movement + 30 > world.height) {
      movement = 0;
    }

    this.y += movement;
  }
}
