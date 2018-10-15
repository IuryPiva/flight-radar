import { Airship } from "../airship/airship";
import { AirshipPair } from "../airship/airships";
import { getMinDistanceAirships, getMinDistanceAirport, getMinTimeToDanger } from "./collision-avoidance/variables";

export class Feedback {
  rightCol: JQuery<HTMLElement> =  $('#right-col')
  
  showAirshipCloseToAirportInfo(airship: Airship) {
    this.rightCol.append(
      `<div id="${airship.id}info" class="alert alert-info" role="alert">
        <strong>Aproximação ao aeroporto!</strong> O avião ${airship.id} está a menos de ${getMinDistanceAirport()}km do aeroporto.
      </div>`
    )
  }
  hideAirshipCloseToAirportInfo(airship: Airship) {
    $(`#${airship.id}info`).remove()
  }

  showAirshipGoingToCollideWithAirport(airship: Airship) {
    this.rightCol.append(
      `<div id="${airship.id}secondary" class="alert alert-secondary" role="alert">
        <strong>Em direção ao aeroporto!</strong> O avião ${airship.id} está indo em direção ao aeroporto.
      </div>`
    )
  }
  hideAirshipGoingToCollideWithAirport(airship: Airship) {
    $(`#${airship.id}secondary`).remove()
  }

  showAirshipCloseToAirshipWarning(airshipPair: AirshipPair) {
    this.rightCol.append(
      `<div id="${airshipPair.id}warning" class="alert alert-warning" role="alert">
        <strong>Aproximação de aviões!</strong> O avião ${airshipPair.first.id} e o ${airshipPair.second.id} estão a menos de ${getMinDistanceAirships()}km um do outro.
      </div>`
    )
  }
  hideAirshipCloseToAirshipWarning(airshipPair: AirshipPair) {
    $(`#${airshipPair.id}warning`).remove()
  }

  showAirshipsGoingToCollide(airshipPair: AirshipPair) {
    this.rightCol.append(
      `<div id="${airshipPair.id}danger" class="alert alert-danger" role="alert">
        <strong>Colisão de aviões!</strong> O avião ${airshipPair.first.id} e o ${airshipPair.second.id} estão em perigo de colisão, seus trajetos diferem em menos de ${getMinTimeToDanger()} segundos.
      </div>`
    )
  }
  hideAirshipsGoingToCollide(airshipPair: AirshipPair) {
    $(`#${airshipPair.id}danger`).remove()
  }
}