import { PixelCoordinate, Pixel } from "../canvas";
import { Grid } from "../radar/grid";

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

  display() {
    return `(${this.x.toFixed(1)},${this.y.toFixed(1)})`
  }
}
