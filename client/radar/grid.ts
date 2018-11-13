import { Pixel, PixelCoordinate } from "../canvas";
import { Config } from "../config";

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

  constructor (canvas: HTMLCanvasElement) {
    this.cell = {
      width: new Pixel(canvas.width / Config.cellsPerAxis),
      height: new Pixel(canvas.height / Config.cellsPerAxis)
    }
    this.center = new PixelCoordinate(new Pixel(canvas.width / 2), new Pixel(canvas.height / 2))

    this.limit = {
      top: Config.cellsPerAxis / 2,
      right: Config.cellsPerAxis / 2,
      bottom: Config.cellsPerAxis / 2 * (-1),
      left: Config.cellsPerAxis / 2 * (-1),
    }
  }
}
