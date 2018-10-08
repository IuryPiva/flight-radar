const { selected } = require('./table')
const { getAirshipById } = require('../airship/airship')
const grid  = require('../radar/grid')
const { degreesToRadians } = require('../utils')

function translate(airship, point) {  
  const resultantPosition = Object.assign({}, airship)
  resultantPosition.x = resultantPosition.x + point.x
  resultantPosition.y = resultantPosition.y + point.y
  
  checkNewPosition(resultantPosition, airship)
}

function scale(airship, point){  
  const resultantPosition = Object.assign({}, airship)
  resultantPosition.x = resultantPosition.x + point.x
  resultantPosition.y = resultantPosition.y + point.y
  
  checkNewPosition(resultantPosition, airship)
}

function rotate(airship, point) {
  const resultantPosition = Object.assign({}, airship)

  resultantPosition.x -= point.x
  resultantPosition.y -= point.y
  const original = Object.assign({}, resultantPosition)
  resultantPosition.x = resultantPosition.x * Math.cos(degreesToRadians(point.angle)) - (resultantPosition.y * Math.sin(degreesToRadians(point.angle)))
  resultantPosition.y = original.x * Math.sin(degreesToRadians(point.angle)) + (resultantPosition.y * Math.cos(degreesToRadians(point.angle)))
  resultantPosition.x += point.x
  resultantPosition.y += point.y

  checkNewPosition(resultantPosition, airship)
}

function checkNewPosition(resultantPosition, airship){
  if(resultantPosition.x > grid.size.x || resultantPosition.x < -grid.size.x || resultantPosition.y > grid.size.y || resultantPosition.y < -grid.size.y) {
    if(window.confirm(`O avião ${airship.id} vai para fora do campo visivel (${resultantPosition.x},${resultantPosition.y}), deseja continuar?`)) {
      airship.x = resultantPosition.x
      airship.y = resultantPosition.y
    }
    return false
  }
  else {
    airship.x = resultantPosition.x
    airship.y = resultantPosition.y
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

module.exports = {
  rotate
}
