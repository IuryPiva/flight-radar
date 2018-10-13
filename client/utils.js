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

module.exports = {
}