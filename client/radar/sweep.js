const grid = require('./grid')
const { ctx, FPS } = require('../canvas')
const rings = require('./rings')
const gradient = ctx.createLinearGradient(rings.radius, 0, 0, 0),
  hueEnd = 170,
  hueStart = 120,
  saturation = 50,
  lightness = 40
gradient.addColorStop(0, 'hsla( ' + hueStart + ', ' + saturation + '%, ' + lightness + '%, 1 )')
gradient.addColorStop(1, 'hsla( ' + hueEnd + ', ' + saturation + '%, ' + lightness + '%, 0.1 )')


const animateSweep = () => {
  sweepAngle += sweepSpeed / FPS
}

const dToR = function (degrees) {
  return degrees * (Math.PI / 180)
}
let sweepAngle = 270,
  sweepSpeed = 120 // GRAUS POR SEGUNDO

const renderSweep = function () {
  ctx.save()
  ctx.translate(grid.center.x, grid.center.y)
  ctx.rotate(dToR(sweepAngle))
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.arc(0, 0, rings.radius, dToR(-1), dToR(1), false)
  ctx.closePath()
  ctx.fillStyle = gradient
  ctx.fill()
  ctx.restore()
}

module.exports = {
  renderSweep,
  animateSweep
}