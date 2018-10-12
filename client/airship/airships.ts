import { Airship } from "./airship";

export class Airships {
  airships: Airship[]
  
  add(airship: Airship) {
    this.airships.push(airship)
  }

  getAirshipById(id: string) {
    return this.airships.find(airship => airship.id == id)
  }
  getAll() {
    return this.airships
  }
}