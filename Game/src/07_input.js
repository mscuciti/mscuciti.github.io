let gm = window.gm;
gm.keyboard = new Array(15).fill(0);
gm.keyPressed = new Array(15).fill(0);
gm.keyReleased = new Array(15).fill(0);

// set up event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(ev) {
  if (gm.keyboard.indexOf(ev.keyCode) === -1) {
    let ct = 0;
    for (let i of gm.keyboard) {
      if (i === 0) {
        gm.keyboard[ct] = ev.keyCode;
        break;
      }
      ct++;
    }
    ct = 0;
    // have to do it like this in
    // case 2 key pressed simultaneously
    // while other keys are also pressed....
    for (let i of gm.keyPressed) {
      if (i === 0) {
        gm.keyPressed[ct] = ev.keyCode;
        //        break;
      }
      ct++;
    }
  }
}

function keyUp(ev) {
  let ct = 0;
  for (let i of gm.keyReleased) {
    if (i === 0) {
      gm.keyReleased[ct] = ev.keyCode;
      //      break;
    }
    ct++;
  }
  var i = gm.keyboard.indexOf(ev.keyCode);
  if (i !== -1) gm.keyboard[i] = 0;
}

// check key is down
gm.key = function (input) {
  const num = gm.keyList(input);
  const chk = gm.keyboard.indexOf(num);
  return chk !== -1;
};

// check key just pressed
gm.key_Pressed = function (input) {
  const num = gm.keyList(input);
  const chk = gm.keyPressed.indexOf(num);
  return chk !== -1;
};

// keylist
gm.keyList = function (search) {
  switch (search) {
    case "backspace":
      return 8;
    case "tab":
      return 9;
    case "enter":
      return 13;
    case "shift":
      return 16;
    case "ctrl":
      return 17;
    case "alt":
      return 18;
    case "pause/break":
      return 19;
    case "caps lock":
      return 20;
    case "escape":
      return 27;
    case "page up":
      return 33;
    case "space":
      return 32;
    case "page down":
      return 34;
    case "end":
      return 35;
    case "home":
      return 36;
    case "left":
      return 37;
    case "up":
      return 38;
    case "right":
      return 39;
    case "down":
      return 40;
    case "print screen":
      return 44;
    case "insert":
      return 45;
    case "delete":
      return 46;
    case "0":
      return 48;
    case "1":
      return 49;
    case "2":
      return 50;
    case "3":
      return 51;
    case "4":
      return 52;
    case "5":
      return 53;
    case "6":
      return 54;
    case "7":
      return 55;
    case "8":
      return 56;
    case "9":
      return 57;
    case "a":
      return 65;
    case "b":
      return 66;
    case "c":
      return 67;
    case "d":
      return 68;
    case "e":
      return 69;
    case "f":
      return 70;
    case "g":
      return 71;
    case "h":
      return 72;
    case "i":
      return 73;
    case "j":
      return 74;
    case "k":
      return 75;
    case "l":
      return 76;
    case "m":
      return 77;
    case "n":
      return 78;
    case "o":
      return 79;
    case "p":
      return 80;
    case "q":
      return 81;
    case "r":
      return 82;
    case "s":
      return 83;
    case "t":
      return 84;
    case "u":
      return 85;
    case "v":
      return 86;
    case "w":
      return 87;
    case "x":
      return 88;
    case "y":
      return 89;
    case "z":
      return 90;
    case "left window key":
      return 91;
    case "right window key":
      return 92;
    case "select key":
      return 93;
    case "numpad 0":
      return 96;
    case "numpad 1":
      return 97;
    case "numpad 2":
      return 98;
    case "numpad 3":
      return 99;
    case "numpad 4":
      return 100;
    case "numpad 5":
      return 101;
    case "numpad 6":
      return 102;
    case "numpad 7":
      return 103;
    case "numpad 8":
      return 104;
    case "numpad 9":
      return 105;
    case "multiply":
      return 106;
    case "add":
      return 107;
    case "subtract":
      return 109;
    case "decimal point":
      return 110;
    case "divide":
      return 111;
    case "f1":
      return 112;
    case "f2":
      return 113;
    case "f3":
      return 114;
    case "f4":
      return 115;
    case "f5":
      return 116;
    case "f6":
      return 117;
    case "f7":
      return 118;
    case "f8":
      return 119;
    case "f9":
      return 120;
    case "f10":
      return 121;
    case "f11":
      return 122;
    case "f12":
      return 123;
    case "num lock":
      return 144;
    case "scroll lock":
      return 145;
    case "My Computer (multimedia keyboard)":
      return 182;
    case "My Calculator (multimedia keyboard)":
      return 183;
    case "semi-colon":
      return 186;
    case "equal sign":
      return 187;
    case "comma":
      return 188;
    case "dash":
      return 189;
    case "period":
      return 190;
    case "forward slash":
      return 191;
    case "open bracket":
      return 219;
    case "back slash":
      return 220;
    case "close braket":
      return 221;
    case "single quote":
      return 222;
    default:
      return 999999; // not found
  }
};
