const airships = require('../airship/airships')
const { combinatory } = require('../utils')
const tracker = require('./tracker')

function drawTable() {
  const tableBody = document.getElementById('table-body')
  tableBody.innerHTML = ''
  airships.forEach(airship => {
    const html = `
        <tr>
          <th scope="row">${airship.id}</th>
          <td>${Number(airship.x.toFixed(1))}, ${Number(airship.y.toFixed(1))}</td>
          <td>${Number(airship.direction.toFixed(1))}°</td>
          <td>${Number(airship.speed.toFixed(1))}</td>
          <td>${Number(airship.z.toFixed(1))}</td>
        </tr>`
    tableBody.innerHTML += html
  })
  setTimeout(drawTable, 1000)
}

module.exports = {
  drawTable
}