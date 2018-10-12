import { Cartesian } from "../utils/coordinate";
import { KilometresPerSecond, KilometresPerHour, MetresPerSecond } from "../utils/speed";
import { randomFlightId } from "../random";
import { Sprite } from './sprite'
import { Pixel, FPS } from "../canvas";
import { Grid } from "../radar/grid";
import { Degrees } from "../utils/math";
import { getMinTimeToDanger } from "../controls/collision-avoidance/variables";

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
  id: string
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

  public getSprite() {
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
}
