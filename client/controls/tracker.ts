import { Cartesian } from "../utils/coordinate";
import { getMinDistanceAirport, getMinDistanceAirships, getMinTimeToDanger } from "./collision-avoidance/variables";
import { Airship } from "../airship/airship";
import { Airships, AirshipPair } from "../airship/airships";
import { Feedback } from "./feedback";
import { equalsWithErrorMargin } from "../utils/math";

export class Tracker {
  airport = new Cartesian(0,0)
  inWarning: string[] = []
  inDanger: string[] = []
  inAirportDistance: string[] = []
  inAirportDirection: string[] = []
  feedback = new Feedback()

  trackThem(airships: Airships) {
    this.isCloseToAirport(airships)
    this.isCloseToEachOther(airships)
    this.isGoingToCollide(airships)
    this.isGoingToCollideWithAirport(airships)
  }

  isCloseToAirport(airships: Airships) {
    airships.getAll().forEach((airship: Airship) => {
      if (
        airship.position.distance(this.airport) < getMinDistanceAirport()
        && !this.inAirportDistance.includes(airship.id)
      ) {
        this.inAirportDistance.push(airship.id)
        this.feedback.showAirshipCloseToAirportInfo(airship)
      } else if (
        airship.position.distance(this.airport) > getMinDistanceAirport()
        && this.inAirportDistance.includes(airship.id)
      ) {
        this.inAirportDistance.splice(this.inAirportDistance.indexOf(airship.id), 1)
        this.feedback.hideAirshipCloseToAirportInfo(airship)
      }
    })
  }

  isGoingToCollideWithAirport(airships: Airships) {
    airships.getAll().forEach((airship: Airship) => {
      const airportIntersection = equalsWithErrorMargin(
        airship.position.distance(this.airport) + airship.calcFurthestPointAhead().distance(this.airport),
        airship.position.distance(airship.calcFurthestPointAhead()),
        1/100
      )
      if (
        airportIntersection
        && !this.inAirportDirection.includes(airship.id)
      ) {
        this.inAirportDirection.push(airship.id)
        this.feedback.showAirshipGoingToCollideWithAirport(airship)
      } else if (
        !airportIntersection
        && this.inAirportDirection.includes(airship.id)
      ) {
        this.inAirportDirection.splice(this.inAirportDirection.indexOf(airship.id), 1)
        this.feedback.hideAirshipGoingToCollideWithAirport(airship)
      }
    })
  }

  isCloseToEachOther(airships: Airships) {
    airships.getPairs().forEach((airshipPair: AirshipPair) => {
      if (
        airshipPair.distance() < getMinDistanceAirships() &&
        !this.inWarning.includes(airshipPair.id)
      ) {
        this.inWarning.push(airshipPair.id)
        this.feedback.showAirshipCloseToAirshipWarning(airshipPair)
      } else if (
        airshipPair.distance() > getMinDistanceAirships() &&
        this.inWarning.includes(airshipPair.id)
      ) {
        this.inWarning.splice(this.inWarning.indexOf(airshipPair.id), 1)
        this.feedback.hideAirshipCloseToAirshipWarning(airshipPair)
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
        this.feedback.showAirshipsGoingToCollide(airshipPair)
      } else if (
        !this.collisionInminent(airshipPair) &&
        this.inDanger.includes(airshipPair.id)
      ) {
        this.inDanger.splice(this.inDanger.indexOf(airshipPair.id), 1)
        this.feedback.hideAirshipsGoingToCollide(airshipPair)
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