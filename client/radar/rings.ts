import { Grid } from "./grid";
import { PixelCoordinate } from "../canvas";

export class Rings {
  amount: number
  diameter: number
  radius: number
  center: PixelCoordinate
  lineWidth = 1

  constructor (grid: Grid, amount: number) {
    this.amount = amount
    this.diameter = grid.cell.width.value * this.amount * 2
    this.radius = this.diameter / 2
    this.center = grid.center
  }
}
