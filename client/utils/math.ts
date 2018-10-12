/**
 * @description Goes from 0 to 360.
 *  If the input is -1 it will save as 359,
 *  if it is 361 it will save as 1
 */
export class Degrees {
  private _Degrees: Degrees
  value: number
  
  constructor (value: number) {
    this.set(value)
  }

  set(value: number) {
    this.value = value >= 0 ? (value % 360) : (360 + (value % 360))
  }

  toRadians() {
    return new Radians(this.value * Math.PI / 180)
  }

  display() {
    return `${this.value}˚`
  }

  isClockWise() {
    return this.value > 180 && this.value < 360
  }

  isCounterClockWise() {
    return this.value > 0 && this.value <= 180
  }
  
  isStraight() {
    return this.value == 0 || this.value > 359 || this.value < 1
  }
}

export class Radians {
  private _Radians: Radians
  value: number
  
  constructor (value: number) {
    this.value = value
  }

  toDegrees() {
    return new Degrees(this.value * 180 / Math.PI)
  }
}
