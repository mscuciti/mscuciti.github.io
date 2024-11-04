gm.mixins.sprite = {
  animate: function (tick, ticksPerFrame) {
    // default timing is global
    if (tick === undefined) tick = gm.ticks;
    // default speed is 100
    if (ticksPerFrame === undefined) ticksPerFrame = 100;
    let number_of_frames;
    const spriteSearch = this.sprite;
    for (const sheet in gm.sheetData.spriteData)
      for (const spriteFound in gm.sheetData.spriteData[sheet].sprites)
        if (spriteFound === spriteSearch)
          number_of_frames =
            gm.sheetData.spriteData[sheet].sprites[spriteFound].length;
    this.subframe = Math.round(
      (number_of_frames * (tick % ticksPerFrame)) / ticksPerFrame
    );
  }
};
gm.mixins.fishTbl = {
  spriteTable: function () {
    switch (this.color) {
      case "red":
        switch (this.dir) {
          case "left":
            return "rFishLeft";
          case "right":
            return "rFishRight";
          case "up":
            return "rFishUp";
          case "down":
            return "rFishDown";
          default:
            break;
        }
        break;
      case "blue":
        switch (this.dir) {
          case "left":
            return "potion";
          case "right":
            return "bFishRight";
          case "up":
            return "mario";
          case "down":
            return "bFishDown";
          default:
            break;
        }
        break;
      default:
        break;
    }
  }
};
gm.mixins.potionTbl = {
  spriteTable: function () {
    switch (this.damaged) {
      case true:
        return "damaged";
      case false:
        return "potion";
      default:
        break;
    }
  }
};
gm.mixins.marioTbl = {
  spriteTable: function () {
    return "mario";
  }
};
