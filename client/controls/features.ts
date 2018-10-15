export function renderRings() {
  return (<HTMLInputElement>document.getElementById('draw-polar')).checked
}
export function drawAirships() {
  return (<HTMLInputElement>document.getElementById('draw-airships')).checked
}
export function animateAirships() {
  return (<HTMLInputElement>document.getElementById('animate-airships')).checked
}
export function drawGrid() {
  return (<HTMLInputElement>document.getElementById('draw-grid')).checked
}
export function bounce() {
  return (<HTMLInputElement>document.getElementById('bounce')).checked
}
export function mayTrack() {
  return (<HTMLInputElement>document.getElementById('may-track')).checked
}
