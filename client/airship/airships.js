const { randomFlightId } = require('../random')
module.exports = [
  {
    id: randomFlightId(),
    width: 32,
    height: 32,
    x: Math.random() * (3 - (-3) + 1) + (-3),
    y: Math.random() * (3 - (-3) + 1) + (-3),
    z: Math.random() * (420 - (350) + 1) + (350),
    direction: Math.floor(Math.random() * 360),
    speed: Math.random() * 0.277778,
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
    speed: Math.random() * 0.277778,
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
    speed: Math.random() * 0.277778,
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
    speed: Math.random() * 0.277778,
    info: false,
  },
]