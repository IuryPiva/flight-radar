import { Airship } from "../../../airship/airship";
import { Cartesian } from "../../../utils/coordinate";
import { Degrees } from "../../../utils/math";
import { KilometresPerHour } from "../../../utils/speed";

export const testCollisionAirships45Degrees =  [
  new Airship(
    new Cartesian(0,3),
    new Degrees(270),
    new KilometresPerHour(800)
  ),
  new Airship(
    new Cartesian(2.5,2.5),
    new Degrees(225),
    new KilometresPerHour(800)
  )
]