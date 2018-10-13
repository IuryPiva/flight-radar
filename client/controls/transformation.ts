import { Airships } from "../airship/airships";
import { Cartesian } from "../utils/coordinate";
import { Airship } from "../airship/airship";
import { Degrees } from "../utils/math";
import { getNumberFromInput } from "../utils/document";

export function addTransformationEventListeners(airships: Airships) {
  document.getElementById('transladar').addEventListener('submit', () => {
    const point = new Cartesian(getNumberFromInput('transladar-x'),getNumberFromInput('transladar-y'))

    airships.getSelected().getAll().forEach(
      (airship: Airship) => {
        point.translate(airship.position)

        airship.goTo(point)
      }
    )
  })

  document.getElementById('escalonar').addEventListener('submit', () => {
    const point = new Cartesian(getNumberFromInput('escalonar-x'),getNumberFromInput('escalonar-y'))
    
    airships.getSelected().getAll().forEach(
      (airship: Airship) => {
        point.scale(airship.position)

        airship.goTo(point)
      }
    )
  })

  document.getElementById('rotacionar').addEventListener('submit', () => {
    const point = new Cartesian(getNumberFromInput('rotacionar-x'),getNumberFromInput('rotacionar-y'))
    const angle = new Degrees(getNumberFromInput('rotacionar-angulo'))
    
    airships.getSelected().getAll().forEach(
      (airship: Airship) => {
        const resultantPosition = Object.assign({}, airship.position)
        resultantPosition.reduce(point)
        resultantPosition.rotate(angle)
        resultantPosition.translate(point)

        airship.goTo(resultantPosition)
      }
    )
  })
}