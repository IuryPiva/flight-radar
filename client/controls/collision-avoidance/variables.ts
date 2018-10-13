import { getNumberFromInput } from "../../utils/document";

export function getMinTimeToDanger () {
  return getNumberFromInput('minTimeToDanger')
}
(window as any).getMinTimeToDanger = getMinTimeToDanger

export function getMinDistanceAirport() {
  return getNumberFromInput('minDistanceAirport')
}
(window as any).getMinDistanceAirport = getMinDistanceAirport

export function getMinDistanceAirships() {
  return getNumberFromInput('minDistanceAirships')
}

(window as any).getMinDistanceAirships = getMinDistanceAirships
