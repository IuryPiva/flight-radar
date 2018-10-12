import { Grid } from "./grid";

export class Rings {
  amount: number
  diameter: number
  radius: number
  lineWidth = 1

  constructor (amount: number, grid: Grid) {
    this.amount = amount
    this.diameter = grid.cell.width * this.amount * 2
    this.radius = this.diameter / 2
  }
}
