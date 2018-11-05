import { AirshipPair } from "../../airship/airships";
import { equalsWithErrorMargin } from "../../utils/math";
import { KilometresPerHour } from "../../utils/speed";
import { getMinTimeToDanger } from "./variables";
import { Cartesian } from "../../utils/coordinate";

const maxSpeed = new KilometresPerHour(9999)
const minSpeed = new KilometresPerHour(0)

export function avoidCollision(airshipPair: AirshipPair) {
  if(airshipPair.avoidCollisionMode.on) return
  console.log(airshipPair.angleBetween());
  
  if(equalsWithErrorMargin(airshipPair.angleBetween(), 90, 1/100)) {
    airshipPair.setCollisionMode(true)
    airshipPair.fastest().setAccelerateTo(maxSpeed)
    airshipPair.slowest().setAccelerateTo(minSpeed)
    
    const distanceToCollisionPoint = airshipPair.fastest().speed.value * getMinTimeToDanger()
    
    const tempPoint = airshipPair.checkIntersection().point
    const temp2Point = new Cartesian(tempPoint.x, tempPoint.y)
    const safePoint = temp2Point.pointInDirection(distanceToCollisionPoint/2, airshipPair.fastest().direction.opposite()) 

    return airshipPair.slowest().goToNeverTeleport(safePoint)
  }
  if(airshipPair.angleBetween() > 90) {
    airshipPair.setCollisionMode(true)
    airshipPair.fastest().setAccelerateTo(maxSpeed)
    airshipPair.slowest().setAccelerateTo(minSpeed)
    
    const distanceToCollisionPoint = airshipPair.fastest().speed.value * getMinTimeToDanger()
    
    const tempPoint = airshipPair.checkIntersection().point
    const temp2Point = new Cartesian(tempPoint.x, tempPoint.y)
    const safePoint = temp2Point.pointInDirection(distanceToCollisionPoint/2, airshipPair.fastest().direction.opposite()) 

    return airshipPair.slowest().goToNeverTeleport(safePoint)
  }
  if(airshipPair.angleBetween() < 90) {
    airshipPair.setCollisionMode(true)
    airshipPair.fastest().setAccelerateTo(maxSpeed)
    airshipPair.slowest().setAccelerateTo(minSpeed)
    
    const distanceToCollisionPoint = airshipPair.fastest().speed.value * getMinTimeToDanger()
    
    const tempPoint = airshipPair.checkIntersection().point
    const temp2Point = new Cartesian(tempPoint.x, tempPoint.y)
    const safePoint = temp2Point.pointInDirection(distanceToCollisionPoint/2, airshipPair.fastest().direction.opposite()) 

    return airshipPair.slowest().goToNeverTeleport(safePoint)
  }
}