import { KilometresPerHour } from "../utils/speed";

export class Sprite {
  black: HTMLImageElement
  red: HTMLImageElement
  shadow: HTMLImageElement
  constructor ( speed: KilometresPerHour ) {
    this.black = (<HTMLImageElement>document.createElement('IMG'))
    this.red = (<HTMLImageElement> document.createElement('IMG'))
    this.shadow = (<HTMLImageElement> document.createElement('IMG'))
      
    if( speed.value > 250 ) {
      this.black.src = 'airplane.png'
      this.red.src = 'airplane-red.png'
      this.shadow.src = 'airplane-shadow.png'
    } else {
      this.black.src = 'helicopter.png'
      this.red.src = 'helicopter-red.png'
      this.shadow.src = 'helicopter-shadow.png'
    }
  }
}