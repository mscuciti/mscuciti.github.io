// Set Up Global Variables (Game-State)
window.gm = {};
let gm = window.gm;
//gm.level = document.getElementById("level");
gm.offX = 50;
gm.offY = 0;
//gm.background = document.getElementById("background");
gm.stats = document.getElementById("stats");
gm.mixins = {};
gm.background = {
  dom: document.getElementById("background"),
  w: document.getElementById("background").clientWidth,
  h: document.getElementById("background").clientHeight
};
gm.vport = {
  dom: document.getElementById("viewport"),
  w: document.getElementById("viewport").clientWidth,
  h: document.getElementById("viewport").clientHeight
};
gm.level = {
  dom: document.getElementById("level"),
  w: document.getElementById("level").clientWidth,
  h: document.getElementById("level").clientHeight,
  spd: -1,
  x: 0
};
gm.tiles = {
  dom: document.getElementById("tiles"),
  w: document.getElementById("tiles").clientWidth,
  h: document.getElementById("tiles").clientHeight
};
gm.fps = 30;
gm.obj = {};
gm.ins = {};
gm.sheetData = {};
gm.fnc = {};

/*


// replace the below with a recursive search so that you don't need

let mix = [
  // include mixins...
  "distTo.js",
  "moveXY.js"
];
for (let i = 0; i < mix.length; i++) {
  let script = document.createElement("script");
  script.src = "src/mix/" + mix[i];
  document.getElementById("ini").appendChild(script);
}

*/
