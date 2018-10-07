const grid = require('./radar/grid')

function combinatory(airships) {
  const result = []
  for (let i = 0; i < airships.length - 1; i++) {
    for (let j = i + 1; j < airships.length; j++) {
      result.push({
        first: airships[i],
        second: airships[j],
        id: airships[i].id+airships[j]
      })
    }
  }
  return result
}
function round(num) {
  return Math.round(num * 100) / 100;
}

function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}

function degreesToRadians(degree) {
  return degree * Math.PI / 180;
}
module.exports = {
  coordinatesToPx: (x, y) => {
    return {
      x: grid.center.x + (x * grid.cell.width),
      y: grid.center.y + (y * grid.cell.height) * (-1)
    }
  },
  combinatory,
  round,
  radiansToDegrees,
  degreesToRadians,
  cartToPolar: (cart) => {
    return {
      radius: Math.sqrt(Math.pow(cart.x, 2) + Math.pow(cart.y, 2)),
      angle: radiansToDegrees(Math.atan2(cart.y, cart.x))
    }
  },

  polarToCart: (polar) => {
    const rad = degreesToRadians(polar.angle)
    const cosRad = round(Math.cos(rad))
    const sinRad = round(Math.sin(rad))
    return {
      y: polar.radius * sinRad,
      x: polar.radius * cosRad
    }
  }
}