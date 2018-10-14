import { Pixel, PixelCoordinate } from "../canvas";

interface GridCell {
  width: Pixel
  height: Pixel
}

interface GridLimit {
  top: number
  right: number
  bottom: number
  left: number
}

export class Grid {
  cell: GridCell
  center: PixelCoordinate
  limit: GridLimit

  constructor (canvas: HTMLCanvasElement, cellsPerAxis: number) {
    this.cell = {
      width: new Pixel(canvas.width / cellsPerAxis),
      height: new Pixel(canvas.height / cellsPerAxis)
    }
    this.center = new PixelCoordinate(new Pixel(canvas.width / 2), new Pixel(canvas.height / 2))

    this.limit = {
      top: cellsPerAxis / 2,
      right: cellsPerAxis / 2,
      bottom: cellsPerAxis / 2 * (-1),
      left: cellsPerAxis / 2 * (-1),
    }
  }
}
