// global game loop
// call every frame

const gm = window.gm;
const mix = gm.mixins;

gm.fnc.loop = function () {
  // keep js from freaking out..
  function tri(f, i, a0, a1, a2) {
    if (f in i) return i[f](a0, a1, a2);
    for (let g in mix[f])
      if (g in i) return i[g](a0, a1, a2);
      else for (let h in g) if (h in i) return i[h](a0, a1, a2);
  }

  // read inputs + do keyboard arrays
  for (let i in gm.ins) {
    for (let j in gm.ins[i]) {
      let inst = gm.ins[i][j];
      if (inst.active === 1) {
        tri("key", inst);
        for (let n = 0; n < 10; n++) tri("key_" + n, inst);
        //        tri("control", inst);
        //        tri("interact", inst);
      }
    }
  }

  for (let i = 0; i < gm.keyPressed.length; i++) {
    gm.keyPressed[i] = 0;
    gm.keyReleased[i] = 0;
  }

  // run step code
  for (let i in gm.ins) {
    for (let j in gm.ins[i]) {
      let inst = gm.ins[i][j];
      if (inst.active === 1) {
        tri("checkTimer", inst);
        tri("step", inst);
        // reset animation frame on sprite change
        inst.lastSprite = inst.sprite;
        inst.sprite = tri("spriteTable", inst);
        if (inst.sprite !== inst.lastSprite) inst.tick = 0;
        tri("animate", inst, inst.tick, inst.ticksPerFrame);
        tri("move", inst);
        // tri("gravity", inst);
        tri("checkHP", inst);
        // tri("wrap", inst);
      }
    }
  }

  // movement
  for (let i in gm.ins) {
    for (let j in gm.ins[i]) {
      let inst = gm.ins[i][j];
      if (inst.active === 1) {
        inst.x += inst.xSpeed;
        inst.y += inst.ySpeed;
      }
    }
  }
};
