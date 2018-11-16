export function renderRings() {
  return (<HTMLInputElement>document.getElementById('draw-polar')).checked
}
export function drawAirships() {
  return (<HTMLInputElement>document.getElementById('draw-airships')).checked
}
export function drawAirshipsGuidelines() {
  return (<HTMLInputElement>document.getElementById('draw-airships-guidelines')).checked
}
export function drawAirshipsVision() {
  return (<HTMLInputElement>document.getElementById('draw-airships-vision')).checked
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
export function webWorkers() {
  return (<HTMLInputElement>document.getElementById('web-workers')).checked
}
export function shouldTeleportTo() {
  return (<HTMLInputElement>document.getElementById('should-teleport-to')).checked
}
export function shouldAvoidCollision() {
  return (<HTMLInputElement>document.getElementById('should-avoid-collision')).checked
}

