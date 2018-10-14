import { Airship } from "../airship/airship";

export class Table {
  drawn = false
  tableBody = document.getElementById('table-body')
  selected = []

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
      if(airship.isSelected) {
        this.selected.push(airship.id)
      }
      this.buttonsControl()
    })
    document.getElementById(`#${airship.id}`).addEventListener('onmouseover', () => {
      airship.isHover = true
    })
    document.getElementById(`#${airship.id}`).addEventListener('onmouseout', () => {
      airship.isHover = false
    })
  }

  buttonsControl() {
    if (this.selected.length > 0) {
      $('.auto-disabled').prop('disabled', false)
    } else $('.auto-disabled').prop('disabled', true)
  }

  updateRow (airship: Airship) {
    $(`#${airship.id}position`)[0].innerHTML = airship.position.display()
    $(`#${airship.id}direction`)[0].innerHTML = airship.direction.display()
    $(`#${airship.id}speed`)[0].innerHTML = airship.speed.display()
  }
}
