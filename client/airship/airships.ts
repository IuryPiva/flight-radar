import { Airship } from "./airship";
import { Cartesian } from "../utils/coordinate";
import { KilometresPerHour } from "../utils/speed";
import { Degrees } from "../utils/math";

export class Airships {
  airships: Airship[]

  constructor (airships: Airship[]) {
    this.airships = airships
  }
  
  add(airship: Airship) {
    this.airships.push(airship)
  }

  getAirshipById(id: string) {
    return this.airships.find(airship => airship.id == id)
  }

  getAll() {
    return this.airships
  }

  setAll(position: Cartesian, direction: Degrees, speed: KilometresPerHour) {
    this.getAll().forEach( (airship: Airship) => {
      airship.set(position, direction, speed)
    })
  }

  getSelected(): Airships {
    return new Airships(this.airships.filter(airship => airship.isSelected))
  }
}