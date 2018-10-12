import { Pixel } from "../canvas";

export class Grid {
  cell: {
    width: number,
    height: number,
  }
  center: Pixel
  limit: {
    top: number,
    right: number,
    down: number,
    left: number
  }

  constructor (canvas: HTMLCanvasElement, cellsPerAxis: number) {
    this.cell.width = canvas.width / cellsPerAxis
    this.cell.height = canvas.height / cellsPerAxis
    
    this.center = new Pixel(canvas.width / 2, canvas.height / 2)

    this.limit.top = cellsPerAxis / 2
    this.limit.right = cellsPerAxis / 2
    this.limit.down = cellsPerAxis / 2 * (-1)
    this.limit.left = cellsPerAxis / 2 * (-1)
  }
}

function drawScaleMark() {
  const { coordinatesToPx } = require('../utils')
  ctx.beginPath()
  ctx.setLineDash([3, 9]);
  ctx.fillStyle = 'rgba(255,0,0,0.7)';

  let markerPositions = coordinatesToPx(4, -4.5)
  ctx.moveTo(markerPositions.x, markerPositions.y)
  ctx.lineTo(markerPositions.x + grid.cell.width, markerPositions.y)
  ctx.fillText('1 km', markerPositions.x + (3.5 * grid.cell.width / 10), markerPositions.y + (2 * grid.cell.height / 10))

  markerPositions = coordinatesToPx(3.5, -4)
  ctx.moveTo(markerPositions.x, markerPositions.y)
  ctx.lineTo(markerPositions.x, markerPositions.y + grid.cell.height)
  ctx.fillText('1 km', markerPositions.x + (0.5 * grid.cell.width / 10), markerPositions.y + (5.5 * grid.cell.height / 10))

  ctx.strokeStyle = 'rgba(255,0,0,0.7)';
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.setLineDash([]);
}

function drawGrid() {
  ctx.beginPath()
  for (let i = 0; i <= canvas.width; i += grid.cell.width) {
    ctx.moveTo(i, 0)
    ctx.lineTo(i, canvas.height)
  }
  
  for (let i = 0; i <= canvas.height; i += grid.cell.height) {
    ctx.moveTo(0, i)
    ctx.lineTo(canvas.width, i)
  }
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 1
  ctx.stroke()
}

module.exports = {
  ...grid,
  drawGrid,
  drawScaleMark,
}