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
        !dangerShow.includes(airshipPair.id)
      ) {
        dangerShow.push(airshipPair.id)
        // TODO - showAirshipsGoingToCollide(airshipPair)
      } else if (
        !this.collisionInminent(airshipPair) &&
        dangerShow.includes(airshipPair.id)
      ) {
        dangerShow.splice(dangerShow.indexOf(airshipPair.id), 1)
        // TODO - hideAirshipsGoingToCollide(airshipPair)
      }
    })
  }

  collisionInminent(airshipPair: AirshipPair) {
    const intersection = airshipPair.checkIntersection()
  
    if (intersection.type == "intersecting") {
      const timeToIntersectionFirst = airshipPair.first.timeToPoint(intersection.point)
      const timeToIntersectionSecond = airshipPair.second.timeToPoint(intersection.point)

      airshipPair.timeToCollide = timeToIntersectionFirst > timeToIntersectionSecond ? timeToIntersectionFirst : timeToIntersectionSecond

      if (airshipPair.timeToCollide <= getMinTimeToDanger()) {
        return true
      }
    } 
    else {
      const secondOnFirstDirection = airshipPair.first.directionToPoint(airshipPair.second.position) == airshipPair.first.direction
      const firstOnSecondDirection = airshipPair.second.directionToPoint(airshipPair.first.position) == airshipPair.second.direction

      if (
        airshipPair.first.position.distance(airshipPair.second.position) + 
        airshipPair.first.calcFurthestPointAhead().distance(airshipPair.second.position)
        == airshipPair.first.position.distance(airshipPair.first.calcFurthestPointAhead())
      ) {
        airshipPair.timeToCollide = airshipPair.distance() / (-airshipPair.first.speed.value + airshipPair.second.speed.value)
        if (airshipPair.timeToCollide <= getMinTimeToDanger()) return true
      }

      if (
        airshipPair.second.position.distance(airshipPair.first.position) + 
        airshipPair.second.calcFurthestPointAhead().distance(airshipPair.first.position)
        == airshipPair.second.position.distance(airshipPair.second.calcFurthestPointAhead())
      ) {
        airshipPair.timeToCollide = airshipPair.distance() / (airshipPair.first.speed.value - airshipPair.second.speed.value)
        if (airshipPair.timeToCollide <= getMinTimeToDanger()) return true
      }
      
      if(firstOnSecondDirection && airshipPair.first.speed.value == 0) {
        airshipPair.timeToCollide = airshipPair.distance() / airshipPair.second.speed.value
        if (airshipPair.timeToCollide <= getMinTimeToDanger()) {
          return true
        }
      } else
      if(secondOnFirstDirection && airshipPair.second.speed.value == 0) {
        airshipPair.timeToCollide = airshipPair.distance() / airshipPair.first.speed.value
        if (airshipPair.timeToCollide <= getMinTimeToDanger()) {
          return true
        }
      } else
      if(firstOnSecondDirection && secondOnFirstDirection) {
        airshipPair.timeToCollide = airshipPair.distance() / (airshipPair.first.speed.value + airshipPair.second.speed.value)
        if (airshipPair.timeToCollide <= getMinTimeToDanger()) {
          return true
        }
      }
    }

    return false
  }
}

// TODO IMPROVE THIS PERFORMANCE
function getInDanger() {
  const inDanger = []
  dangerShow.forEach(twoPlanesId => {
    inDanger.push(_.join(_.slice(twoPlanesId, 0, 6), ''))
    inDanger.push(_.join(_.slice(twoPlanesId, 6, 12), ''))
  })
  return _.uniq(inDanger)
}
const dangerShow = []