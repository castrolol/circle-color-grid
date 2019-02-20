class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.cells = [];
    this.deveLimpar = {};
    this.isBlack = false;
    window.clls = this.cells;
    for (var x = 0; x < rows; x++) {
      const row = [];
      for (var y = 0; y < cols; y++) {
        row.push(null);
      }
      this.cells.push(row);
    }
  }

  add(x, y, obj, deveLimpar) {
    this.cells[x][y] = obj;

    this.deveLimpar[`${x}-${y}`] = deveLimpar;
  }

  get(x, y) {
    return this.cells[x][y];
  }

  limpar(ctx, world, x, y) {
    if (!this.deveLimpar[`${x}-${y}`]) return;

    let width = world.width / this.cols;
    let height = world.height / this.rows;

    ctx.clearRect(x * width, y * height, width, height);

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(x * width, y * height, width, height);
    ctx.fill();
    ctx.closePath();
  }

  draw(ctx, world) {
    let width = world.width / this.cols;
    let height = world.height / this.rows;

    if (!this.isBlack) {
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.rect(0, 0, world.width, world.height);
      ctx.fill();
      ctx.closePath();
      this.isBlack = true;
    }

    for (var x = 0; x < this.rows; x++) {
      for (var y = 0; y < this.cols; y++) {
        const gameObject = this.cells[x][y];

        if (!gameObject) continue;
        const gameWorld = Object.assign({}, world);
        gameWorld.x = x;
        gameWorld.y = y;
        gameWorld.xPos = x * width;
        gameWorld.yPos = y * height;
        gameWorld.width = width;
        gameWorld.height = height;

        this.limpar(ctx, world, x, y);
        gameObject.draw(ctx, gameWorld);
      }
    }
    ctx.strokeStyle = "#334";
    for (var y = 1; y < this.rows; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * height);
      ctx.lineTo(world.width, y * height);
      ctx.stroke();
      ctx.closePath();
    }

    for (var x = 1; x < this.cols; x++) {
      ctx.beginPath();
      ctx.moveTo(x * width, 0);
      ctx.lineTo(x * width, world.height);
      ctx.stroke();
      ctx.closePath();
    }
  }
}

export default Grid;
