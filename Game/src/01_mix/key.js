var gm = window.gm;
gm.mixins.controlKey = {
  key: function () {
    if (gm.key_Pressed("space"))
      gm.ins.create(gm.obj.potion, 500 * Math.random(), 500 * Math.random());
  }
};
gm.mixins.interactKey = {
  key: function () {
    if (gm.key_Pressed("enter") && this.color === "blue") {
      this.color = "red";
      this.frame_0 = gm.ticks;
      this.setTimer();
      const ids = this.checkCollision(50);
      for (let id in ids) {
        if (ids[id] !== 0) {
          let other = gm.ins.get(ids[id]);
          let dmg = 0;
          if (other.damaged !== true) {
            if (other.dmg) dmg = other.dmg(this, 2);
            if (other.hp) other.hp -= dmg;
            if (other.damaged !== undefined) other.damaged = true;
            other.frame_0 = gm.ticks;
          }
        }
      }
    }
  }
};
gm.mixins.moveKey = {
  key: function () {
    const sX = 5;
    const sY = 5;
    if (this.color === "blue") {
      if (gm.key("left")) {
        this.dir = "left";
        this.x -= sX;
      }
      if (gm.key("up")) {
        this.dir = "up";
        this.y -= sY;
      }
      if (gm.key("right")) {
        this.dir = "right";
        this.x += sX;
      }
      if (gm.key("down")) {
        this.dir = "down";
        this.y += sY;
      }
    }
  }
};
gm.mixins.moveSpeedKey = {
  key: function () {
    const sX = 0.5;
    const sY = 0.2;
    if (gm.keyboard.indexOf(37) !== -1) this.xSpeed -= sX;
    if (gm.keyboard.indexOf(38) !== -1) this.ySpeed -= sY;
    if (gm.keyboard.indexOf(39) !== -1) this.xSpeed += sX;
    if (gm.keyboard.indexOf(40) !== -1) this.ySpeed += sY;
  }
};
