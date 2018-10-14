import { PixelCoordinate, Pixel } from "../canvas";
import { Grid } from "../radar/grid";
import { Degrees, Radians } from "./math";

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
  
  toPolar(): Polar {
    return new Polar(
      Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)),
      new Radians(Math.atan2(this.y, this.x)).toDegrees()
    )
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
    const original = Object.assign({}, this)
    this.x = this.x * Math.cos(angle.toRadians().value) - (this.y * Math.sin(angle.toRadians().value))
    this.y = original.x * Math.sin(angle.toRadians().value) + (this.y * Math.cos(angle.toRadians().value))
  }

  distance(point: Cartesian) {
    return Math.sqrt(Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2))
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
    return `(${this.radius.toFixed(1)},${this.angle.display})`
  }
}
