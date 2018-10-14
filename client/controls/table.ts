import { Airship } from "../airship/airship";

export class Table {
  drawn = false
  tableBody = document.getElementById('table-body')
  selected = []

  newRow(airship: Airship) {
    this.tableBody.innerHTML += `
      <tr id="${airship.id}">
        <th scope="row">${airship.id}</th>
        <td id="${airship.id}position">${airship.position.display()}</td>
        <td id="${airship.id}direction">${airship.direction.display()}</td>
        <td id="${airship.id}speed">${airship.speed.toKilometresPerHour().display()}</td>
      </tr>`

    setTimeout(() => {
      const airshipRow = $(`#${airship.id}`)
      airshipRow.click(() => {
        airship.isSelected = !airship.isSelected
        if(airship.isSelected) {
          airshipRow.css('background-color', '#000000')
          this.selected.push(airship.id)
        } else {
          airshipRow.css('background-color', '#ffffff')
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
    }, 0)
  }

  buttonsControl() {
    this.selected.length > 0
     ? $('.auto-disabled').prop('disabled', false)
     : $('.auto-disabled').prop('disabled', true)
  }

  updateRow(airship: Airship) {
    $(`#${airship.id}position`)[0].innerHTML = airship.position.display()
    $(`#${airship.id}direction`)[0].innerHTML = airship.direction.display()
    $(`#${airship.id}speed`)[0].innerHTML = airship.speed.display()
  }
}
