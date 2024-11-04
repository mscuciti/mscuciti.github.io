// global namespace isn't working with CodeSandbox.

const vport = gm.vport.dom;
//const level = gm.level.dom;
//const tiles = gm.tiles.dom;
//const background = gm.background.dom;
gm.ticks = 0;
animate();

// ensure that we have requestAnimationFrame
// this is Paul Irish's compatibility shim
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (function () {
    return (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback, element) {
        window.setTimeout(callback, 1000 / gm.fps);
      }
    );
  })();
}

function animate() {
  gm.ticks++;
  if (gm.ticks > 2) gm.fnc.loop();
  draw();
  // if (gm.ticks < 5)
  requestAnimationFrame(animate);
}

function createTiles() {
  let i = 0;
  for (let sheet in gm.sheetData.tileData)
    for (let tile in gm.sheetData.tileData[sheet]) {
      const array = gm.sheetData.tileData[sheet][tile];
      if (Array.isArray(array))
        for (let j in array) {
          fnc.tileInst(
            sheet + "_" + i,
            array[j][1],
            array[j][2],
            array[j][0],
            sheet
          );
          i++;
        }
    }
}

createTiles();

function draw() {
  //    loops thru the list of active object instances,
  //    checks if the assigned sprite exists,
  //    if it does not, create it.
  //    if it does, move it, and angle it.
  //    finally, remove any sprites not assigned to an
  //    instance.
  let sprites = vport.getElementsByClassName("sprite");
  let sprList = [];
  var flag = 0;
  // sprites
  for (let obj in gm.ins) {
    for (let ins in gm.ins[obj]) {
      var inst = gm.ins[obj][ins];
      if (inst.active === 1) {
        flag = 0;
        for (let l = 0; l < sprites.length; l++) {
          // for each sprite
          let sprite = sprites[l].id;
          if (sprite === ins) {
            const instanceSprite = gm.ins[obj][ins].sprite;
            // console.log(instanceSprite);
            const spriteSheet = fnc.searchForSpriteSheet(
              instanceSprite,
              gm.sheetData.spriteData
            );
            // if matching sprite found
            sprList.push(ins); // add to list
            sprites[l].style.xx = inst.x; // move the sprite X
            sprites[l].style.yy = inst.y; // move the sprite Y
            sprites[l].style.angle = inst.a; // rotate the sprite
            //console.log(inst.sprite);
            sprites[l].style.sprite = inst.sprite;
            fnc.repo(sprites[l]); // move the sprite
            fnc.chFrame(
              sprites[l], // change the frame
              fnc.parseFrame(inst.sprite, inst.subframe),
              spriteSheet
            ); // & subframe
            flag = 1;
          }
        }
        if (flag === 0) {
          // no sprite found
          let spr = fnc.sprInst(ins, inst.x, inst.y); // create sprite
          sprList.push(ins); // add to list
          if (inst.sprite === undefined) {
            // no sprite defined
            console.log(inst.name + " has no sprite assigned to it!");
            spr.style.width = 0;
            spr.style.height = 0;
          }
          draw();
        }
      }
    }
  }
  flag = 0;
  for (let i = 0; i < sprites.length; i++)
    for (let obj in gm.ins)
      for (let ins in gm.ins[obj]) {
        var inst = gm.ins[obj][ins];
        if (inst.active === 0 && sprites[i].id === ins) flag = sprites[i];
      }
  if (flag !== 0) {
    console.log("sprite unassigned! Removing..." + flag.id);
    fnc.destroySpr(flag);
  }
  // tiles
  //for (let l = 0; l < tiles.length; l++) fnc.repo(tiles[l]);
  tiles.style.left = Math.round(-gm.offX / 2) + "px";
  tiles.style.top = Math.round(-gm.offY / 2) + "px";
  background.style.backgroundPosition =
    Math.round(-gm.offX) + "px " + Math.round(-gm.offY) + "px";
}
