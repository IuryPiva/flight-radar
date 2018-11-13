import { Cartesian } from "../utils/coordinate";
import { getMinDistanceAirport, getMinDistanceAirships, getMinTimeToDanger } from "./collision-avoidance/variables";
import { Airship } from "../airship/airship";
import { Airships, AirshipPair } from "../airship/airships";
import { Feedback } from "./feedback";
import { equalsWithErrorMargin } from "../utils/math";
import { avoidCollision } from "./collision-avoidance/avoid-collision-ai";

export const COLLISION_TYPES = {
  NOSE_TO_NOSE: 'NOSE_TO_NOSE',
  INTERSECTING_EQ_90_DEGREES: 'INTERSECTING_EQ_90_DEGREES',
  INTERSECTING_LT_90_DEGREES: 'INTERSECTING_LT_90_DEGREES',
  INTERSECTING_GT_90_DEGREES: 'INTERSECTING_GT_90_DEGREES',
  RUN_OVER: 'RUN_OVER',
  RUN_OVER_STALLED: 'RUN_OVER_STALLED',
}

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
        airshipPair.setDanger(true)
        this.feedback.showAirshipsGoingToCollide(airshipPair)
      } else if (
        !this.collisionInminent(airshipPair) &&
        this.inDanger.includes(airshipPair.id)
      ) {
        airshipPair.setCollisionMode(false)
        this.inDanger.splice(this.inDanger.indexOf(airshipPair.id), 1)
        airshipPair.setDanger(false)
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
      if(equalsWithErrorMargin(airshipPair.angleBetween(), 90, 1/100)) airshipPair.collisionType = COLLISION_TYPES.INTERSECTING_EQ_90_DEGREES
      else if(airshipPair.angleBetween() > 90) airshipPair.collisionType = COLLISION_TYPES.INTERSECTING_GT_90_DEGREES
      else if(airshipPair.angleBetween() < 90) airshipPair.collisionType = COLLISION_TYPES.INTERSECTING_LT_90_DEGREES
    }
    else if (airshipPair.facingEachOther()) {
      airshipPair.timeToCollide = airshipPair.distance() / (airshipPair.first.speed.value + airshipPair.second.speed.value)
      airshipPair.collisionPoint = airshipPair.first.calcPointAheadInTime(airshipPair.timeToCollide)
      airshipPair.collisionType = COLLISION_TYPES.NOSE_TO_NOSE
    }
    else if(airshipPair.onTheSameDirection() && airshipPair.differentSpeed()) {
      if (airshipPair.secondOnReachOfFirst()) {
        airshipPair.timeToCollide = airshipPair.distance() / (airshipPair.first.speed.value - airshipPair.second.speed.value)
        airshipPair.collisionPoint = airshipPair.first.calcPointAheadInTime(airshipPair.timeToCollide)
      }
      if (airshipPair.firstOnReachOfSecond()) {
        airshipPair.timeToCollide = airshipPair.distance() / (airshipPair.second.speed.value - airshipPair.first.speed.value)
        airshipPair.collisionPoint = airshipPair.second.calcPointAheadInTime(airshipPair.timeToCollide)
      }
      airshipPair.collisionType = COLLISION_TYPES.RUN_OVER
    }
    else if(airshipPair.firstOnSecondDirection() && airshipPair.first.speed.value == 0) {
      airshipPair.timeToCollide = airshipPair.distance() / airshipPair.second.speed.value
      airshipPair.collisionPoint = airshipPair.second.calcPointAheadInTime(airshipPair.timeToCollide)
      airshipPair.collisionType = COLLISION_TYPES.RUN_OVER_STALLED
    }
    else if(airshipPair.secondOnFirstDirection() && airshipPair.second.speed.value == 0) {
      airshipPair.timeToCollide = airshipPair.distance() / airshipPair.first.speed.value
      airshipPair.collisionPoint = airshipPair.first.calcPointAheadInTime(airshipPair.timeToCollide)
      airshipPair.collisionType = COLLISION_TYPES.RUN_OVER_STALLED
    }
    return airshipPair.timeToCollide <= getMinTimeToDanger()
  }
}