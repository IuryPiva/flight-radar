const { selected } = require('./table')
const { getAirshipById } = require('../airship/airship')

function translate(airship, point) {
  debugger
  airship.x = airship.x + point.x
  airship.y = airship.y + point.y
}

function scale(airship, point){
  point.x = (airship.x * (point.x/100))
  point.y = (airship.y * (point.y/100))
  translate(airship, point)
}

function rotate(airship, point) {
  const polar = cartToPolar(point)
  polar.angle += point.angle
  cart = polarToCart(polar)
  debugger
  airship.x = cart.x
  airship.y = cart.y
}

function cartToPolar(cart) {
  return {
    radius: Math.sqrt(Math.pow(cart.x, 2) + Math.pow(cart.y, 2)),
    angle: number.radiansToDegrees(Math.atan2(cart.y, cart.x))
  }
}
function polarToCart(polar) {
  const rad = number.degreesToRadians(polar.angle)
  const cosRad = number.round(Math.cos(rad))
  const sinRad = number.round(Math.sin(rad))
  return {
    y: polar.radius * sinRad,
    x: polar.radius * cosRad
  }
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
      scale(airship, point)
    })
  }