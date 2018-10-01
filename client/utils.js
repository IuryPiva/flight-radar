const grid = require('./radar/grid')

function combinatory(airships) {
  const result = []
  for(let i = 0; i < airships.length - 1; i++) {
    for(let j = i + 1; j < airships.length; j++) {
      result.push([
        airships[i],
        airships[j]
      ])
    }
  }
  return result
}

module.exports = {
  coordinatesToPx: (x, y) => {
    return {
      x: grid.center.x + (x * grid.cell.width),
      y: grid.center.y + (y * grid.cell.height)
    }
  },
  combinatory
}