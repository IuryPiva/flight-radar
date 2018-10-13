import { Airships } from "../airship/airships";
import { Cartesian } from "../utils/coordinate";
import { Airship } from "../airship/airship";
import { Degrees } from "../utils/math";

export function translate(airships: Airships, point: Cartesian) {
  airships.getSelected().getAll().forEach(
    (airship: Airship) => {
      point.translate(airship.position)
      airship.goTo(point)
    }
  )
}

function scale(airships: Airships, point: Cartesian){
  airships.getSelected().getAll().forEach(
    (airship: Airship) => {
      point.scale(airship.position)
      airship.goTo(point)
    }
  )
}

function rotate(airships: Airships, point: Cartesian, angle: Degrees){
  airships.getSelected().getAll().forEach(
    (airship: Airship) => {
      const resultantPosition = Object.assign({}, airship.position)

      resultantPosition.reduce(point)

      resultantPosition.rotate(angle)

      resultantPosition.translate(point)

      airship.goTo(resultantPosition)
    }
  )
}

function checkNewPosition(resultantPosition, airship){
  if(resultantPosition.x > grid.size.x || resultantPosition.x < -grid.size.x || resultantPosition.y > grid.size.y || resultantPosition.y < -grid.size.y) {
    if(window.confirm(`O avião ${airship.id} vai para fora do campo visivel (${resultantPosition.x},${resultantPosition.y}), deseja continuar?`)) {
      airship.x = resultantPosition.x
      airship.y = resultantPosition.y
    }
    return false
  }
  else {
    airship.x = resultantPosition.x
    airship.y = resultantPosition.y
  }
}

function maxSpeed(airship, point) {
  airship.x -= point.x
  airship.y -= point.y
  const original = Object.assign({}, airship)
  airship.x = airship.x * Math.cos(degreesToRadians(point.angle)) - (airship.y * Math.sin(degreesToRadians(point.angle)))
  airship.y = original.x * Math.sin(degreesToRadians(point.angle)) + (airship.y * Math.cos(degreesToRadians(point.angle)))
  airship.x += point.x
  airship.y += point.y
}

module.exports = {
  rotate
}

window.transladar = () => {
  const point = {
    x: Number(document.getElementById('transladar-x').value),
    y: Number(document.getElementById('transladar-y').value)
  }
  selected.forEach(airshipId => {
    const airship = getAirshipById(airshipId)
    translate(airship, point)
  })
}
window.escalonar = () => {
  const point = {
    x: Number(document.getElementById('escalonar-x').value),
    y: Number(document.getElementById('escalonar-y').value)
  }
  selected.forEach(airshipId => {
    const airship = getAirshipById(airshipId)
    scale(airship, point)
  })
}
window.rotacionar = () => {
  const point = {
    x: Number(document.getElementById('rotacionar-x').value),
    y: Number(document.getElementById('rotacionar-y').value),
    angle: Number(document.getElementById('rotacionar-angulo').value)
  }
  selected.forEach(airshipId => {
    const airship = getAirshipById(airshipId)
    rotate(airship, point)
  })
}