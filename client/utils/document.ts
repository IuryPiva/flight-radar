export function getNumberFromInput(inputId) {
  return Number((<HTMLInputElement>document.getElementById(inputId)).value)
}
