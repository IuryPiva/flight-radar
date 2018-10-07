const airships = require('../airship/airships')
const $ = require('jquery')
window.jQuery = $
require('jquery-ui')
let drawn = false
let hoveringOver = []
let selected = []

window.hovering = function(event) {
  setHoveringOver(event.id)
}

function setHoveringOver(id) {
  hoveringOver.push(id)
}

function getHoveringOver() {
  return hoveringOver
}

window.getSelected= () => {
  return selected
}

function deleteHoveringOver(id) {
  hoveringOver.splice( hoveringOver.indexOf(id), 1 )
}

window.leaveHovering= function (event) {
  deleteHoveringOver(event.id)
}

window.rowClick = (event) => {
  jQuery(`#${event.id}`).toggleClass('table-dark')
  if(selected.includes(event.id)) {
    selected.splice( selected.indexOf(event.id), 1)
  } else {
    selected.push(event.id)
  }
  buttonsControl()
}

function buttonsControl(){
  if(selected.length > 0) {
    $('.auto-disabled').prop('disabled', false)
  } else   $('.auto-disabled').prop('disabled', true)
}

function firstDraw() {
  drawn = true
  const tableBody = document.getElementById('table-body')
  tableBody.innerHTML = ''
  airships.forEach(airship => {
    const html = `
        <tr id="${airship.id}" onmouseover="window.hovering(this)" onclick="window.rowClick(this)"  onmouseout="window.leaveHovering(this)">
          <th scope="row">${airship.id}</th>
          <td id="${airship.id}position">${Number(airship.x.toFixed(1))}, ${Number(airship.y.toFixed(1))}</td>
          <td id="${airship.id}direction">${Number(airship.direction.toFixed(1))}°</td>
          <td id="${airship.id}speed">${Number((airship.speed * 60 * 60).toFixed(1))}</td>
          <td id="${airship.id}altitude">${Number(airship.z.toFixed(1))}</td>
        </tr>`
    tableBody.innerHTML += html
  })
}

function updateTable() {
  airships.forEach(airship => {
    const position = $(`#${airship.id}position`)
    position[0].innerHTML = `${Number(airship.x.toFixed(1))}, ${Number(airship.y.toFixed(1))}`
    const direction = $(`#${airship.id}direction`)
    direction[0].innerHTML = `${Number(airship.direction.toFixed(1))}°`
    const speed = $(`#${airship.id}speed`)
    speed[0].innerHTML = `${Number((airship.speed * 60 * 60).toFixed(1))}`
    const altitude = $(`#${airship.id}altitude`)
    altitude[0].innerHTML = `${Number(airship.z.toFixed(1))}`
  })
}

function drawTable() {
  drawn ? updateTable() : firstDraw()
  setTimeout(drawTable, 50)
}

module.exports = {
  drawTable,
  getHoveringOver,
  selected
}