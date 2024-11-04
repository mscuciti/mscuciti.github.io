// generates 'objects' and assigns
// them properties and components
let mix = gm.mixins;
gm.obj.chara = gm.newObj(
  {
    qty: 6, // (max expected instances)
    name: "chara",
    sprite: "bFishUp",
    subframe: 0,
    hp: 1,
    attack: 2,
    proto: "wolf",
    mp: 9,
    color: "blue",
    dir: "up",
    ticksPerFrame: 100
  },
  [
    mix.chara,
    mix.check.checkCollision,
    mix.sprite.animate,
    mix.fishTbl,
    mix.moveKey,
    mix.controlKey,
    mix.interactKey,
    mix.timer
  ]
);

gm.obj.potion = gm.newObj(
  {
    qty: 9,
    proto: "dragon",
    name: "enemy",
    sprite: "potion",
    subframe: 0,
    hp: 10,
    damaged: false
  },
  [mix.potion, mix.check.checkHP, mix.potionTbl, mix.move.wrap]
);
