import { Airship } from "../../../airship/airship";
import { randomCartesian, randomDegrees, randomKilometresPerHour } from "../../../random";

export const testAirshipsRandom =  [
  new Airship(
    randomCartesian(),
    randomDegrees(),
    randomKilometresPerHour()
  ),
  new Airship(
    randomCartesian(),
    randomDegrees(),
    randomKilometresPerHour()
  )
]