const { FPS } = require('../canvas')
const airport = { x: 0, y: 0 }
const airships = require('../airship/airships')
const { combinatory } = require('../utils')
const {
  showAirshipCloseToAirportInfo, hideAirshipCloseToAirportInfo,
  showAirshipCloseToAirshipWarning, hideAirshipCloseToAirshipWarning,
  showAirshipsGoingToCollide, hideAirshipsGoingToCollide
} = require('./feedback')
const lineIntersect = require('line-intersect');
const { cartToPolar, polarToCart } = require('../utils')
const _ = require('lodash')
const warnShow = []

function distance(a, b) {
  return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2))
}

function getMinDistanceAirport() {
  return Number(document.getElementById('min-distance-airport').value)
}
window.getMinDistanceAirport = getMinDistanceAirport

function getMinDistanceAirships() {
  return Number(document.getElementById('min-distance-airships').value)
}
window.getMinDistanceAirships = getMinDistanceAirships

function getMinTime() {
  return Number(document.getElementById('min-time').value)
}
window.getMinTime = getMinTime

function getDistanceFromAirport(airship) {
  return distance(airship, airport)
}

function isCloseToAirport(airship) {
  if (getDistanceFromAirport(airship) < getMinDistanceAirport() && !airship.info) {
    airship.info = true
    showAirshipCloseToAirportInfo(airship)
  } else if (getDistanceFromAirport(airship) > getMinDistanceAirport() && airship.info) {
    airship.info = false
    hideAirshipCloseToAirportInfo(airship)
  }
}

function airportCollision(airship){
  const airshipPoint = getDistantPoint(airship)
  const intersection = lineIntersect.colinearPointWithinSegment(
    0, 0, airship.x, airship.y,
    airshipPoint.x, airshipPoint.y
  )

  if(intersection){
    //alert('morreu')
  }
}

function isCloseToEachOther(airshipCombination) {
  airshipCombination.forEach(combinedAirships => {
    if (
      distance(combinedAirships.first, combinedAirships.second) < getMinDistanceAirships() &&
      !warnShow.includes(`${combinedAirships.first.id}${combinedAirships.second.id}`)
    ) {
      warnShow.push(`${combinedAirships.first.id}${combinedAirships.second.id}`)
      showAirshipCloseToAirshipWarning(combinedAirships)
    } else if (
      distance(combinedAirships.first, combinedAirships.second) > getMinDistanceAirships() &&
      warnShow.includes(`${combinedAirships.first.id}${combinedAirships.second.id}`)
    ) {
      warnShow.splice(warnShow.indexOf(`${combinedAirships.first.id}${combinedAirships.second.id}`), 1)
      hideAirshipCloseToAirshipWarning(combinedAirships)
    }
  })
}

function getDistantPoint(airship, times = 1) {
  return { 
    x : airship.x + (airship.speed? airship.speed*getMinTime()*times : times*0.2778/FPS) * (Math.cos(Math.abs(airship.direction - 360) * Math.PI / 180)),
    y : airship.y + (airship.speed? airship.speed*getMinTime()*times : times*0.2778/FPS) * -(Math.sin(Math.abs(airship.direction - 360) * Math.PI / 180))
  }
}

function timeToPoint(airship, point) {
  return distance(airship, point) / airship.speed
}

// TODO IMPROVE THIS PERFORMANCE
function getInDanger() {
  const inDanger= []
  dangerShow.forEach(twoPlanesId => {
    inDanger.push(_.join(_.slice(twoPlanesId, 0, 6), ''))
    inDanger.push(_.join(_.slice(twoPlanesId, 6, 12), ''))
  })
  return _.uniq(inDanger)
}

