import { Airship } from "../airship/airship";

export class Table {
  drawn = false
  tableBody = document.getElementById('table-body')
  constructor () { }

  newRow (airship: Airship) {
    this.tableBody.innerHTML += `
      <tr id="${airship.id}" onmouseover="window.hovering(this)" onclick="window.rowClick(this)"  onmouseout="window.leaveHovering(this)">
        <th scope="row">${airship.id}</th>
        <td id="${airship.id}position">${airship.position.display()}</td>
        <td id="${airship.id}direction">${airship.direction.display()}</td>
        <td id="${airship.id}speed">${airship.speed.display}</td>
      </tr>`
  }
  updateRow (airship: Airship) {
    $(`#${airship.id}position`)[0].innerHTML = airship.position.display()
    $(`#${airship.id}direction`)[0].innerHTML = airship.direction.display()
    $(`#${airship.id}speed`)[0].innerHTML = airship.speed.display()
  }
}

(window as any).hovering = function(event) {
  setHoveringOver(event.id)
}

function setHoveringOver(id) {
  hoveringOver.push(id)
}

function getHoveringOver() {
  return hoveringOver
}

(window as any).getSelected = () => {
  return selected
}

function deleteHoveringOver(id) {
  hoveringOver.splice( hoveringOver.indexOf(id), 1 )
}

(window as any).leaveHovering = function (event) {
  deleteHoveringOver(event.id)
}

(window as any).rowClick = function (event) {
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