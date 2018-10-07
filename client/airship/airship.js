const { ctx, FPS } = require('../canvas')
const airships = require('./airships')
const { coordinatesToPx } = require('../utils')
const sprites = require('./sprites')
const { getHoveringOver, selected } = require('../control/table')
const { animateAirships } = require('./animation')
const { getDistantPoint, getInDanger } = require('../control/tracker')

function getSprite(airship) {
  function red() {
    return true
  }
  function shouldBlink(airship) {
    if(airship.blinks < FPS / 3) {
      airship.blinks++
      return true
    }
    if(airship.blinks >= FPS / 3 && airship.blinks <= FPS / 3 * 2) {
      airship.blinks++
      return false
    }
    if(airship.blinks >= FPS / 3 * 2) {
      airship.blinks = 0
      return false
    }
  }
  const hoveringOver = getHoveringOver()
  const inDanger = getInDanger()
  if(airship.speed*60*60 > 200) {
    if(inDanger.includes(airship.id) || hoveringOver.includes(airship.id)) {
      if(shouldBlink(airship)) return sprites.airshipRed
      return sprites.airship
    }
    if(selected.includes(airship.id)) return sprites.airshipRed
    return sprites.airship
  }
  else {
    if(inDanger.includes(airship.id) || hoveringOver.includes(airship.id)) {
      if(shouldBlink(airship)) return sprites.helicopterRed
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
  ctx.beginPath()
  ctx.font="12px Georgia"
  ctx.fillStyle = 'black';
  ctx.fillText(airship.id, pixel.x + airship.width / 2, pixel.y + airship.height / 2)
  ctx.translate(pixel.x, pixel.y-airship.height)
  ctx.translate(0, 0)
  ctx.rotate(rad)
  ctx.drawImage(getSprite(airship), -airship.width / 2, -airship.height / 2)
  ctx.restore()
  ctx.beginPath();
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.arc(pixel.x,pixel.y,10,0,2*Math.PI);
  ctx.fill();
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
