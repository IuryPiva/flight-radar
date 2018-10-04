const $ = require('jquery')
const rightCol = $('#right-col')

function showAirshipCloseToAirportInfo(airship) {
  rightCol.append(
    `<div id="${airship.id}info" class="alert alert-info" role="alert">
      <strong>Aproximação ao aeroporto!</strong> O avião ${airship.id} está a menos de ${window.getMinDistanceAirport()}km do aeroporto.
    </div>`
  )
}

function hideAirshipCloseToAirportInfo(airship) {
  $(`#${airship.id}info`).remove()
}

function showAirshipCloseToAirshipWarning(combinedAirships) {
  rightCol.append(
    `<div id="${combinedAirships.first.id}${combinedAirships.second.id}warning" class="alert alert-warning" role="alert">
      <strong>Aproximação de aviões!</strong> O avião ${combinedAirships.first.id} e o ${combinedAirships.second.id} estão a menos de ${window.getMinDistanceAirships()}km um do outro.
    </div>`
  )
}

function hideAirshipCloseToAirshipWarning(combinedAirships) {
  $(`#${combinedAirships.first.id}${combinedAirships.second.id}warning`).remove()
}

{/* <strong>Colisão de aviões!</strong> O avião ${combinedAirships.first.id} e o ${combinedAirships.second.id} irão colidir em aproximadamente <b id="${combinedAirships.first.id}${combinedAirships.second.id}b">${combinedAirships.timeToCollide.toFixed(2)}</b> segundos. */}
function showAirshipsGoingToCollide(combinedAirships) {
  rightCol.append(
    `<div id="${combinedAirships.first.id}${combinedAirships.second.id}danger" class="alert alert-danger" role="alert">
      <strong>Colisão de aviões!</strong> O avião ${combinedAirships.first.id} e o ${combinedAirships.second.id} estão em perigo de colisão, seus trajetos diferem em menos de ${window.getMinTime()} segundos.
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