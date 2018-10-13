import { Airship } from "../airship/airship";
import { Airships } from "../airship/airships";

export class Table {
  drawn = false
  tableBody = document.getElementById('table-body')
  constructor () { }

  newRow (airship: Airship) {
    this.tableBody.innerHTML += `
      <tr id="${airship.id}" onmouseover="hovering(this)" onclick="rowClick(this)"  onmouseout="leaveHovering(this)">
        <th scope="row">${airship.id}</th>
        <td id="${airship.id}position">${airship.position.display()}</td>
        <td id="${airship.id}direction">${airship.direction.display()}</td>
        <td id="${airship.id}speed">${airship.speed.display}</td>
      </tr>`
    
    document.getElementById(`#${airship.id}`).addEventListener('click', () => {
      airship.isSelected = !airship.isSelected
    })
  }

  updateRow (airship: Airship) {
    $(`#${airship.id}position`)[0].innerHTML = airship.position.display()
    $(`#${airship.id}direction`)[0].innerHTML = airship.direction.display()
    $(`#${airship.id}speed`)[0].innerHTML = airship.speed.display()
  }
}

export function hovering (airships: Airships, event) {
  airships.getAirshipById(event.id).isHover = true
}

export function setHoveringOver(id) {
  hoveringOver.push(id)
}

export function getHoveringOver() {
  return hoveringOver
}

export function getSelected () {
  return selected
}

export function deleteHoveringOver(id) {
  hoveringOver.splice( hoveringOver.indexOf(id), 1 )
}

export function leaveHovering  (event) {
  deleteHoveringOver(event.id)
}

export function rowClick  (event) {
  jQuery(`#${event.id}`).toggleClass('table-dark')
  if(selected.includes(event.id)) {
    selected.splice( selected.indexOf(event.id), 1)
  } else {
    selected.push(event.id)
  }
  buttonsControl()
}

export function buttonsControl(){
  if(selected.length > 0) {
    $('.auto-disabled').prop('disabled', false)
  } else   $('.auto-disabled').prop('disabled', true)
}