import { Airship } from "../airship/airship";
import { Airships } from "../airship/airships";

export class Table {
  drawn = false
  tableBody = $('#table-body')
  selected = []

  newRow(airship: Airship) {
    this.tableBody.append(`
      <tr id="${airship.id}">
        <th scope="row">${airship.id}</th>
        <td id="${airship.id}position">${airship.position.display()}</td>
        <td id="${airship.id}polar">${airship.position.toPolar().display()}</td>
        <td id="${airship.id}direction">${airship.direction.display()}</td>
        <td id="${airship.id}speed">${airship.speed.toKilometresPerHour().display()}</td>
      </tr>`)

    const airshipRow = $(`#${airship.id}`)
    airshipRow.click(() => {            
      airship.isSelected = !airship.isSelected
      if (airship.isSelected) {
        airshipRow.toggleClass('airship-row-selected')
        this.selected.push(airship.id)
      } else {
        airshipRow.toggleClass('airship-row-selected')
        this.selected.splice(this.selected.indexOf(airship.id), 1)
      }
      this.buttonsControl()
    })
    airshipRow.mouseover(() => {
      airship.isHover = true
    })
    airshipRow.mouseleave(() => {
      airship.isHover = false
    })
  }

  buttonsControl() {
    this.selected.length > 0
      ? $('.auto-disabled').prop('disabled', false)
      : $('.auto-disabled').prop('disabled', true)
  }

  updateRow(airships: Airships) {

    airships.getAll().forEach(airship => {
      $(`#${airship.id}position`)[0].innerHTML = airship.position.display()
      $(`#${airship.id}polar`)[0].innerHTML = airship.position.toPolar().display()
      $(`#${airship.id}direction`)[0].innerHTML = airship.direction.display()
      $(`#${airship.id}speed`)[0].innerHTML = airship.speed.toKilometresPerHour().display()  
    })
  }
}
