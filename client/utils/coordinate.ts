import { Pixel } from "../canvas";

export class Cartesian {
  private _Cartesian: Cartesian
  x: number
  y: number
  
  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }

  toPixel() {
    return new Pixel(
      grid.center.x + (this.x * grid.cell.width),
      grid.center.y + (this.y * grid.cell.height) * (-1)
    )
  }
}
