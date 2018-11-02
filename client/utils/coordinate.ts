import { PixelCoordinate, Pixel } from "../canvas";
import { Grid } from "../radar/grid";
import { Degrees, Radians } from "./math";
import { copyInstance } from "./clone";

export class Cartesian {
  private _Cartesian: Cartesian
  x: number
  y: number
  
  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }

  toPixelCoordinate(grid: Grid) {
    return new PixelCoordinate(
      new Pixel(grid.center.x.value + (this.x * grid.cell.width.value)),
      new Pixel(grid.center.y.value + (this.y * grid.cell.height.value) * (-1))
    )
  }
  
  isFirstQuadrant() {
    return this.x > 0 && this.y > 0
  }
  
  isSecondQuadrant() {
    return this.x < 0 && this.y > 0
  }

  isThirdQuadrant() {
    return this.x < 0 && this.y < 0
  }

  isFourthQuadrant() {
    return this.x > 0 && this.y > 0
  }

  toPolar(): Polar {
    let angle = new Degrees(0)
    if(this.x == 0) {
      if(this.y > 0) {
        angle.value = 90
      } else if (this.y < 0) {
        angle.value = 270
      }
    } else {
      angle = new Radians(Math.atan2(this.y, this.x)).toDegrees()
      if (this.isSecondQuadrant() || this.isThirdQuadrant()) angle.value += 180
      if (this.isFourthQuadrant()) angle.value += 360
    }
    const radius = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    return new Polar(radius, angle)
  }

  display() {
    return `(${Number(this.x.toFixed(1))},${Number(this.y.toFixed(1))})`
  }
  
  reduce(point: Cartesian) {
    this.x -= point.x
    this.y -= point.y
  }

  translate(point: Cartesian) {
    this.x += point.x
    this.y += point.y
  }
  
  scale(point: Cartesian) {
    this.x *= point.x
    this.y *= point.y
  }

  rotate(angle: Degrees) {
    const original = copyInstance(this)
    this.x = this.x * Math.cos(angle.toRadians().value) - (this.y * Math.sin(angle.toRadians().value))
    this.y = original.x * Math.sin(angle.toRadians().value) + (this.y * Math.cos(angle.toRadians().value))
  }

  distance(point: Cartesian) {
    return Math.sqrt(Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2))
  }

  pointInDirection(distance, direction: Degrees) {
    return new Cartesian(
      this.x + distance * Math.cos(direction.toRadians().value),
      this.y + distance * Math.sin(direction.toRadians().value)
    )
  }
}

export class Polar {
  private _Polar: Polar
  radius: number
  angle: Degrees
  
  constructor (radius: number, angle: Degrees) {
    this.radius = radius
    this.angle = angle
  }

  toCartesian(): Cartesian {
    const rad = this.angle.toRadians().value
    return new Cartesian(
      this.radius * Math.sin(rad),
      this.radius * Math.cos(rad)
    )
  }

  display() {
    return `(${this.radius.toFixed(1)},${this.angle.display()})`
  }
}
