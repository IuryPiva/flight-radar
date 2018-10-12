const { getAirshipById } = require('./airship')
const { polarToCart } = require('../utils')
const { randomFlightId } = require('../random')
const airships = require('./airships')

function addAirship() {
  airships.push(airship)
}

window.inserirCart = () => {
  const x = Number(document.getElementById('inserir-x').value)
  const y = Number(document.getElementById('inserir-y').value)

  const direction = Number(document.getElementById('inserir-direcao').value)
  const speed = Number(document.getElementById('inserir-velocidade').value)

  addAirship()
}
window.inserirPolar = () => {
  const radius = Number(document.getElementById('inserir-raio').value)
  const angle = Number(document.getElementById('inserir-angulo').value)

  const cart = polarToCart({ radius, angle })

  const direction = Number(document.getElementById('inserir-polar-direcao').value)
  const speed = Number(document.getElementById('inserir-polar-velocidade').value)

  addAirship({
    x: cart.x,
    y: cart.y,
    direction,
    speed: speed / 60 / 60,
  })
}

function modificarCart () {
  const x = Number(document.getElementById('modificar-x').value)
  const y = Number(document.getElementById('modificar-y').value)
  const direction = Number(document.getElementById('modificar-direcao').value)
  const speed = Number(document.getElementById('modificar-velocidade').value)

  const selected = window.getSelected()
  selected.forEach(airshipId => {
    const airship = getAirshipById(airshipId)
    airship.changeDirectionTo = { x, y }
    // airship.direction = direction
    // airship.speed = speed
    airship.accelerateTo = speed / 60 / 60
  })
}
window.modificarCart = modificarCart

function modificarPolar () {
  const radius = Number(document.getElementById('modificar-radius').value)
  const angle = Number(document.getElementById('modificar-angle').value)

  const cart = polarToCart({ radius, angle })

  
  const direction = Number(document.getElementById('modificar-polar-direcao').value)
  const speed = Number(document.getElementById('modificar-polar-velocidade').value)

  const selected = window.getSelected()
  selected.forEach(airshipId => {
    const airship = getAirshipById(airshipId)
    airship.changeDirectionTo = { x: cart.x, y: cart.y }
    // airship.direction = direction
    airship.accelerateTo = speed / 60 / 60
  })
}
window.modificarPolar = modificarPolar