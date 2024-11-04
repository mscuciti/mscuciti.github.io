let gm = window.gm;
// inherited via "proto"
// additional properties
// are defined in obj.js
gm.data = {
  enemy: {
    bat: {
      hp: 10,
      attack: 1
    },
    wolf: {
      sprite: "flight",
      hp: 50,
      attack: 4,
      type: "water"
    },
    dragon: {
      hp: 1000,
      attack: 90,
      dmg: function (other, amount) {
        switch (other.type) {
          case "flame":
            return amount / 2;
          case "water":
          case "ice":
            return amount * 2;
          default:
            return amount;
        }
      }
    }
  }
};
