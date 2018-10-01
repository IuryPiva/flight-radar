const airships = require('./airships')
const grid = require('../radar/grid')
const { canvas, FPS } = require('../canvas')
const { coordinatesToPx } = require('../utils')

function getNextPosition(airship) {
  return { 
    x : airship.x + airship.speed/grid.cell.width/FPS * (Math.cos(airship.direction * Math.PI / 180)),
    y : airship.y + airship.speed/grid.cell.height/FPS * -(Math.sin(airship.direction * Math.PI / 180))
  }
}

function animateAirships() {
  airships.forEach(airship => {
    const nextPosition = getNextPosition(airship)
    const pixels = coordinatesToPx(nextPosition.x , nextPosition.y)

    // CURVA ALEATÓRIA
    // airship.direction += Math.random() * (3 - (-4) + 1) + (-4)

    // HITTING RIGHT WALL
    if(pixels.x + airship.width/2 > canvas.width) {
      const newDirection = Math.floor(Math.random() * (270 - 90+1) + 90)
      airship.direction = newDirection
    } else
    // HITTING LEFT WALL
    if (pixels.x < airship.width/2) {
      const newDirection = ((Math.floor(Math.random() * (270 - 90+1) + 90) + 180) % 360)
      airship.direction = newDirection
    } else
    // HITTING BOTTOM WALL
    if(pixels.y + airship.height/2 > canvas.height) {
      const newDirection = Math.floor(Math.random() * 180)
      airship.direction = newDirection
    } else 
    // HITTING TOP WALL
    if(pixels.y < airship.height/2) {
      const newDirection = Math.floor(Math.random() * (360 - 180+1) + 180)
      airship.direction = newDirection
    }

    airship.x = nextPosition.x
    airship.y = nextPosition.y
  })
}

module.exports = {
  animateAirships
}