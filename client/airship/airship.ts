import { Cartesian } from "../utils/coordinate";
import { KilometresPerSecond, KilometresPerHour, MetresPerSecond } from "../utils/speed";
import { randomFlightId } from "../random";
import { Sprite } from './sprite'
import { Pixel } from "../canvas";
import { Grid } from "../radar/grid";
import { Degrees, Radians } from "../utils/math";
import { getMinTimeToDanger } from "../controls/collision-avoidance/variables";
import { copyInstance } from "../utils/clone";
import { shouldTeleportTo } from "../controls/features";
import cloneDeep from 'lodash/fp/cloneDeep'
import { Polygon } from "../utils/polygon";
import { Config } from "../config";
import { PlayerControl } from "../player/play";

interface SpeedLimit {
  min: KilometresPerHour
  max: KilometresPerHour
}

class Limits {
  speed: SpeedLimit
  acceleration: MetresPerSecond
  rateOfTurn: Degrees = new Degrees(5.25)
  
  constructor (type: string) {
    if (type == 'avião') {
      this.speed = {
        max: new KilometresPerHour(1111.32),
        min: new KilometresPerHour(251),
      }
      this.acceleration = new MetresPerSecond(14.7)
    } else {
      this.speed = {
        max: new KilometresPerHour(287),
        min: new KilometresPerHour(0),
      }
      this.acceleration = new MetresPerSecond(11.11)
    }
  }
}

interface AirshipHistory {
  position?: Cartesian
  direction?: Degrees
  speed?: KilometresPerSecond
  turnTo?: Cartesian
  accelerateTo?: KilometresPerSecond
  exists: boolean
}

export class Airship {
  id: string
  type: string
  position: Cartesian
  direction: Degrees
  speed: KilometresPerSecond
  width: Pixel
  height: Pixel
  blinks = 0
  limits: Limits
  turnTo: Cartesian = null
  directionTo: Degrees = null
  accelerateTo: KilometresPerSecond = null
  isHover = false
  inDanger = false
  isSelected = false
  sprite: Sprite
  history: AirshipHistory = null
  rightForever = false
  leftForever = false
  moveTo: Cartesian = null
  whenArrive = []

  constructor( position: Cartesian, direction: Degrees, speed: KilometresPerHour ) {
    this.id = randomFlightId()
    this.direction = direction
    this.position = position
    this.speed = speed.toKilometresPerSecond()
    this.type = speed.value > 250 ? 'avião' : 'helicóptero'
    this.sprite = new Sprite(this.type)
    this.limits = new Limits(this.type)

    this.width = new Pixel(85 * (600/Config.cellsPerAxis) / 1000)
    this.height = new Pixel(85 * (600/Config.cellsPerAxis) / 1000)
  }

  private shouldBlink() {
    if(this.blinks < Config.FPS / 3) {
      this.blinks++
      return true
    }
    if(this.blinks >= Config.FPS / 3 && this.blinks <= Config.FPS / 3 * 2) {
      this.blinks++
      return false
    }
    if(this.blinks >= Config.FPS / 3 * 2) {
      this.blinks = 0
      return true
    }
  }

  restoreSpeed() {
    if (this.history && this.history.speed) this.accelerateTo = this.history.speed
  }

  restoreDirection() {
    if (this.history && this.history.position) this.moveTo = this.history.position
  }
  
