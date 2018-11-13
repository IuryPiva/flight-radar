import { AirshipPair } from "../../airship/airships";
import { KilometresPerHour } from "../../utils/speed";
import { getMinTimeToDanger } from "./variables";
import { Cartesian } from "../../utils/coordinate";
import { shouldAvoidCollision } from "../features";
import { COLLISION_TYPES } from "../tracker";

const maxSpeed = new KilometresPerHour(9999)
const minSpeed = new KilometresPerHour(0)

export function avoidCollisionAlgorithm(airshipPair: AirshipPair) {
  if(shouldAvoidCollision()) return
  if(airshipPair.avoidCollisionMode.on) return
  airshipPair.avoiding = {
    collisionPoint: airshipPair.collisionPoint,
    collisionType: airshipPair.collisionType
  }
  airshipPair.setCollisionMode(true)
  
  if(airshipPair.collisionType == COLLISION_TYPES.INTERSECTING_EQ_90_DEGREES) {
    airshipPair.fastest().setAccelerateTo(maxSpeed)
    airshipPair.slowest().setAccelerateTo(minSpeed)
    
    const distanceToCollisionPoint = airshipPair.fastest().speed.value * getMinTimeToDanger()
    
    const tempPoint = airshipPair.checkIntersection().point
    const temp2Point = new Cartesian(tempPoint.x, tempPoint.y)
    const safePoint = temp2Point.pointInDirection(distanceToCollisionPoint/2, airshipPair.fastest().direction.opposite()) 

    return airshipPair.slowest().goToNeverTeleport(safePoint)
  }
  if(airshipPair.collisionType == COLLISION_TYPES.INTERSECTING_GT_90_DEGREES) {
    airshipPair.fastest().setAccelerateTo(maxSpeed)
    airshipPair.slowest().setAccelerateTo(minSpeed)
    
    const distanceToCollisionPoint = airshipPair.fastest().speed.value * getMinTimeToDanger()
    
    const tempPoint = airshipPair.checkIntersection().point
    const temp2Point = new Cartesian(tempPoint.x, tempPoint.y)
    const safePoint = temp2Point.pointInDirection(distanceToCollisionPoint/2, airshipPair.fastest().direction.opposite()) 

    return airshipPair.slowest().goToNeverTeleport(safePoint)
  }
  if(airshipPair.collisionType == COLLISION_TYPES.INTERSECTING_LT_90_DEGREES) {
    airshipPair.fastest().setAccelerateTo(maxSpeed)
    airshipPair.slowest().setAccelerateTo(minSpeed)
    
    const distanceToCollisionPoint = airshipPair.fastest().speed.value * getMinTimeToDanger()
    
    const tempPoint = airshipPair.checkIntersection().point
    const temp2Point = new Cartesian(tempPoint.x, tempPoint.y)
    const safePoint = temp2Point.pointInDirection(distanceToCollisionPoint/2, airshipPair.fastest().direction.opposite()) 

    return airshipPair.slowest().goToNeverTeleport(safePoint)
  }
}