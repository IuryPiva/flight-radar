require('bootstrap')
const { canvas, ctx, FPS } = require('./canvas')
const grid = require('./radar/grid')
const airship = require('./airship/airship')
const rings = require('./radar/rings')
const sweep = require('./radar/sweep')
const table = require('./control/table')
const tracker = require('./control/tracker')
require('./control/transformation')


function draw() {
  let radar = document.getElementById('draw-radar').checked,
      renderRings = document.getElementById('draw-polar').checked,
      drawAirships = document.getElementById('draw-airships').checked,
      animateAirships = document.getElementById('animate-airships').checked,
      drawGrid = document.getElementById('draw-grid').checked
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.beginPath()
  if(drawGrid) grid.drawGrid()
  if(drawAirships) airship.drawAirships()
  if(animateAirships) airship.animateAirships()
  if(renderRings) rings.renderRings()
  if(radar) {
    sweep.renderSweep()
    sweep.animateSweep()
  }
}
setTimeout(() => {
  table.drawTable()
  tracker.trackThem()
  setInterval(draw, 1000 / FPS)
}, 0)
