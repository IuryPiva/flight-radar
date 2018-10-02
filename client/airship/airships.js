const { randomFlightId } = require('../random')
const { cell } = require('../radar/grid')
const sprite = document.createElement('IMG')
sprite.src = "black-plane.png"

module.exports = [
  {
    id: randomFlightId(),
    width: 32,
    height: 32,
    x: Math.random() * (3 - (-3) + 1) + (-3),
    y: Math.random() * (3 - (-3) + 1) + (-3),
    z: Math.random() * (420 - (350) + 1) + (350),
    direction: Math.floor(Math.random() * 360),
    speed: Math.random() * cell.width / 4,
    sprite,
    info: false,
  },
  {
    id: randomFlightId(),
    width: 32,
    height: 32,
    x: Math.random() * (3 - (-3) + 1) + (-3),
    y: Math.random() * (3 - (-3) + 1) + (-3),
    z: Math.random() * (420 - (350) + 1) + (350),
    direction: Math.floor(Math.random() * 360),
    speed: Math.random() * cell.width / 4,
    sprite,
    info: false,
  },
  {
    id: randomFlightId(),
    width: 32,
    height: 32,
    x: Math.random() * (3 - (-3) + 1) + (-3),
    y: Math.random() * (3 - (-3) + 1) + (-3),
    z: Math.random() * (420 - (350) + 1) + (350),
    direction: Math.floor(Math.random() * 360),
    speed: Math.random() * cell.width / 4,
    sprite,
    info: false,
  },
  {
    id: randomFlightId(),
    width: 32,
    height: 32,
    x: Math.random() * (3 - (-3) + 1) + (-3),
    y: Math.random() * (3 - (-3) + 1) + (-3),
    z: Math.random() * (420 - (350) + 1) + (350),
    direction: Math.floor(Math.random() * 360),
    speed: Math.random() * cell.width / 4,
    sprite,
    info: false,
  },
]