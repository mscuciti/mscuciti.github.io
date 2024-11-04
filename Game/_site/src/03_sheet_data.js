// 'source' is CSS class name.
// NOTES...

/* 
origin and boundary coordinates are 
relative to upper-left corner of
sprite subframe. "bound" array is...
object[
  frame1polygon[V1[x,y],V2[x,y],...],
  frame2polygon[],...]
--OR--
objectPolygon[V1[x,y],V2[],...]
--OR--
object[
    frame1boundBox[x1,y1,x2,y2],
    frame2boundBox[],...]
--OR-- 
objectBoundBox[x1,y1,x2,y2]
*/


gm.sheetData = {
  spriteData: {
    // ___A MARIO CLONE__

    sheet_A: {
      source: "smw_mario_sheet",
      gridX: 40,
      gridY: 40,
      sprites: {
        mario: [1, 2, 3]
      }
    }, // */

    // ___SHRIMP TO THE PAST__
    sheet_0: {
      source: "spriteSheet_1",
      gridX: 32,
      gridY: 32,
      sprites: {
        flight: [46, 47],
        potion: [0],
        paint: [5],
        damaged: [32] // [32]
      },
      origin: {
        flight: [5, 5],
        potion: [2, 6],
        paint: [1, 1],
        damage: [1, 1]
      }
    },
    sheet_1: {
      source: "spriteSheet_2",
      gridX: 32,
      gridY: 32,
      numX: 3,
      sprites: {
        bFishDown: [0, 1, 2, 1],
        bFishLeft: [3, 4, 5, 4],
        bFishRight: [6, 7, 8, 7],
        bFishUp: [9, 10, 11, 10]
      }
    },
    sheet_2: {
      source: "spriteSheet_2",
      gridX: 32,
      gridY: 32,
      offX: 3,
      offY: 4,
      numX: 3,
      sprites: {
        rFishDown: [0, 1, 2, 1],
        rFishLeft: [3, 4, 5, 4],
        rFishRight: [6, 7, 8, 7],
        rFishUp: [9, 10, 11, 10]
      }
    } // */
  },
  tileData: {
    terrain: {
      source: "tileSheet",
      gridX: 40,
      gridY: 40,
      offX: 0,
      offY: 0,
      tile:
        // [ tile # , x , y ]
        [
          [22, 0, 50],
          [22, 100, 100],
          [22, 50, 100],
          [22, 100, 300]
        ]
    }
  }
};

function addSheetData(sheetData) {
  for (const sheet in sheetData) {
    const sheetObject = sheetData[sheet];
    addImageData(sheetObject);
    sheetCalculateNumbers(sheetObject);
  }
}

function addImageData(s) {
  const imgSrc = window
    .getComputedStyle(document.getElementById(s.source))
    .getPropertyValue("background-image")
    .replace(/url\((['"])?(.*?)\1\)/gi, "$2");
  const img = new Image();
  img.src = imgSrc;
  s.img = img.src;
  s.w = img.width;
  s.h = img.height;
}

function sheetCalculateNumbers(s) {
  // if not specified, fill to the right...
  if (!s.offX) s.offX = 0;
  if (!s.offY) s.offY = 0;
  if (!s.numX) s.numX = Math.floor(s.w / s.gridX - s.offX);
  if (!s.numY) s.numY = Math.floor(s.h / s.gridY - s.offY);
  if (!s.num) s.num = s.numX * s.numY;
}

addSheetData(gm.sheetData.spriteData);
addSheetData(gm.sheetData.tileData);