function collisionInminent(combinedAirships) {
  const firstAirshipB = getDistantPoint(combinedAirships.first)
  const secondAirshipB = getDistantPoint(combinedAirships.second)
  const intersection = lineIntersect.checkIntersection(
    combinedAirships.first.x, combinedAirships.first.y, firstAirshipB.x, firstAirshipB.y,
    combinedAirships.second.x, combinedAirships.second.y, secondAirshipB.x, secondAirshipB.y
  )

  if (intersection.type == "intersecting") {
    const timeToIntersectionFirst = timeToPoint(combinedAirships.first, intersection.point)
    const timeToIntersectionSecond = timeToPoint(combinedAirships.second, intersection.point)
    combinedAirships.timeToCollide = timeToIntersectionFirst > timeToIntersectionSecond ? timeToIntersectionFirst : timeToIntersectionSecond
    if (combinedAirships.timeToCollide <= getMinTime()) {
      return true
    }
  } else
  {
    const firstAirshipC = getDistantPoint(combinedAirships.first, 2)
    const secondAirshipC = getDistantPoint(combinedAirships.second, 2)
    const firstOnSecondDirection = lineIntersect.colinearPointWithinSegment(
      combinedAirships.first.x, combinedAirships.first.y,
      combinedAirships.second.x, combinedAirships.second.y, secondAirshipC.x, secondAirshipC.y
    )
    const secondOnFirstDirection = lineIntersect.colinearPointWithinSegment(
      combinedAirships.second.x, combinedAirships.second.y,
      combinedAirships.first.x, combinedAirships.first.y, firstAirshipC.x, firstAirshipC.y
    )
    if(firstOnSecondDirection && combinedAirships.first.speed == 0) {
      combinedAirships.timeToCollide = distance(combinedAirships.first, combinedAirships.second) / combinedAirships.second.speed
      if (combinedAirships.timeToCollide <= getMinTime()) {
        return true
      }
    } else
    if(secondOnFirstDirection && combinedAirships.second.speed == 0) {
      combinedAirships.timeToCollide = distance(combinedAirships.first, combinedAirships.second) / combinedAirships.first.speed
      if (combinedAirships.timeToCollide <= getMinTime()) {
        return true
      }
    } else
    if(firstOnSecondDirection && secondOnFirstDirection) {
      combinedAirships.timeToCollide = distance(combinedAirships.first, combinedAirships.second) / (combinedAirships.first.speed + combinedAirships.second.speed)
      if (combinedAirships.timeToCollide <= getMinTime()) {
        return true
      }
    } else
    if(firstOnSecondDirection) {
      const A = combinedAirships.second
      const B = secondAirshipC
      const C = combinedAirships.first

      combinedAirships.timeToCollide = distance(combinedAirships.first, combinedAirships.second) / (-combinedAirships.first.speed + combinedAirships.second.speed)
      if (combinedAirships.timeToCollide <= getMinTime() && (distance(A, C) + distance(B, C) == distance(A, B))) {
        return true
      }
    } else
    if(secondOnFirstDirection) {
      const A = combinedAirships.first
      const B = firstAirshipC
      const C = combinedAirships.second

      combinedAirships.timeToCollide = distance(combinedAirships.first, combinedAirships.second) / (combinedAirships.first.speed - combinedAirships.second.speed)
      if (combinedAirships.timeToCollide <= getMinTime() && (distance(A, C) + distance(B, C) == distance(A, B))) {
        return true
      }
    }
  }

  return false
}

const dangerShow = []

function isGoingToCollide(airshipCombination) {
  airshipCombination.forEach(combinedAirships => {
    if (
      collisionInminent(combinedAirships) &&
      !dangerShow.includes(`${combinedAirships.first.id}${combinedAirships.second.id}`)
    ) {
      dangerShow.push(`${combinedAirships.first.id}${combinedAirships.second.id}`)
      showAirshipsGoingToCollide(combinedAirships)
    } else {
      if (
        !collisionInminent(combinedAirships) &&
        dangerShow.includes(`${combinedAirships.first.id}${combinedAirships.second.id}`)
        ) {
        dangerShow.splice(dangerShow.indexOf(`${combinedAirships.first.id}${combinedAirships.second.id}`), 1)
        hideAirshipsGoingToCollide(combinedAirships)
      } 
      // else
      // if(
      //   dangerShow.includes(`${combinedAirships.first.id}${combinedAirships.second.id}`)
      // ) {
      //   document.getElementById(`${combinedAirships.first.id}${combinedAirships.second.id}b`).innerHTML = combinedAirships.timeToCollide.toFixed(2)
      // }
    }
  })
}

function trackThem() {
  const airshipCombination = combinatory(airships) // OPTIMIZATION FIX THIS
  airships.forEach(airship => isCloseToAirport(airship))
  airships.forEach(airship => airportCollision(airship))
  
  isCloseToEachOther(airshipCombination)
  isGoingToCollide(airshipCombination)  
  setTimeout(trackThem, 50)
}

module.exports = {
  trackThem,
  getMinDistanceAirport,
  getMinDistanceAirships,
  getMinTime,
  getDistantPoint,
  getInDanger
}