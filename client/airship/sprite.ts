import { randomByChance } from "../random";

export class Sprite {
  black: HTMLImageElement
  red: HTMLImageElement
  shadow: HTMLImageElement
  constructor ( type: string ) {
    this.black = (<HTMLImageElement>document.createElement('IMG'))
    this.red = (<HTMLImageElement>document.createElement('IMG'))
    this.shadow = (<HTMLImageElement>document.createElement('IMG'))

    if(randomByChance(20)) {
      this.black.src = 'client/assets/kinho.png'
      this.red.src = 'client/assets/kinho-red.png'
      this.shadow.src = 'client/assets/kinho-shadow.png'
    } else if (type == 'avião') {
      this.black.src = 'client/assets/airplane.png'
      this.red.src = 'client/assets/airplane-red.png'
      this.shadow.src = 'client/assets/airplane-shadow.png'
    } else {
      this.black.src = 'client/assets/helicopter.png'
      this.red.src = 'client/assets/helicopter-red.png'
      this.shadow.src = 'client/assets/helicopter-shadow.png'
    }
  }
}