export class Pixel {
  private _Pixel: Pixel
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export class FlightRadarCanvas {
  canvas: HTMLCanvasElement = (<HTMLCanvasElement> document.getElementById("myCanvas"))
  ctx: CanvasRenderingContext2D
  FPS = 60

  constructor () {
    this.ctx = this.canvas.getContext('2d')
  }
}
