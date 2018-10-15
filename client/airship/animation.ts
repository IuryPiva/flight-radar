import { Airship } from "./airship";
import { Grid } from "../radar/grid";
import { Airships } from "./airships";

export function bounceOnBorders(airships: Airships, grid: Grid) {
  airships.getAll().forEach((airship: Airship) => {
    if (airship.position.x + airship.width.inScale(grid.cell.width) / 2 > grid.limit.right) {
      airship.direction.set(Math.random() * (270 - 90 + 1) + 90)
    }
    else if (airship.position.x - airship.width.inScale(grid.cell.width) < grid.limit.left) {
      airship.direction.set(((Math.random() * (270 - 90 + 1) + 90) + 180) % 360)
    }
    else if (airship.position.y - airship.height.inScale(grid.cell.height) / 2 < grid.limit.bottom) {
      airship.direction.set(Math.random() * 180)
    }
    else if (airship.position.y + airship.height.inScale(grid.cell.height) / 2 > grid.limit.top) {
      airship.direction.set(Math.random() * (360 - 180 + 1) + 180)
    }
  })
}
