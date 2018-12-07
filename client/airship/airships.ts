import { Airship } from "./airship";
import { Cartesian } from "../utils/coordinate";
import { KilometresPerHour } from "../utils/speed";
import { Degrees, equalsWithErrorMargin } from "../utils/math";
import { checkLinesIntersection } from "../controls/collision-avoidance/line-intersect";
import { Table } from "../controls/table";
import { randomCartesian, randomKilometresPerHour, randomDegrees } from "../random";

export class Airships {
  airships: Airship[] = []
  pairs: AirshipPair[] = []
  table: Table

  constructor (table?: Table, airships: Airship[] = []) {
    this.table = table
    airships.forEach(airship => {
      this.add(airship)
    })
  }
  
  add(airship: Airship) {
    this.table ? this.table.newRow(airship) : ''
    this.airships.push(airship)
    this.makePairs()
  }

  getAirshipById(id: string) {
    return this.airships.find(airship => airship.id == id)
  }

  getAll() {
    return this.airships
  }

  setAll(position: Cartesian, direction: Degrees, speed: KilometresPerHour) {
    this.getAll().forEach((airship: Airship) => {
      airship.set(position, direction, speed)
    })
  }

  getSelected(): Airships {
    return new Airships(null, this.airships.filter(airship => airship.isSelected))
  }

  getPairs(): AirshipPair[] {
    return this.pairs
  }

  makePairs() {
    this.pairs = []
    for (let i = 0; i < this.airships.length - 1; i++) {
      for (let j = i + 1; j < this.airships.length; j++) {
        this.pairs.push(new AirshipPair(this.airships[i],this.airships[j]))
      }
    }
  }

  animate(table: Table) {
    this.airships.forEach((airship: Airship) => {
      airship.accelerate()
      airship.turn()
      airship.move()
    })
  }
}

interface AvoidCollisionMode {
  on: boolean
}

export class AirshipPair {
  first: Airship
  second: Airship
  id: string
  timeToCollide: number
  avoidCollisionMode: AvoidCollisionMode = { on: false }
  inDanger: boolean
  collisionPoint: Cartesian
  collisionType: String
  avoiding: {
    collisionPoint: Cartesian
    collisionType: String
  }

  constructor (first: Airship, second: Airship) {
    this.first = first
    this.second = second
    this.id = `${first.id}${second.id}`
  }

  setCollisionMode(input: boolean) {
    if(input) {
      this.avoidCollisionMode.on = true
      this.first.saveHistory()
      this.second.saveHistory()
    } else {
      this.first.restoreFromHistory()
      this.second.restoreFromHistory()
    }
  }

  distance() {
    return this.first.position.distance(this.second.position)
  }

  checkIntersection() {
    return checkLinesIntersection(
      this.first.position, this.first.calcFurthestPointAhead(),
      this.second.position, this.second.calcFurthestPointAhead()
    )
  }

  secondOnFirstDirection() {
    return this.first.directionToPoint(this.second.position).value == this.first.direction.value
  }

  firstOnSecondDirection() {
    return this.second.directionToPoint(this.first.position).value == this.second.direction.value
  }

  onTheSameDirection() {
    return this.first.direction.value == this.second.direction.value
  }
  onOppositeDirection() {
    return this.first.direction.value + this.second.direction.value == 360
  }

  secondOnReachOfFirst() {
    return equalsWithErrorMargin(
      this.first.position.distance(this.second.position)
      + this.first.calcFurthestPointAhead().distance(this.second.position),
      this.first.position.distance(this.first.calcFurthestPointAhead()),
      1/100
    )
  }

  firstOnReachOfSecond() {
    return equalsWithErrorMargin(
      this.second.position.distance(this.first.position)
      + this.second.calcFurthestPointAhead().distance(this.first.position),
      this.second.position.distance(this.second.calcFurthestPointAhead()),
      1/100
    )
  }

  differentSpeed() {
    return this.first.speed.value - this.second.speed.value !== 0
  }

  angleBetween() {
    return Math.abs(this.first.direction.value - this.second.direction.value)
  }

  fastest() : Airship {
    if(this.first.speed.value == this.second.speed.value) return this.first
    if(this.first.speed.value > this.second.speed.value) {
      return this.first
    } else {
      return this.second
    }
  }

  slowest() : Airship {
    if(this.first.speed.value == this.second.speed.value) return this.second
    if(this.first.speed.value > this.second.speed.value) {
      return this.second
    } else {
      return this.first
    }
  }

  setDanger(state) {
    this.inDanger = state
    this.first.inDanger = state
    this.second.inDanger = state
  }

  facingEachOther() {
    return this.onOppositeDirection() && (this.secondOnReachOfFirst() || this.firstOnReachOfSecond())
  }

  firstOnSecondRightTriangle() {
    return this.second.getRightTrianglePolygon().checkCollision(this.first.calcFurthestPointAhead())
  }
  firstOnSecondLeftTriangle() {
    return this.second.getLeftTrianglePolygon().checkCollision(this.first.calcFurthestPointAhead())
  }
  secondOnFirstRightTriangle() {
    return this.first.getRightTrianglePolygon().checkCollision(this.second.calcFurthestPointAhead())
  }
  secondOnFirstLeftTriangle() {
    return this.first.getLeftTrianglePolygon().checkCollision(this.second.calcFurthestPointAhead())
  }
}
