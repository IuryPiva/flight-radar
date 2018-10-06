const { selected } = require('./table')
const { getAirshipById } = require('../airship/airship')
const grid  = require('../radar/grid')


function translate(airship, point) {  
  const original = Object.assign({}, airship)
  original.x = original.x + point.x
  original.y = original.y + point.y
  
  checkNewPosition(original, airship)
}

function scale(airship, point){
  airship.x = airship.x * point.x
  airship.y = airship.y * point.y
}

function rotate(airship, point) {
  airship.x -= point.x
  airship.y -= point.y
  const original = Object.assign({}, airship)
  airship.x = airship.x * Math.cos(degreesToRadians(point.angle)) - (airship.y * Math.sin(degreesToRadians(point.angle)))
  airship.y = original.x * Math.sin(degreesToRadians(point.angle)) + (airship.y * Math.cos(degreesToRadians(point.angle)))
  airship.x += point.x
  airship.y += point.y
}

function checkNewPosition(original, airship){
  if(original.x > grid.size.x || original.x < -grid.size.x || original.y > grid.size.y || original.y < -grid.size.y) {
    return false
  }
   else {
     airship.x = original.x
     airship.y = original.y
   }

}

function maxSpeed(airship, point) {
  airship.x -= point.x
  airship.y -= point.y
  const original = Object.assign({}, airship)
  airship.x = airship.x * Math.cos(degreesToRadians(point.angle)) - (airship.y * Math.sin(degreesToRadians(point.angle)))
  airship.y = original.x * Math.sin(degreesToRadians(point.angle)) + (airship.y * Math.cos(degreesToRadians(point.angle)))
  airship.x += point.x
  airship.y += point.y
}

function degreesToRadians(degree) {
  return degree * Math.PI / 180;
}
  window.transladar = () => {
    const point = {
      x: Number(document.getElementById('transladar-x').value),
      y: Number(document.getElementById('transladar-y').value)
    }
    selected.forEach(airshipId => {
      const airship = getAirshipById(airshipId)
      translate(airship, point)
    })
  }
  window.escalonar = () => {
    const point = {
      x: Number(document.getElementById('escalonar-x').value),
      y: Number(document.getElementById('escalonar-y').value)
    }
    selected.forEach(airshipId => {
      const airship = getAirshipById(airshipId)
      scale(airship, point)
    })
  }
  window.rotacionar = () => {
    const point = {
      x: Number(document.getElementById('rotacionar-x').value),
      y: Number(document.getElementById('rotacionar-y').value),
      angle: Number(document.getElementById('rotacionar-angulo').value)
    }
    selected.forEach(airshipId => {
      const airship = getAirshipById(airshipId)
      rotate(airship, point)
    })
  }