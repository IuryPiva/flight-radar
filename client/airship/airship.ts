import { Cartesian } from "../utils/coordinate";
import { KilometresPerSecond, KilometresPerHour, MetresPerSecond } from "../utils/speed";
import { randomFlightId } from "../random";
import { Sprite } from './sprite'
import { Pixel, FPS } from "../canvas";
import { Grid } from "../radar/grid";
import { Degrees, Radians } from "../utils/math";
import { getMinTimeToDanger } from "../controls/collision-avoidance/variables";

class Limits {
  speed: {
    min: KilometresPerHour
    max: KilometresPerHour
  }
  acceleration: MetresPerSecond
  rateOfTurn: Degrees = new Degrees(5.25)
  
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
  id: string
  position: Cartesian
  direction: Degrees
  speed: KilometresPerSecond
  width: Pixel = new Pixel(32)
  height: Pixel = new Pixel(32)
  blinks = 0
  accelerateTo: KilometresPerSecond
  limits: Limits
  moveTo: Cartesian
  turnTo: Cartesian
  directionTo: Degrees
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
      return true
    }
  }

  getSprite() {
    if(this.inDanger || this.isHover) {
      if(this.shouldBlink()) return this.sprite.red
      return this.sprite.black
    }
    if(this.isSelected) return this.sprite.red
    return this.sprite.black
  }

  calcNosePosition( grid: Grid ) {
    return new Cartesian(
      this.position.x + (this.width.inScale(grid.cell.width)) * (Math.cos(this.direction.value)),
      this.position.y + (this.height.inScale(grid.cell.height)) * -(Math.sin(this.direction.value))
    )
  }

  calcFurthestPointAhead(times: number = 1): Cartesian {
    const effectiveSpeed = this.speed.value
      ? this.speed.value * getMinTimeToDanger() * times
      : times * this.limits.speed.max.toKilometresPerSecond().value / FPS

    return new Cartesian(
      this.position.x + effectiveSpeed * Math.cos(this.direction.toRadians().value),
      this.position.y + effectiveSpeed * -Math.sin(this.direction.toRadians().value)
    )
  }

  move() {
    const effectiveSpeed = this.speed.value / FPS

    this.position.x = this.position.x + effectiveSpeed * Math.cos(this.direction.toRadians().value)
    this.position.y = this.position.y + effectiveSpeed * -Math.sin(this.direction.toRadians().value)
  }

  accelerate() {
    if (this.accelerateTo === null) {
      return false
    } else if (this.accelerateTo > this.speed) {
      if (this.speed.value + (this.limits.acceleration.value / FPS) > this.accelerateTo.value) {
        this.speed = this.accelerateTo
        this.accelerateTo = null
      } else {
        this.speed.value += (this.limits.acceleration.value / FPS)
      }
    } else if (this.accelerateTo < this.speed) {
      if (this.speed.value - (this.limits.acceleration.value / FPS) < this.accelerateTo.value) {
        this.speed = this.accelerateTo
        this.accelerateTo = null
      } else {
        this.speed .value -= (this.limits.acceleration.value / FPS)
      }
    }
  }

  directionToPoint(point: Cartesian): Degrees {
    const pointClone: Cartesian = Object.assign({}, point)

    pointClone.reduce(this.position)

    return new Radians(Math.atan2(pointClone.y, pointClone.x)).toDegrees()
  }

  turn() {
    if (this.turnTo === null) return;
    
    let difference: Degrees = new Degrees(this.directionToPoint(this.turnTo).value - this.direction.value)
    const airshipClone = Object.assign({}, this)

    if (difference.isCounterClockWise()) {
      airshipClone.direction.set(airshipClone.direction.value + this.limits.rateOfTurn.value / FPS)
      difference.set(this.directionToPoint(this.turnTo).value - airshipClone.direction.value)
    } 
    else if (difference.isClockWise()) {
      airshipClone.direction.set(airshipClone.direction.value - this.limits.rateOfTurn.value / FPS)
      difference.set(this.directionToPoint(this.turnTo).value - airshipClone.direction.value)
    }

    if (difference.isStraight()) {
      this.direction = this.directionToPoint(this.turnTo)
      this.turnTo = null
    } else {
      this.direction = airshipClone.direction
    }
  }

  goTo(position: Cartesian) {
    this.moveTo = position
    this.turnTo = position
  }

  set(position: Cartesian, direction: Degrees, speed: KilometresPerHour) {
    this.goTo(position)
    this.accelerateTo = speed.toKilometresPerSecond()
    this.directionTo = direction
  }
}
