import { Airships } from "./airships";
import { Polar, Cartesian } from "../utils/coordinate";
import { Degrees } from "../utils/math";
import { KilometresPerHour } from "../utils/speed";
import { Airship } from "./airship";
import { getNumberFromInput } from "../utils/document";

export function addControlPanelEventListeners (airships: Airships) {
  document.getElementById('inserirCart').addEventListener('submit', () => {
    const x = getNumberFromInput('inserir-x')
    const y = getNumberFromInput('inserir-y')
  
    const direction = getNumberFromInput('inserir-direcao')
    const speed = getNumberFromInput('inserir-velocidade')
  
    airships.add(new Airship(
      new Cartesian(x, y),
      new Degrees(direction),
      new KilometresPerHour(speed)
    ))
  })

  document.getElementById('inserirPolar').addEventListener('submit', () => {
    const radius = getNumberFromInput('inserir-raio')
    const angle = getNumberFromInput('inserir-angulo')
  
    const direction = getNumberFromInput('inserir-polar-direcao')
    const speed = getNumberFromInput('inserir-polar-velocidade')
    
    airships.add(new Airship(
      new Polar(radius, new Degrees(angle)).toCartesian(),
      new Degrees(direction),
      new KilometresPerHour(speed)
    ))
  })

  document.getElementById('modificarCart').addEventListener('submit', () => {
    const x = getNumberFromInput('modificar-x')
    const y = getNumberFromInput('modificar-y')
    
    const direction = getNumberFromInput('modificar-direcao')
    const speed = getNumberFromInput('modificar-velocidade')
  
    airships.getSelected().setAll(
      new Cartesian(x, y),
      new Degrees(direction),
      new KilometresPerHour(speed)
    )
  })

  document.getElementById('modificarPolar').addEventListener('submit', () => {
    const radius = getNumberFromInput('modificar-raio')
    const angle = getNumberFromInput('modificar-angulo')
  
    const direction = getNumberFromInput('modificar-polar-direcao')
    const speed = getNumberFromInput('modificar-polar-velocidade')
  
    airships.getSelected().setAll(
      new Polar(radius, new Degrees(angle)).toCartesian(),
      new Degrees(direction),
      new KilometresPerHour(speed)
    )
  })
}