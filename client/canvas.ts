export class Pixel {
  private _Pixel: Pixel
  value: number

  constructor(value: number) {
    this.value = value
  }
}

const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")
const FPS = 60

module.exports = {
  canvas, ctx, FPS
}
