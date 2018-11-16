import { AirshipPair } from "../../airship/airships";
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

export function avoidCollision(airshipPair: AirshipPair) {
  if (
    airshipPair.firstOnSecondRightTriangle() &&
    !inFirstOnSecondRightTriangle.includes(airshipPair.id)
  ) {
    inFirstOnSecondRightTriangle.push(airshipPair.id)
    airshipPair.first.setRightForever(airshipPair.angleBetween() > 90 ? false : true)
    airshipPair.first.setLeftForever(airshipPair.angleBetween() > 90 ? true : false)
  } else if(
    inFirstOnSecondRightTriangle.includes(airshipPair.id)
  ) {
    if(airshipPair.firstOnSecondRightTriangle()) return
    airshipPair.first.setLeftForever(false)
    airshipPair.first.setRightForever(false)
    inFirstOnSecondRightTriangle.splice(inFirstOnSecondRightTriangle.indexOf(airshipPair.id), 1)
  } else
  
  if (
    airshipPair.firstOnSecondLeftTriangle() &&
    !inFirstOnSecondLeftTriangle.includes(airshipPair.id)
  ) {
    inFirstOnSecondLeftTriangle.push(airshipPair.id)
    airshipPair.first.setRightForever(airshipPair.angleBetween() > 90 ? true : false)
    airshipPair.first.setLeftForever(airshipPair.angleBetween() > 90 ? false : true)
  } else if(
    inFirstOnSecondLeftTriangle.includes(airshipPair.id)
  ) {
    if(airshipPair.firstOnSecondLeftTriangle()) return
    airshipPair.first.setRightForever(false)
    airshipPair.first.setLeftForever(false)
    inFirstOnSecondLeftTriangle.splice(inFirstOnSecondRightTriangle.indexOf(airshipPair.id), 1)
  } else
  
  if (
    airshipPair.secondOnFirstRightTriangle() &&
    !inSecondOnFirstRightTriangle.includes(airshipPair.id)
  ) {
    inSecondOnFirstRightTriangle.push(airshipPair.id)
    airshipPair.second.setRightForever(airshipPair.angleBetween() > 90 ? false : true)
    airshipPair.second.setLeftForever(airshipPair.angleBetween() > 90 ? true : false)
  } else if(
    inSecondOnFirstRightTriangle.includes(airshipPair.id)
  ) {
    if(airshipPair.secondOnFirstRightTriangle()) return
    airshipPair.second.setLeftForever(false)
    airshipPair.second.setRightForever(false)
    inSecondOnFirstRightTriangle.splice(inFirstOnSecondRightTriangle.indexOf(airshipPair.id), 1)
  } else
  
  if (
    airshipPair.secondOnFirstLeftTriangle() &&
    !inSecondOnFirstLeftTriangle.includes(airshipPair.id)
  ) {
    inSecondOnFirstLeftTriangle.push(airshipPair.id)
    airshipPair.second.setRightForever(airshipPair.angleBetween() > 90 ? true : false)
    airshipPair.second.setLeftForever(airshipPair.angleBetween() > 90 ? false : true)
  } else if(
    inSecondOnFirstLeftTriangle.includes(airshipPair.id)
  ) {
    if(airshipPair.secondOnFirstLeftTriangle()) return
    airshipPair.second.setRightForever(false)
    airshipPair.second.setLeftForever(false)
    inSecondOnFirstLeftTriangle.splice(inFirstOnSecondRightTriangle.indexOf(airshipPair.id), 1)
  }
}
