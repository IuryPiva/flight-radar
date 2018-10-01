const { ctx } = require('../canvas')
const airships = require('./airships')
const { coordinatesToPx } = require('../utils')

function drawAirships() {
  return airships.forEach(airship => drawAirship(airship))
}

function drawAirship(airship) {
  const pixel = coordinatesToPx(airship.x, airship.y)
  const rad = (airship.direction * Math.PI / 180) * (-1)
  ctx.save()
  ctx.font="12px Georgia"
  ctx.fillText(airship.id, pixel.x + airship.width / 2, pixel.y + airship.height / 2)
  ctx.fillText(airship.id, pixel.x + airship.width / 2, pixel.y + airship.height / 2)
  ctx.translate(pixel.x, pixel.y)
  ctx.translate(0, 0)
  ctx.rotate(rad)
  ctx.drawImage(airship.sprite, -airship.width / 2, -airship.height / 2)
  ctx.restore()
}

const { animateAirships } = require('./animation')

module.exports = {
  animateAirships,
  drawAirships
}