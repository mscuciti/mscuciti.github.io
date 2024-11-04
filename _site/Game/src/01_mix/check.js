gm.mixins.check = {
  checkCollision: function (r) {
    let objList = [];
    for (let obj in gm.ins) {
      for (let ins in gm.ins[obj]) {
        const other = gm.ins[obj][ins];
        const dist = Math.sqrt(
          Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2)
        );
        if (dist < r && other.id !== this.id && other.active !== 0) {
          objList.push(other.id);
        }
      }
    }
    return objList;
  },
  checkCollision2: function() {
    // TODO
    // quadtree, AABB, etc.
    // get this and other (s) boundary polygons
    // check stuff...
  },
  checkHP: function () {
    if (this.hp <= 0) gm.ins.rm(this.id);
  }
};
