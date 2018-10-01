require('bootstrap')
const { canvas, ctx, FPS } = require('./canvas')
const grid = require('./radar/grid')
const airship = require('./airship/airship')
const rings = require('./radar/rings')
const sweep = require('./radar/sweep')
const table = require('./control/table')
const tracker = require('./control/tracker')

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.beginPath()
  grid.drawGrid()
  airship.drawAirships()
  airship.animateAirships()
  rings.renderRings()
  sweep.renderSweep()
  sweep.animateSweep()
}
setTimeout(() => {
  table.drawTable()
  tracker.trackThem()
  setInterval(draw, 1000 / FPS)
}, 0)
