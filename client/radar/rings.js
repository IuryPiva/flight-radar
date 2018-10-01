const { ctx } = require('../canvas')
const grid = require('./grid')
const rings = {}
rings.amount= 6
rings.diameter= grid.cell.width * rings.amount * 2
rings.radius= rings.diameter / 2
rings.lineWidth= 1
const renderRings = function () {
  for (let i = 0; i < rings.amount; i++) {
    ctx.beginPath()
    ctx.arc(grid.center.x, grid.center.y, ((rings.radius - (rings.lineWidth / 2)) / rings.amount) * (i + 1), 0, Math.PI * 2, false)
    ctx.strokeStyle = 'black'
    ctx.lineWidth = rings.lineWidth
    ctx.stroke()
  }
}

module.exports = {
  ...rings,
  renderRings
}