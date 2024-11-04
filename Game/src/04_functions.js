let gm = window.gm;
let viewport = gm.vport.dom;
let level = gm.level.dom;
let tiles = gm.tiles.dom;
// let background = gm.background.dom;
let fnc = gm.fnc;

// global functions

gm.ins.pool = function (obj, n) {
  // create pool of instances
  let ct = 0;
  let nm = "";
  if (this[obj.name] === undefined)
    // uses 'name' prop
    this[obj.name] = {};
  for (var j in this[obj.name]) ct++; // count num of inst's
  let tot = ct + n;
  while (ct < tot) {
    nm = obj.name + "_" + ct; // append number
    this[obj.name][nm] = new gm.ins.New(obj); // add to pool
    this[obj.name][nm].active = 0; // set active
    ct++;
  }
};

gm.ins.New = function (obj) {
  for (var prop in obj) {
    this[prop] = obj[prop];
  }
};

for (var obj in gm.obj) // make pools
  gm.ins.pool(gm.obj[obj], gm.obj[obj].qty);

gm.ins.create = function (obj, x, y) {
  // create instance
  let o = this[obj.name];
  if (o === undefined)
    // check pool exists
    this.pool(obj, 5); // if not, make the pool
  let flag = 0;
  for (var ins in o) {
    // for each inst in pool
    if (
      flag === 0 && // first
      o[ins].active === 0
    ) {
      // unactivated found
      o[ins] = new gm.ins.New(obj);
      o[ins].id = ins;
      flag = 1;
      o[ins].active = 1; // activate
      o[ins].x = x;
      o[ins].y = y;
      o[ins].a = 0;
      o[ins].xSpeed = 0;
      o[ins].ySpeed = 0;
      return o[ins];
    }
  } // exit
  if (flag === 0) {
    // if never found an unactivated
    this.pool(obj, 1); // expand pool
    return this.create(obj, x, y);
  }
};

gm.ins.get = function (id) {
  for (let obj in gm.ins) {
    for (let ins in gm.ins[obj]) {
      const inst = gm.ins[obj][ins];
      if (inst.id === id) return inst;
    }
  }
};

gm.ins.rm = function (id) {
  for (let obj in gm.ins) {
    for (let ins in gm.ins[obj]) {
      const inst = gm.ins[obj][ins];
      if (inst.id === id) {
        inst.active = 0;
        return inst;
      }
    }
  }
};

gm.newObj = function (props, mixins) {
  // prop used for props and mixins
  let prop;
  let obj = {};
  for (prop in props) {
    if (obj.hasOwnProperty(prop))
      console.log("Object property conflict! " + prop);
    obj[prop] = props[prop];
  }
  let n = 0;
  mixins.forEach((mix) => {
    if (typeof mix === "function") obj[mix.name] = mix;
    for (prop in mix) {
      if (obj.hasOwnProperty(prop)) {
        console.log("Object property conflict! " + prop);
        obj[prop + "_" + n] = mix[prop];
        //        console.log(obj);
        n++;
      } else if (mix[prop]) obj[prop] = mix[prop];
    }
  });
  return obj;
};

fnc.repo = function (e) {
  // modify style of an element
  let offX = gm.offX;
  let offY = gm.offY;
  if (e.parentElement === tiles) {
    offX *= 0.5;
    offY *= 0.5;
  }
  e.style.left = e.style.xx - offX + "px";
  e.style.top = e.style.yy - offY + "px";
  e.style.transform = "rotate(" + e.style.a + "deg)";
};

// lookup sprite + subframe
fnc.parseFrame = function (spr, sub) {
  for (let shtRef in gm.sheetData.spriteData)
    for (let sprRef in gm.sheetData.spriteData[shtRef].sprites) {
      if (spr === sprRef)
        return gm.sheetData.spriteData[shtRef].sprites[sprRef][sub];
    }
};

// changes the frame of a sprite / tile
// by shifting the background image location
fnc.chFrame = function (element, num, sheet) {
  if (!element) return;
  if (!sheet) {
    const url = element.style
      .getPropertyValue("background-image")
      .replace(/url\((['"])?(.*?)\1\)/gi, "$2");
    // if no sheet, find the first one
    const sheetData = gm.sheetData;
    for (let i in sheetData)
      for (let j in sheetData[i])
        if (sheetData[i][j].img === url) {
          sheet = sheetData[i][j];
          break;
        }
  }
  fnc.divAddSheetData(element, sheet);
  element.style.backgroundPosition =
    // xpos
    -1 * (((num % sheet.numX) + sheet.offX) * sheet.gridX) +
    "px " +
    // ypos
    -1 * (Math.floor(num / sheet.numX + sheet.offY) * sheet.gridY) +
    "px ";
  //const replace = sheet.source + '.png';
  //element.style.backgroundImage = replace;
  //console.log('url ' + url);
  //console.log('DOM ' + element.style.getPropertyValue("background-image"));
  //console.log('str ' + replace);
};

// removes a sprite from a container DOM element
fnc.destroySpr = function (e) {
  if (!e) return;
  e.parentElement.removeChild(e);
};

fnc.searchForSpriteSheet = function (search, spriteData) {
  for (const spriteSheet in spriteData)
    for (const spriteFound in spriteData[spriteSheet].sprites)
      if (search === spriteFound) return spriteData[spriteSheet];
};

fnc.searchForTileSheet = function (search, tileData) {
  for (const tileSheet in tileData) if (search === tileSheet) return tileSheet;
};

fnc.searchObject = function (search, instanceData) {
  for (const object in instanceData)
    for (const instance in instanceData[object])
      if (search === instance) return instanceData[object][instance];
};

fnc.divInst = function (id, x, y, parent) {
  this.parent = parent ? parent : viewport;
  this.element = document.createElement("div");
  this.element.id = id;
  this.style = this.element.style;
  this.style.xx = x;
  this.style.yy = y;
};

fnc.divAddSheetData = function (element, sheet) {
  let url;
  url = window
    .getComputedStyle(document.getElementById(sheet.source))
    .getPropertyValue("background-image");
  element.style.width = sheet.gridX + "px";
  element.style.height = sheet.gridY + "px";
  element.style.backgroundImage = url;
  return element;
};

fnc.sprInst = function (id, x, y) {
  let sprInst = new fnc.divInst(id, x, y);
  sprInst.element.className = "sprite";
  const foundObject = fnc.searchObject(id, gm.ins);
  const sprite = foundObject.sprite;
  const spriteSheet = fnc.searchForSpriteSheet(sprite, gm.sheetData.spriteData);
  sprInst = fnc.divAddSheetData(sprInst, spriteSheet);
  sprInst.style.a = 0;
  sprInst.style.frame = 0; // default
  fnc.repo(sprInst.element);
  //fnc.chFrame(sprInst, sprInst.style.frame,spriteSheet);
  sprInst.parent.appendChild(sprInst.element);
  return sprInst;
};

fnc.tileInst = function (id, x, y, index, sheet) {
  let tileInst = new fnc.divInst(id, x, y, tiles);
  tileInst.element.className = "tile";
  tileInst = fnc.divAddSheetData(tileInst, gm.sheetData.tileData[sheet]);
  fnc.repo(tileInst.element);
  fnc.chFrame(tileInst, index);
  tileInst.parent.appendChild(tileInst.element);
};
