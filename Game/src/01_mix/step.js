var gm = window.gm;
// shrimp to the past...
gm.mixins.chara = {
  step: function () {
    //    console.log(this);
    // animation
    this.tick === undefined ? (this.tick = 0) : this.tick++;
    // states
    this.painTicks = 100;
    if (this.color === "red") {
      if (gm.ticks > this.frame_0 + this.painTicks) {
        this.color = "blue";
      }
    }
    const quarterWidth = (3 * gm.vport.w) / 8;
    const quarterHeight = (3 * gm.vport.h) / 8;
    gm.offX = scroll(this.x, gm.offX, gm.level.w, gm.vport.w, quarterWidth);
    gm.offY = scroll(this.y, gm.offY, gm.level.h, gm.vport.h, quarterHeight);
  }
};
const scroll = function (xy, offXY, sizeRoom, sizeView, margin) {
  // check room boundaries
  if (xy < margin) return 0;
  else if (xy > sizeRoom - margin) return sizeRoom - sizeView;
  // check view boundaries
  else if (xy > offXY + sizeView - margin) return xy + margin - sizeView;
  else if (xy < offXY + margin) return xy - margin;
  else return offXY;
};
gm.mixins.potion = {
  step: function () {
    // motion
    if (gm.ticks % 150 === 0) {
      this.xSpeed = 0.5 * (Math.random() - 0.5);
      this.ySpeed = 5 * (Math.random() - 0.5);
    }
    // states
    const painTicks = 100;
    if (this.damaged === true && gm.ticks > this.frame_0 + painTicks) {
      this.damaged = false;
    }
  }
};
