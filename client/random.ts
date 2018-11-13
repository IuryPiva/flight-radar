import { Cartesian } from "./utils/coordinate";
import { Degrees } from "./utils/math";
import { KilometresPerHour } from "./utils/speed";
import { Airship } from "./airship/airship";

const hex = '0123456789abcdef'.split('')

function rand () {
  return Math.floor(Math.random() * 16)
}

function randomLetter () {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]
}

function randomFloorNumber (input = 9) {
  return Math.floor(Math.random() * input)
}
function randomNumber (input = 9) {
  return Math.random() * input
}

export function randomHexColor(): string {
  return `#${hex[rand()]}${hex[rand()]}${hex[rand()]}${hex[rand()]}${hex[rand()]}${hex[rand()]}`
}

export function randomFlightId (): string {
  return `${randomLetter()}${randomLetter()}${randomLetter()}${randomFloorNumber()}${randomFloorNumber()}${randomFloorNumber()}`
}

export function randomCartesian(): Cartesian {
  return new Cartesian(randomNumber(5), randomNumber(5))
}

export function randomDegrees() {
  return new Degrees(randomNumber(360))
}

export function randomKilometresPerHour() {
  return new KilometresPerHour(randomNumber(1111.26))
}
export function randomAirship() {
  return new Airship(
    randomCartesian(),
    randomDegrees(),
    randomKilometresPerHour()
  )
}
/**
 * 
 * @param percentage input 20% should be 20
**/
export function randomByChance(percentage: number) {
  return Math.floor(Math.random() * 100) < percentage
}
