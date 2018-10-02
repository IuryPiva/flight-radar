const { ctx } = require('../canvas')
const airships = require('./airships')
const { coordinatesToPx } = require('../utils')
const sprites = require('./sprites')
const { getHoveringOver } = require('../control/table')
const { animateAirships } = require('./animation')

function getSprite(airship) {
  const hoveringOver = getHoveringOver()
  if(airship.speed*60*60 > 200) {
    return hoveringOver.includes(airship.id) ? sprites.airshipRed : sprites.airship
  }
  return hoveringOver.includes(airship.id) ? sprites.helicopterRed : sprites.helicopter
}

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
  ctx.drawImage(getSprite(airship), -airship.width / 2, -airship.height / 2)
  ctx.restore()
}

function getAirshipById(id) {
  return airships.find(airship => airship.id == id)
}

module.exports = {
  animateAirships,
  drawAirships,
  getAirshipById
}
