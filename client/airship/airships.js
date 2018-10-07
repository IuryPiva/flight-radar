const { randomFlightId } = require('../random')
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

window.inserir = () => {
  const x = Number(document.getElementById('inserir-x').value)
  const y = Number(document.getElementById('inserir-y').value)

  const radius = Number(document.getElementById('inserir-raio').value)
  const angle = Number(document.getElementById('inserir-angulo').value)

  const direction = Number(document.getElementById('inserir-direcao').value)
  const speed = Number(document.getElementById('inserir-velocidade').value)

  if (speed && direction && ((radius && angle) || (x && y))){
    
  }

  addAirship({
    id: randomFlightId(),
    width: 32,
    height: 32,
    x: ,
    y: ,
    z: Math.random() * (420 - (350) + 1) + (350),
    direction: ,
    speed: ,
    blinks: 0
  })
}

module.exports = airships