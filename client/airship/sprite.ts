import { KilometresPerHour } from "../utils/speed";

export class Sprite {
  black: HTMLImageElement
  red: HTMLImageElement
  shadow: HTMLImageElement
  constructor ( speed: KilometresPerHour ) {
    this.black = (<HTMLImageElement>document.createElement('IMG'))
    this.red = (<HTMLImageElement>document.createElement('IMG'))
    this.shadow = (<HTMLImageElement>document.createElement('IMG'))
      
    if( speed.value > 250 ) {
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