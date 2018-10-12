import { Pixel, PixelCoordinate } from "../canvas";

export class Grid {
  cell: {
    width: Pixel,
    height: Pixel,
  }
  center: PixelCoordinate
  limit: {
    top: number,
    right: number,
    down: number,
    left: number
  }

  constructor (canvas: HTMLCanvasElement, cellsPerAxis: number) {
    this.cell.width = new Pixel(canvas.width / cellsPerAxis)
    this.cell.height = new Pixel(canvas.height / cellsPerAxis)
    
    this.center = new PixelCoordinate(new Pixel(canvas.width / 2), new Pixel(canvas.height / 2))

    this.limit.top = cellsPerAxis / 2
    this.limit.right = cellsPerAxis / 2
    this.limit.down = cellsPerAxis / 2 * (-1)
    this.limit.left = cellsPerAxis / 2 * (-1)
  }
}
