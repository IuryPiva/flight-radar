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
}

function drawGrid() {
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 1

  for (let i = 0; i <= canvas.width; i += grid.cell.width) {
    ctx.moveTo(i, 0)
    ctx.lineTo(i, canvas.height)
  }

  for (let i = 0; i <= canvas.height; i += grid.cell.height) {
    ctx.moveTo(0, i)
    ctx.lineTo(canvas.width, i)
  }
  ctx.stroke()
}

module.exports = {
  ...grid,
  drawGrid
}