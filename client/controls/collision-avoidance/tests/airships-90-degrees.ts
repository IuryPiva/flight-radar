import { Airship } from "../../../airship/airship";
import { Cartesian } from "../../../utils/coordinate";
import { Degrees } from "../../../utils/math";
import { KilometresPerHour } from "../../../utils/speed";

export const testCollisionAirships90Degrees =  [
  new Airship(
    new Cartesian(0,3),
    new Degrees(270),
    new KilometresPerHour(800)
  ),
  new Airship(
    new Cartesian(3,0),
    new Degrees(180),
    new KilometresPerHour(800)
  )
]