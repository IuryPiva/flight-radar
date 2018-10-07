const { canvas, ctx } = require('../canvas')
const grid = {
  cell: {
    width: canvas.width / 10,
    height: canvas.width / 10,
  },
  center: {
    x: canvas.width / 2,
    y: canvas.height / 2
  },
  size: {
    x: (canvas.width / 10) / 10 -1,
    y: (canvas.height / 10) / 10 -1
  }
}

function drawScaleMark() {
  const { coordinatesToPx } = require('../utils')
  ctx.beginPath()
  ctx.fillStyle = 'rgba(0,0,0,0.2)';

  let markerPositions = coordinatesToPx(0, -4.5)
  ctx.moveTo(markerPositions.x, markerPositions.y)
  ctx.lineTo(markerPositions.x + grid.cell.width, markerPositions.y)
  ctx.fillText('1 km', markerPositions.x + (3.5 * grid.cell.width / 10), markerPositions.y + (2 * grid.cell.height / 10))

  markerPositions = coordinatesToPx(-0.5, -4)
  ctx.moveTo(markerPositions.x, markerPositions.y)
  ctx.lineTo(markerPositions.x, markerPositions.y + grid.cell.height)
  ctx.fillText('1 km', markerPositions.x + (0.5 * grid.cell.width / 10), markerPositions.y + (5.5 * grid.cell.height / 10))

  ctx.strokeStyle = 'rgba(0,0,0,0.2)';
  ctx.lineWidth = 2
  ctx.stroke()
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
  drawScaleMark()
}

module.exports = {
  ...grid,
  drawGrid,
}