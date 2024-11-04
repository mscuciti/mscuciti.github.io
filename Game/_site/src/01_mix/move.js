gm.mixins.move = {
  friction: function () {
    this.xSpeed = this.xSpeed * 0.9;
    this.xSpeed = this.xSpeed * 0.9;
    if (Math.abs(this.xSpeed) < 0.01) this.xSpeed = 0;
  },
  gravity: function () {
    if (this.y + 32 < gm.level.h) this.ySpeed += 0.09;
    else {
      this.ySpeed = 0;
      this.y = gm.level.h - 32.1;
    }
    if (this.x < 0) {
      this.xSpeed = -1 * this.xSpeed;
      this.x = 1;
    }
  },
  wrap: function () {
    const size = 32;
    if (this.y > gm.level.h + size) this.y = -size;
    if (this.x > gm.level.w + size) this.x = -size;
    if (this.y < -size) this.y = gm.level.h + size;
    if (this.x < -size) this.x = gm.level.w + size;
  }
};
