import { Airship } from "../../../airship/airship";
import { Cartesian } from "../../../utils/coordinate";
import { Degrees } from "../../../utils/math";
import { KilometresPerHour } from "../../../utils/speed";

export const testAirshipsSameDirection =  [
  new Airship(
    new Cartesian(0,0),
    new Degrees(180),
    new KilometresPerHour(400)
  ),
  new Airship(
    new Cartesian(2,0),
    new Degrees(180),
    new KilometresPerHour(800)
  )
]