import { Cartesian } from "../utils/coordinate";
import { FPS } from "../canvas";
import { Airship } from "./airship";
import { Grid } from "../radar/grid";

function animateAirships(airships: Airship[], grid: Grid) {
  airships.forEach(airship => {
    // rotationAnimation(airship)

    airship.accelerate()
    airship.moveToNextPosition()
    airship.turn
    getNextDirection(airship)

    if (bounce) {
      const pixels = airship.position.toPixelCoordinate(grid)
      let bounce = false
      // HITTING RIGHT WALL
      if (pixels.x + airship.width / 2 > canvas.width) {
        const newDirection = Math.floor(Math.random() * (270 - 90 + 1) + 90)
        airship.direction = newDirection
      } else
        // HITTING LEFT WALL
      if (pixels.x < airship.width / 2) {
        const newDirection = ((Math.floor(Math.random() * (270 - 90 + 1) + 90) + 180) % 360)
        airship.direction = newDirection
      } else
      // HITTING BOTTOM WALL
      if (pixels.y + airship.height / 2 > canvas.height) {
        const newDirection = Math.floor(Math.random() * 180)
        airship.direction = newDirection
      } else
      // HITTING TOP WALL
      if (pixels.y < airship.height / 2) {
        const newDirection = Math.floor(Math.random() * (360 - 180 + 1) + 180)
        airship.direction = newDirection
      }
    }
  })
}

function rotationAnimation(airship) {
  const speed = airship.speed * 1000 // m/s
  const radius = Math.pow(speed, 2) / (9.8 * Math.tan(airship.bankAngle * Math.PI / 180)) // m
  const rateOfTurn = 5.25 * 5 // degrees per second
  const x = airship.x + radius / 1000 * (Math.cos(Math.abs(airship.direction + 45 - 360) * Math.PI / 180)),
    y = airship.y + radius / 1000 * -(Math.sin(Math.abs(airship.direction + 45 - 360) * Math.PI / 180))
  rotate(airship, { x, y, angle: rateOfTurn / FPS })
  airship.direction = Math.abs((airship.direction + rateOfTurn / FPS) % 360)
}

export function directionToPoint(airship, point) {
  const pointClone = Object.assign({}, point)
  pointClone.x -= airship.x
  pointClone.y -= airship.y
  const result = Math.atan2(pointClone.y, pointClone.x) * 180 / Math.PI
  if (result > 0) {
    return result
  } else if (result < 0) {
    return result + 360
  } else return 0
}

function getNextDirection(airship) {
  const rateOfTurn = 5.25 // degrees per second
  if (airship.changeDirectionTo === null) {
    return false
  } else {
    let difference = directionToPoint(airship, airship.changeDirectionTo) - airship.direction
    if (difference < 0) difference += 360
    if (difference > 0 && difference <= 180) {
      // VIRANDO SENTINDO ANTIHORÁRIO
      const airshipClone = Object.assign({}, airship)
      airshipClone.direction = (airshipClone.direction + rateOfTurn / FPS) % 360
      difference = directionToPoint(airshipClone, airship.changeDirectionTo) - airshipClone.direction
      if (difference < 0) difference += 360
      if (difference == 0 || difference > 359 || difference < 1) {
        airship.direction = directionToPoint(airship, airship.changeDirectionTo)
        airship.changeDirectionTo = null
      } else {
        airship.direction = airshipClone.direction
      }
    }
    else
      if (difference > 180 && difference < 360) {
        // VIRANDO SENTIDO HORÁRIO
        const airshipClone = Object.assign({}, airship)
        airshipClone.direction = (airshipClone.direction - rateOfTurn / FPS) < 0 ? 360 - (airshipClone.direction - rateOfTurn / FPS) : (airshipClone.direction - rateOfTurn / FPS)
        difference = directionToPoint(airshipClone, airship.changeDirectionTo) - airshipClone.direction
        if (difference < 0) difference += 360
        if (difference == 0 || difference > 359 || difference < 1) {
          airship.direction = directionToPoint(airship, airship.changeDirectionTo)
          airship.changeDirectionTo = null
        } else {
          airship.direction = airshipClone.direction
        }
      } else
        if (directionToPoint(airship, airship.changeDirectionTo) - airship.direction == 0) {
          airship.changeDirectionTo = null
        }
  }
}

module.exports = {
  animateAirships
}
