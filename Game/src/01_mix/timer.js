var gm = window.gm;
gm.mixins.timer = {
  setTimer: function (ticks) {
    this.frame_0 = gm.ticks;
    this.frame_1 = gm.ticks + ticks;
  },
  checkTimer: function () {
    if (gm.ticks > this.frame_1) {
      this.frame_0 = -1;
      this.frame_1 = -1;
      return true;
    }
  }
};
