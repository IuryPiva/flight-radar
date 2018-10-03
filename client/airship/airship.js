const { ctx, FPS } = require('../canvas')
const airships = require('./airships')
const { coordinatesToPx } = require('../utils')
const sprites = require('./sprites')
const { getHoveringOver, selected } = require('../control/table')
const { animateAirships } = require('./animation')
const { getDistantPoint } = require('../control/tracker')
let blinks = 0

function getSprite(airship) {
  function red() {
    return true
  }
  function shouldBlink() {
    if(blinks < FPS / 3) {
      blinks++
      return true
    }
    if(blinks >= FPS / 3 && blinks <= FPS / 3 * 2) {
      blinks++
      return false
    }
    if(blinks >= FPS / 3 * 2) {
      blinks = 0
      return false
    }
  }
  const hoveringOver = getHoveringOver()
  if(airship.speed*60*60 > 200) {
    if(hoveringOver.includes(airship.id)) {
      if(shouldBlink()) return sprites.airshipRed
      return sprites.airship
    }
    if(selected.includes(airship.id)) return sprites.airshipRed
    return sprites.airship
  }
  else {
    if(hoveringOver.includes(airship.id)) {
      if(shouldBlink()) return sprites.helicopterRed
      return sprites.helicopter
    }
    if(selected.includes(airship.id)) return sprites.helicopterRed
    return sprites.helicopter
  }
}

function drawAirships() {
  return airships.forEach(airship => {
    drawAirship(airship)
    drawAirshipGuideLine(airship)  
  })
}

function drawAirship(airship) {
  const pixel = coordinatesToPx(airship.x, airship.y)
  const rad = (Math.abs(airship.direction - 360) * Math.PI / 180)
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

function drawAirshipGuideLine(airship) {
  const pixel = coordinatesToPx(airship.x, airship.y)
  
  const distantPoint = getDistantPoint(airship)
  const distantPointPx = coordinatesToPx(distantPoint.x, distantPoint.y)
  
  ctx.beginPath()
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 1
  ctx.moveTo(pixel.x, pixel.y)
  ctx.lineTo(distantPointPx.x, distantPointPx.y)
  ctx.stroke()
}

function getAirshipById(id) {
  return airships.find(airship => airship.id == id)
}

module.exports = {
  animateAirships,
  drawAirships,
  getAirshipById,
  drawAirshipGuideLine
}
