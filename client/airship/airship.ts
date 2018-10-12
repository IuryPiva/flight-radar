import { Cartesian } from "../utils/coordinate";
import { Degrees } from "./model";
import { KilometresPerSecond, KilometresPerHour, MetresPerSecond } from "../utils/speed";
import { Pixel } from "../canvas";
import { randomFlightId } from "../random";
import { Sprite } from './sprite'

class Limits {
  speed: {
    min: KilometresPerHour
    max: KilometresPerHour
  }
  acceleration: MetresPerSecond
  
  constructor (speed: KilometresPerHour) {
    if (speed.value > 250) {
      this.speed.max = new KilometresPerHour(1111.32)
      this.speed.min = new KilometresPerHour(251)
      this.acceleration = new MetresPerSecond(14.7)
    } else {
      this.speed.max = new KilometresPerHour(250)
      this.speed.min = new KilometresPerHour(0)
      this.acceleration = new MetresPerSecond(11.11)
    }
  }
}

export class Airship {
  id: String
  position: Cartesian
  direction: Degrees
  speed: KilometresPerSecond
  width: Pixel = new Pixel(32)
  height: Pixel = new Pixel(32)
  blinks = 0
  accelerateTo: KilometresPerSecond
  limits: Limits
  navigateTo: Cartesian
  changeDirectionTo: Degrees
  isHover = false
  inDanger = false
  isSelected = false
  sprite: Sprite

  constructor( position: Cartesian, direction: Degrees, speed: KilometresPerHour ) {
    this.id = randomFlightId()
    this.direction = direction
    this.position = position
    this.speed = speed.toKilometresPerSecond()
    this.sprite = new Sprite(speed)
    this.limits = new Limits(speed)
  }

  private shouldBlink() {
    if(this.blinks < FPS / 3) {
      this.blinks++
      return true
    }
    if(this.blinks >= FPS / 3 && this.blinks <= FPS / 3 * 2) {
      this.blinks++
      return false
    }
    if(this.blinks >= FPS / 3 * 2) {
      this.blinks = 0
      return false
    }
  }

  private getSprite() {
    if(this.inDanger || this.isHover) {
      if(this.shouldBlink()) return this.sprite.red
      return this.sprite.black
    }
    if(this.isSelected) return this.sprite.red
    return this.sprite.black
  }

  public castShadow() {
    const pixel = coordinatesToPx(airship.x, airship.y)
    const rad = (Math.abs(airship.direction - 360) * Math.PI / 180)
    ctx.save()
    ctx.beginPath()
    ctx.translate(pixel.x, pixel.y)
    ctx.translate(0, 0)
    ctx.rotate(rad)
    if(airship.speed*60*60 > 200) {
      ctx.drawImage(sprites.airshipShadow, -airship.width / 2, -airship.height / 2)
    } else {
      ctx.drawImage(sprites.helicopterShadow, -airship.width / 2, -airship.height / 2)
    }
    ctx.restore()
  }
}
class Airplane extends Airship {
}
class Helicopter extends Airship {
}

import { ctx, FPS } from '../canvas'
import airships from './airships'
import { coordinatesToPx } from '../utils'
import { getHoveringOver, selected } from '../control/table'
import { animateAirships } from './animation'
import { getDistantPoint, getInDanger } from '../control/tracker'
import grid from '../radar/grid'

function getSprite(airship) {
  
}

function drawAirships() {
  airships.forEach(airship => {
    drawShadow(airship)
  })
  airships.forEach(airship => {
    drawAirshipGuideLine(airship)
  })
  airships.forEach(airship => {
    drawAirship(airship)
  })
}

function drawShadow(airship) {
}

function drawAirship(airship) {
  const pixel = coordinatesToPx(airship.x, airship.y)
  const rad = (Math.abs(airship.direction - 360) * Math.PI / 180)
  ctx.save()
  ctx.beginPath()
  ctx.font="12px Georgia"
  ctx.fillStyle = 'black'
  ctx.fillText(airship.id, pixel.x + airship.width / 2, pixel.y - airship.height / 2)
  ctx.translate(pixel.x, pixel.y-airship.z/10)
  ctx.translate(0, 0)
  ctx.rotate(rad)
  ctx.drawImage(getSprite(airship), -airship.width / 2, -airship.height / 2)
  ctx.restore()
}

function getPointInDirection(airship, howMuchPx) {
  return { 
    x : airship.x + (howMuchPx/grid.cell.width) * (Math.cos(Math.abs(airship.direction - 360) * Math.PI / 180)),
    y : airship.y + (howMuchPx/grid.cell.height) * -(Math.sin(Math.abs(airship.direction - 360) * Math.PI / 180))
  }
}

function drawAirshipGuideLine(airship) {
  const resultantPosition = Object.assign({}, airship)  
  const airshipBorder = getPointInDirection(airship, airship.width/2)

  resultantPosition.x = airshipBorder.x
  resultantPosition.y = airshipBorder.y

  const pixel = coordinatesToPx(airshipBorder.x, airshipBorder.y)
  
  const distantPoint = getDistantPoint(resultantPosition)
  const distantPointPx = coordinatesToPx(distantPoint.x, distantPoint.y)

  if(airship.speed > 0) {
    ctx.beginPath()
    ctx.setLineDash([3, 9]);
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 1
    ctx.moveTo(pixel.x, pixel.y)
    ctx.lineTo(distantPointPx.x, distantPointPx.y)
    ctx.stroke()
    ctx.setLineDash([]);
  }
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
