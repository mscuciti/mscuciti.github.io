let gm = window.gm;
// put stuff here that defines the current room

// define level platforms.
gm.platforms = {
  // [x1,y1,x2,y2]
  0: [0, 100, 100, 100],
  1: [150, 100, 200, 150],
  2: [250, 150, 300, 150]
};

// initialize objects and place them in room
gm.ins.create(gm.obj.chara, 0, 350);
gm.ins.create(gm.obj.potion, 200, 200);
