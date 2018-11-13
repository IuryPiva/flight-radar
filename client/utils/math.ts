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
    return `${Number(this.value.toFixed(1))}˚`
  }

  isClockWise() {
    return this.value > 180 && this.value < 360
  }

  isCounterClockWise() {
    return this.value > 0 && this.value <= 180
  }
  
  isStraight() {
    return this.value == 0 || this.value > 359.9 || this.value < 0.1
  }

  opposite(): Degrees {
    return new Degrees(Math.abs(this.value - 360))
  }
}

export class Radians {
  private _Radians: Radians
  value: number
  
  constructor (value: number) {
    this.value = value
  }

  toDegrees() {
    return new Degrees(this.inDegrees())
  }

  inDegrees() {
    return this.value * 180 / Math.PI
  }
}
/**
 * 
 * @param value 
 * @param test
 * @param margin per cent number eg: for 1% the input should be 1/100
 */
export function equalsWithErrorMargin(value: number, test: number, margin: number) {
  return value >= test - (test * margin) && value <= test + (test * margin)
}
