export function getMinTimeToDanger () {
  return Number((<HTMLInputElement>document.getElementById('min-time')).value)
}
(window as any).getMinTimeToDanger = getMinTimeToDanger