  restorePosition() {
    if (this.history && this.history.direction) this.direction = this.history.direction
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
      this.position.x + (this.width.half().inScale(grid.cell.width) * (Math.cos(this.direction.toRadians().value))),
      this.position.y + (this.height.half().inScale(grid.cell.height) * (Math.sin(this.direction.toRadians().value)))
    )
  }

  calcPointAheadInTime(seconds: number) {
    const effectiveSpeed = this.speed.value * seconds
    return this.position.pointInDirection(effectiveSpeed, this.direction)
  }

  calcFurthestPointAhead(times: number = 1) {
    const effectiveSpeed = this.speed.value
      ? this.speed.value * getMinTimeToDanger() * times
      : times * this.limits.speed.max.toKilometresPerSecond().value / Config.FPS

    return this.position.pointInDirection(effectiveSpeed, this.direction)
  }

  move() {
    const effectiveSpeed = this.speed.value / Config.FPS

    const x = this.position.x + effectiveSpeed * Math.cos(this.direction.toRadians().value)
    const y = this.position.y + effectiveSpeed * Math.sin(this.direction.toRadians().value)

    this.position.set(x,y)
    // if(this.moveTo) {

    // }
  }

  accelerate() {
    if(this.isSelected && PlayerControl.upPressed) return this.speed.value += (this.limits.acceleration.toKilometresPerSecond().value / Config.FPS)
    if(this.isSelected && PlayerControl.downPressed) return this.speed .value -= (this.limits.acceleration.toKilometresPerSecond().value / Config.FPS)

    if (this.accelerateTo === null) {
      return false
    } else if (this.accelerateTo.value > this.speed.value) {
      if (this.speed.value + (this.limits.acceleration.toKilometresPerSecond().value / Config.FPS) > this.accelerateTo.value) {
        this.speed = this.accelerateTo
        this.accelerateTo = null
      } else {
        this.speed.value += (this.limits.acceleration.toKilometresPerSecond().value / Config.FPS)
      }
    } else if (this.accelerateTo.value < this.speed.value) {
      if (this.speed.value - (this.limits.acceleration.toKilometresPerSecond().value / Config.FPS) < this.accelerateTo.value) {
        this.speed = this.accelerateTo
        this.accelerateTo = null
      } else {
        this.speed .value -= (this.limits.acceleration.toKilometresPerSecond().value / Config.FPS)
      }
    }
  }

  setAccelerateTo(input: KilometresPerHour) {
    if(input.value >= this.limits.speed.max.value) this.accelerateTo = this.limits.speed.max.toKilometresPerSecond()
    else if(input.value <= this.limits.speed.min.value) this.accelerateTo = this.limits.speed.min.toKilometresPerSecond()
    else {
      this.accelerateTo = input.toKilometresPerSecond()
    }
  }

  directionToPoint(point: Cartesian): Degrees {
    const pointClone: Cartesian = copyInstance(point)
    pointClone.reduce(this.position)

    return new Radians(Math.atan2(pointClone.y, pointClone.x)).toDegrees()
  }

  turn() {
    if(this.isSelected && PlayerControl.rightPressed) return this.direction.set(this.direction.value - (this.limits.rateOfTurn.value * 2) / Config.FPS)
    if(this.isSelected && PlayerControl.leftPressed) return this.direction.set(this.direction.value + (this.limits.rateOfTurn.value * 2) / Config.FPS)
    if(this.rightForever) return this.direction.set(this.direction.value - this.limits.rateOfTurn.value / Config.FPS)
    if(this.leftForever) return this.direction.set(this.direction.value + this.limits.rateOfTurn.value / Config.FPS)
    if (this.turnTo === null) return;
    
    let difference: Degrees = new Degrees(this.directionToPoint(this.turnTo).value - this.direction.value)
    const airshipClone = copyInstance(this)

    if (difference.isCounterClockWise()) {
      airshipClone.direction.set(airshipClone.direction.value + this.limits.rateOfTurn.value / Config.FPS)
      difference.set(this.directionToPoint(this.turnTo).value - airshipClone.direction.value)
    } 
    else if (difference.isClockWise()) {
      airshipClone.direction.set(airshipClone.direction.value - this.limits.rateOfTurn.value / Config.FPS)
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
    if(shouldTeleportTo()) {
      this.position = position
    } else {
      this.turnTo = position
    }
  }

  goToNeverTeleport(position: Cartesian) {
    this.turnTo = position
  }

  set(position: Cartesian, direction: Degrees, speed: KilometresPerHour) {
    if (speed.value < this.limits.speed.min.value) return window.alert(`Esta velocidade é menor que a mínima (${this.limits.speed.min.display()}) para um ${this.type} se manter no ar.`)
    if (speed.value > this.limits.speed.max.value) return window.alert(`Esta velocidade é maior que a máxima (${this.limits.speed.max.display()}) para um ${this.type} comercial.`)

    this.goTo(position)
    this.accelerateTo = speed.toKilometresPerSecond()
    this.directionTo = direction // TODO - REACH POINT WITH THIS DIRECTION
  }

  timeToPoint(point: Cartesian) {
    return this.position.distance(point) / this.speed.value
  }

  saveHistory() {
    const airshipClone = cloneDeep(this)
    this.history = {
      position: airshipClone.position,
      speed: airshipClone.speed,
      direction: airshipClone.direction,
      accelerateTo: airshipClone.accelerateTo,
      turnTo: airshipClone.turnTo,
      exists: true
    }
  }

  restoreFromHistory() {
    if(!this.history || !this.history.speed) return
    if(this.history.accelerateTo) this.accelerateTo = this.history.accelerateTo
    else this.accelerateTo = this.history.speed

    if(this.history.turnTo) this.turnTo = this.history.turnTo
    else this.turnTo = this.history.position.pointInDirection(100, this.history.direction)
  }

  makeTriangleAhead(degrees: number) {
    const polygon = new Polygon([this.position])
    const furthestPointAhead = this.calcFurthestPointAhead()
    polygon.add(cloneDeep(furthestPointAhead))
    const furthestPointAhead2 = this.calcFurthestPointAhead()

    furthestPointAhead2.reduce(this.position)
    furthestPointAhead2.rotate(new Degrees(degrees))
    furthestPointAhead2.translate(this.position)

    polygon.add(cloneDeep(furthestPointAhead2))    

    // for(let i = 0; i <= degrees; i++) {
    //   furthestPointAhead.reduce(this.position)
    //   furthestPointAhead.rotate(new Degrees(1))
    //   furthestPointAhead.translate(this.position)
    //   polygon.add(cloneDeep(furthestPointAhead))
    // }

    // for(let i = 0; i >= degrees; i--) {
    //   furthestPointAhead.reduce(this.position)
    //   furthestPointAhead.rotate(new Degrees(-1))
    //   furthestPointAhead.translate(this.position)
    //   polygon.add(cloneDeep(furthestPointAhead))
    // }
    
    return polygon
  }

  getLeftTrianglePolygon() {
    return this.makeTriangleAhead(45)
  }

  getRightTrianglePolygon() {
    return this.makeTriangleAhead(-45)
  }

  setRightForever(input) {
    this.rightForever = input
  }

  setLeftForever(input) {
    this.leftForever = input
  }
}
