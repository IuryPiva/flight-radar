import { AirshipPair } from "../../airship/airships";
import { KilometresPerHour } from "../../utils/speed";

/**
 * @description monta o triangulo pegando o furthest point ahead e
 * a rotação desse ponto 45˚ em relação ao avião
 * 
 * @param airshipPair 
 */


/* 
quando um aviao encontra um aviao a sua esquerda ele vira para direita até estar seguro que seguir seu caminho anterior não colidirá
ligar o colissionmode?
*/

export function avoidCollisionPairs(airships) {
  airships.getPairs().forEach((airshipPair: AirshipPair) => {
    avoidCollision(airshipPair)
  })
}
let inFirstOnSecondRightTriangle = []
let inFirstOnSecondLeftTriangle = []
let inSecondOnFirstRightTriangle = []
let inSecondOnFirstLeftTriangle = []

const maxSpeed = new KilometresPerHour(9999)
const minSpeed = new KilometresPerHour(0)

export function avoidCollision(airshipPair: AirshipPair) {
  if (
    airshipPair.firstOnSecondRightTriangle() &&
    !inFirstOnSecondRightTriangle.includes(airshipPair.id)
  ) {
    inFirstOnSecondRightTriangle.push(airshipPair.id)
    airshipPair.first.setRightForever(false)
    airshipPair.first.setLeftForever(true)
  } else if(
    inFirstOnSecondRightTriangle.includes(airshipPair.id)
  ) {
    if(airshipPair.firstOnSecondRightTriangle()) return
    airshipPair.first.setLeftForever(false)
    inFirstOnSecondRightTriangle.splice(inFirstOnSecondRightTriangle.indexOf(airshipPair.id), 1)
  } else
  
  if (
    airshipPair.firstOnSecondLeftTriangle() &&
    !inFirstOnSecondLeftTriangle.includes(airshipPair.id)
  ) {
    inFirstOnSecondLeftTriangle.push(airshipPair.id)
    airshipPair.first.setRightForever(true)
    airshipPair.first.setLeftForever(false)
  } else if(
    inFirstOnSecondLeftTriangle.includes(airshipPair.id)
  ) {
    if(airshipPair.firstOnSecondLeftTriangle()) return
    airshipPair.first.setRightForever(false)
    inFirstOnSecondLeftTriangle.splice(inFirstOnSecondRightTriangle.indexOf(airshipPair.id), 1)
  } else
  
  if (
    airshipPair.secondOnFirstRightTriangle() &&
    !inSecondOnFirstRightTriangle.includes(airshipPair.id)
  ) {
    inSecondOnFirstRightTriangle.push(airshipPair.id)
    airshipPair.second.setRightForever(false)
    airshipPair.second.setLeftForever(true)
  } else if(
    inSecondOnFirstRightTriangle.includes(airshipPair.id)
  ) {
    if(airshipPair.secondOnFirstRightTriangle()) return
    airshipPair.second.setLeftForever(false)
    inSecondOnFirstRightTriangle.splice(inFirstOnSecondRightTriangle.indexOf(airshipPair.id), 1)
  } else
  
  if (
    airshipPair.secondOnFirstLeftTriangle() &&
    !inSecondOnFirstLeftTriangle.includes(airshipPair.id)
  ) {
    inSecondOnFirstLeftTriangle.push(airshipPair.id)
    airshipPair.second.setRightForever(true)
    airshipPair.second.setLeftForever(false)
  } else if(
    inSecondOnFirstLeftTriangle.includes(airshipPair.id)
  ) {
    if(airshipPair.secondOnFirstLeftTriangle()) return
    airshipPair.second.setRightForever(false)
    inSecondOnFirstLeftTriangle.splice(inFirstOnSecondRightTriangle.indexOf(airshipPair.id), 1)
  }
}
