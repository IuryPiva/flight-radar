export const PlayerControl = {
  rightPressed: false,
  leftPressed: false,
  downPressed: false,
  upPressed: false,
}

export class Play {
  constructor() {
    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);
  }

  keyDownHandler(e: KeyboardEvent) {
    if([39,37,38,40].includes(e.keyCode)) e.preventDefault()
    if(e.keyCode == 39) {
      PlayerControl.rightPressed = true;
    }
    else if(e.keyCode == 37) {
      PlayerControl.leftPressed = true;
    }
    else if(e.keyCode == 38) {
      PlayerControl.upPressed = true;
    }
    else if(e.keyCode == 40) {
      PlayerControl.downPressed = true;
    }
  }

  keyUpHandler(e: KeyboardEvent) {
    if([39,37,38,40].includes(e.keyCode)) e.preventDefault()
    if(e.keyCode == 39) {
      PlayerControl.rightPressed = false;
    }
    else if(e.keyCode == 37) {
      PlayerControl.leftPressed = false;
    }
    if(e.keyCode == 38) {
      PlayerControl.upPressed = false;
    }
    else if(e.keyCode == 40) {
      PlayerControl.downPressed = false;
    }
  }
}