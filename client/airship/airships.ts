import { Airship } from "./airship";
import { Cartesian } from "../utils/coordinate";
import { KilometresPerHour } from "../utils/speed";
import { Degrees } from "../utils/math";
import { checkIntersection } from "../controls/collision-avoidance/line-intersect";
import { Table } from "../controls/table";

export class Airships {
  airships: Airship[]
  pairs: AirshipPair[]

  constructor (airships: Airship[]) {
    this.airships = airships
  }
  
  add(airship: Airship) {
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
    this.getAll().forEach( (airship: Airship) => {
      airship.set(position, direction, speed)
    })
  }

  getSelected(): Airships {
    return new Airships(this.airships.filter(airship => airship.isSelected))
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
      table.updateRow(airship)
    })
  }
}

export class AirshipPair {
  first: Airship
  second: Airship
  id: string
  timeToCollide: number

  constructor (first: Airship, second: Airship) {
    this.first = first
    this.second = second
    this.id = `${first.id}${second.id}`
  }

  distance() {
    return this.first.position.distance(this.second.position)
  }

  checkIntersection() {
    return checkIntersection(
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
    return this.first.position.distance(this.second.position)
    + this.first.calcFurthestPointAhead().distance(this.second.position)
    == this.first.position.distance(this.first.calcFurthestPointAhead())
  }

  firstOnReachOfSecond() {
    return this.second.position.distance(this.first.position)
    + this.second.calcFurthestPointAhead().distance(this.first.position)
    == this.second.position.distance(this.second.calcFurthestPointAhead())
  }
  differentSpeed() {
    return this.first.speed.value - this.second.speed.value !== 0
  }
}
