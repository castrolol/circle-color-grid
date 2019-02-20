class Mouse {
  constructor() {
    this.keys = {};

    document.body.addEventListener("keydown", event => {
      console.log(event);
      this.keys[event.code] = true;
    });

    document.body.addEventListener("keyup", event => {
      this.keys[event.code] = false;
    });
  }

  key(keyName) {
    return this.keys[keyName] || false;
  }
}

export default new Mouse();
