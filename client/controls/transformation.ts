import { Airships } from "../airship/airships";
import { Cartesian } from "../utils/coordinate";
import { Airship } from "../airship/airship";
import { Degrees } from "../utils/math";
import { getNumberFromInput } from "../utils/document";
import { copyInstance } from "../utils/clone";

export function addTransformationEventListeners(airships: Airships) {
  document.getElementById('transladar').addEventListener('submit', (event) => {
    event.preventDefault()
    
    airships.getSelected().getAll().forEach(
      (airship: Airship) => {
        const point = new Cartesian(getNumberFromInput('transladar-x'),getNumberFromInput('transladar-y'))
        point.translate(airship.position)

        airship.goTo(point)
      }
    )
  })

  document.getElementById('escalonar').addEventListener('submit', (event) => {
    event.preventDefault()
    
    airships.getSelected().getAll().forEach(
      (airship: Airship) => {
        const point = new Cartesian(getNumberFromInput('escalonar-x'),getNumberFromInput('escalonar-y'))
        point.scale(airship.position)

        airship.goTo(point)
      }
    )
  })

  document.getElementById('rotacionar').addEventListener('submit', (event) => {
    event.preventDefault()
    
    airships.getSelected().getAll().forEach(
      (airship: Airship) => {
        const point = new Cartesian(getNumberFromInput('rotacionar-x'),getNumberFromInput('rotacionar-y'))
        const angle = new Degrees(getNumberFromInput('rotacionar-angulo'))
        const resultantPosition: Cartesian = copyInstance(airship.position)
        resultantPosition.reduce(point)
        resultantPosition.rotate(angle)
        resultantPosition.translate(point)

        airship.goTo(resultantPosition)
      }
    )
  })
}