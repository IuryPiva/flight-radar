const airport = { x:0, y:0 }
const $ = require('jquery')
const grid = require('../radar/grid')
const airships = require('../airship/airships')

function distance(a, b) {
  return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2))
}

function getDistanceFromAirport(airship) {
  return distance(airship, airport)
}

function isCloseToAirport(airship) {
  if(getDistanceFromAirport(airship) < 2 && !airship.info) {
    airship.info = true
    showAirshipCloseToAirportInfo(airship)
  } else if(getDistanceFromAirport(airship) > 2 && airship.info) {
    airship.info = false
    hideAirshipCloseToAirportInfo(airship)
  }
}

function showAirshipCloseToAirportInfo(airship) {
  const rightCol = $('#right-col')
  rightCol.append(
    `<div id="${airship.id}info" class="alert alert-info" role="alert">
      <strong>Aproximação ao aeroporto!</strong> O avião ${airship.id} está a menos de ${ 2 * grid.cell.width }m do aeroporto.
    </div>`
  )
}

function hideAirshipCloseToAirportInfo(airship) {
  $(`#${airship.id}info`).remove()
}

function trackThem() {
  airships.forEach(airship => isCloseToAirport(airship))
  setTimeout(trackThem, 10)
}
module.exports = {
  trackThem
}