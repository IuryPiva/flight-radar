const $ = require('jquery')
const rightCol = $('#right-col')
const grid = require('../radar/grid')

function showAirshipCloseToAirportInfo(airship) {
  rightCol.append(
    `<div id="${airship.id}info" class="alert alert-info" role="alert">
      <strong>Aproximação ao aeroporto!</strong> O avião ${airship.id} está a menos de ${2 * grid.cell.width}m do aeroporto.
    </div>`
  )
}

function hideAirshipCloseToAirportInfo(airship) {
  $(`#${airship.id}info`).remove()
}

function showAirshipCloseToAirshipWarning(combinedAirships) {
  rightCol.append(
    `<div id="${combinedAirships.first.id}${combinedAirships.second.id}warning" class="alert alert-warning" role="alert">
      <strong>Aproximação de aviões!</strong> O avião ${combinedAirships.first.id} e o ${combinedAirships.second.id} estão a menos de ${grid.cell.width}m um do outro.
    </div>`
  )
}

function hideAirshipCloseToAirshipWarning(combinedAirships) {
  $(`#${combinedAirships.first.id}${combinedAirships.second.id}warning`).remove()
}

function showAirshipsGoingToCollide(combinedAirships) {
  rightCol.append(
    `<div id="${combinedAirships.first.id}${combinedAirships.second.id}danger" class="alert alert-danger" role="alert">
      <strong>Colisão de aviões!</strong> O avião ${combinedAirships.first.id} e o ${combinedAirships.second.id} estão em rota de colisão.
    </div>`
  )
}

function hideAirshipsGoingToCollide(combinedAirships) {
  $(`#${combinedAirships.first.id}${combinedAirships.second.id}danger`).remove()
}

module.exports = {
  showAirshipCloseToAirportInfo,
  hideAirshipCloseToAirportInfo,
  showAirshipCloseToAirshipWarning,
  hideAirshipCloseToAirshipWarning,
  showAirshipsGoingToCollide,
  hideAirshipsGoingToCollide
}