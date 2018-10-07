const { randomFlightId } = require('../random')
const { polarToCart } = require('../utils')

const airships = [
  {
    id: randomFlightId(),
    width: 32,
    height: 32,
    x: 0.1,
    y: 0,
    z: Math.random() * (420 - (350) + 1) + (350),
    direction: Math.floor(Math.random() * 360),
    speed: 0,
    blinks: 0,
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
    blinks: 0,
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
    blinks: 0,
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
    blinks: 0,
  },
]


function addAirship(airship) {
  const tableBody = document.getElementById('table-body')
  tableBody.innerHTML += `
      <tr id="${airship.id}" onmouseover="window.hovering(this)" onclick="window.rowClick(this)"  onmouseout="window.leaveHovering(this)">
        <th scope="row">${airship.id}</th>
        <td id="${airship.id}position">${Number(airship.x.toFixed(1))}, ${Number(airship.y.toFixed(1))}</td>
        <td id="${airship.id}direction">${Number(airship.direction.toFixed(1))}°</td>
        <td id="${airship.id}speed">${Number((airship.speed * 60 * 60).toFixed(1))}</td>
        <td id="${airship.id}altitude">${Number(airship.z.toFixed(1))}</td>
      </tr>`
  airships.push(airship)
}

window.inserirCart = () => {
  const x = Number(document.getElementById('inserir-x').value)
  const y = Number(document.getElementById('inserir-y').value)

  const direction = Number(document.getElementById('inserir-direcao').value)
  const speed = Number(document.getElementById('inserir-velocidade').value)

  addAirship({
    id: randomFlightId(),
    width: 32,
    height: 32,
    x,
    y,
    z: Math.random() * (420 - (350) + 1) + (350),
    direction,
    speed: speed / 60 / 60,
    blinks: 0
  })
}
window.inserirPolar = () => {
  const radius = Number(document.getElementById('inserir-raio').value)
  const angle = Number(document.getElementById('inserir-angulo').value)

  const cart = polarToCart({ radius, angle })

  const direction = Number(document.getElementById('inserir-polar-direcao').value)
  const speed = Number(document.getElementById('inserir-polar-velocidade').value)

  addAirship({
    id: randomFlightId(),
    width: 32,
    height: 32,
    x: cart.x,
    y: cart.y,
    z: Math.random() * (420 - (350) + 1) + (350),
    direction,
    speed: speed / 60 / 60,
    blinks: 0
  })
}

function getAirshipById(id) {
  return airships.find(airship => airship.id == id)
}

function modificarCart () {
  const x = Number(document.getElementById('modificar-x').value)
  const y = Number(document.getElementById('modificar-y').value)
  const direction = Number(document.getElementById('modificar-direcao').value)
  const speed = Number(document.getElementById('modificar-velocidade').value)

  const selected = window.getSelected()
  selected.forEach(airshipId => {
    const airship = getAirshipById(airshipId)
    airship.x = x
    airship.y = y
    airship.direction = direction
    airship.speed = speed
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
    airship.x = cart.x
    airship.y = cart.y
    airship.direction = direction
    airship.speed = speed
  })
}
window.modificarPolar = modificarPolar

module.exports = airships