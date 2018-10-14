import { Cartesian } from "../utils/coordinate";
import { getMinDistanceAirport, getMinDistanceAirships, getMinTimeToDanger } from "./collision-avoidance/variables";
import { Airship } from "../airship/airship";
import { colinearPointWithinSegment, checkIntersection } from "./collision-avoidance/line-intersect";
import { Airships, AirshipPair } from "../airship/airships";

export class Tracker {
  airport = new Cartesian(0,0)
  inWarning: string[]
  inDanger: string[]

  isCloseToAirport(airship: Airship) {
    return airship.position.distance(this.airport) < getMinDistanceAirport()
  }

  isGoingToCollideWithAirport(airship: Airship) {
    const intersection = colinearPointWithinSegment(this.airport, airship.position, airship.calcFurthestPointAhead())
  
    if (intersection) {
      // TODO - alert('morreu')
    }
  }

  isCloseToEachOther(airships: Airships) {
    airships.getPairs().forEach((airshipPair: AirshipPair) => {
      if (
        airshipPair.distance() < getMinDistanceAirships() &&
        !this.inWarning.includes(airshipPair.id)
      ) {
        this.inWarning.push(airshipPair.id)
        // TODO - showAirshipCloseToAirshipWarning(airshipPair)
      } else if (
        airshipPair.distance() > getMinDistanceAirships() &&
        this.inWarning.includes(airshipPair.id)
      ) {
        this.inWarning.splice(this.inWarning.indexOf(airshipPair.id), 1)
        // TODO - hideAirshipCloseToAirshipWarning(airshipPair)
      }
    })
  }
  
  isGoingToCollide(airships: Airships) {
    airships.getPairs().forEach((airshipPair: AirshipPair) => {
      if (
        this.collisionInminent(airshipPair) &&
        !this.inDanger.includes(airshipPair.id)
      ) {
        this.inDanger.push(airshipPair.id)
        // TODO - showAirshipsGoingToCollide(airshipPair)
      } else if (
        !this.collisionInminent(airshipPair) &&
        this.inDanger.includes(airshipPair.id)
      ) {
        this.inDanger.splice(this.inDanger.indexOf(airshipPair.id), 1)
        // TODO - hideAirshipsGoingToCollide(airshipPair)
      }
    })
  }

  collisionInminent(airshipPair: AirshipPair) {
    airshipPair.timeToCollide = getMinTimeToDanger() + 1;
    const intersection = airshipPair.checkIntersection()

    if (intersection.type == "intersecting") {
      const timeToIntersectionFirst = airshipPair.first.timeToPoint(intersection.point)
      const timeToIntersectionSecond = airshipPair.second.timeToPoint(intersection.point)

      airshipPair.timeToCollide = timeToIntersectionFirst > timeToIntersectionSecond ? timeToIntersectionFirst : timeToIntersectionSecond
    }
    else if (airshipPair.onOppositeDirection() && (airshipPair.secondOnReachOfFirst() || airshipPair.firstOnReachOfSecond())) {
      airshipPair.timeToCollide = airshipPair.distance() / (airshipPair.first.speed.value + airshipPair.second.speed.value)
    }
    else if(airshipPair.onTheSameDirection() && airshipPair.differentSpeed()) {
      if (airshipPair.secondOnReachOfFirst()) {
        airshipPair.timeToCollide = airshipPair.distance() / (airshipPair.first.speed.value - airshipPair.second.speed.value)
      }
      if (airshipPair.firstOnReachOfSecond()) {
        airshipPair.timeToCollide = airshipPair.distance() / (airshipPair.second.speed.value - airshipPair.first.speed.value)
      }
    }
    else if(airshipPair.firstOnSecondDirection() && airshipPair.first.speed.value == 0) {
      airshipPair.timeToCollide = airshipPair.distance() / airshipPair.second.speed.value
    }
    else if(airshipPair.secondOnFirstDirection() && airshipPair.second.speed.value == 0) {
      airshipPair.timeToCollide = airshipPair.distance() / airshipPair.first.speed.value
    }
    return airshipPair.timeToCollide <= getMinTimeToDanger()
  }
}

// function getInDanger() {
//   const inDanger = []
//   dangerShow.forEach(twoPlanesId => {
//     inDanger.push(_.join(_.slice(twoPlanesId, 0, 6), ''))
//     inDanger.push(_.join(_.slice(twoPlanesId, 6, 12), ''))
//   })
//   return _.uniq(inDanger)
// }
// const dangerShow = []