const { selected } = require('./table')
const { getAirshipById } = require('../airship/airship')

function translate(airship, point) {
  airship.x = airship.x + point.x
  airship.y = airship.y + point.y
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

function round(num) {
  return Math.round(num * 100) / 100;
}

function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}

function degreesToRadians(degree) {
  return degree * Math.PI / 180;
}

function cartToPolar(cart) {
  return {
    radius: Math.sqrt(Math.pow(cart.x, 2) + Math.pow(cart.y, 2)),
    angle: radiansToDegrees(Math.atan2(cart.y, cart.x))
  }
}

function polarToCart(polar) {
  const rad = degreesToRadians(polar.angle)
  const cosRad = round(Math.cos(rad))
  const sinRad = round(Math.sin(rad))
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
      rotate(airship, point)
    })
  }