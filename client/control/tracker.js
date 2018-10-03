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
const warnShow = []

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

function getDistantPoint(airship) {
  return { 
    x : airship.x + (airship.speed? airship.speed*getMinTime() : 0.2778/FPS) * (Math.cos(Math.abs(airship.direction - 360) * Math.PI / 180)),
    y : airship.y + (airship.speed? airship.speed*getMinTime() : 0.2778/FPS) * -(Math.sin(Math.abs(airship.direction - 360) * Math.PI / 180))
  }
}

function timeToPoint(airship, point) {
  return distance(airship, point) / airship.speed
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
    const firstOnSecondDirection =  lineIntersect.colinearPointWithinSegment(
      combinedAirships.first.x, combinedAirships.first.y,
      combinedAirships.second.x, combinedAirships.second.y, secondAirshipB.x, secondAirshipB.y
    )
    const secondOnFirstDirection = lineIntersect.colinearPointWithinSegment(
      combinedAirships.second.x, combinedAirships.second.y,
      combinedAirships.first.x, combinedAirships.first.y, firstAirshipB.x, firstAirshipB.y
    )
    if(firstOnSecondDirection && (combinedAirships.first.direction + combinedAirships.second.direction > 359) && (combinedAirships.first.direction + combinedAirships.second.direction < 361)) {
      combinedAirships.timeToCollide = distance(combinedAirships.first, combinedAirships.second) / (combinedAirships.first.speed + combinedAirships.second.speed)
      if (combinedAirships.timeToCollide <= getMinTime()) {
        return true
      }
    }
    if(secondOnFirstDirection && (combinedAirships.first.direction + combinedAirships.second.direction > 359) && (combinedAirships.first.direction + combinedAirships.second.direction < 361)) {
      combinedAirships.timeToCollide = distance(combinedAirships.first, combinedAirships.second) / (combinedAirships.first.speed + combinedAirships.second.speed)
      if (combinedAirships.timeToCollide <= getMinTime()) {
        return true
      }
    }
    if(firstOnSecondDirection && combinedAirships.first.speed == 0) {
      combinedAirships.timeToCollide = distance(combinedAirships.first, combinedAirships.second) / combinedAirships.second.speed
      if (combinedAirships.timeToCollide <= getMinTime()) {
        return true
      }
    }
    if(secondOnFirstDirection && combinedAirships.second.speed == 0) {
      combinedAirships.timeToCollide = distance(combinedAirships.first, combinedAirships.second) / combinedAirships.first.speed
      if (combinedAirships.timeToCollide <= getMinTime()) {
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
      } else
      if(
        dangerShow.includes(`${combinedAirships.first.id}${combinedAirships.second.id}`)
      ) {
        document.getElementById(`${combinedAirships.first.id}${combinedAirships.second.id}b`).innerHTML = combinedAirships.timeToCollide.toFixed(2)
      }
    }
  })
}

function trackThem() {
  const airshipCombination = combinatory(airships) // OPTIMIZATION FIX THIS
  // airships.forEach(airship => isCloseToAirport(airship))
  // isCloseToEachOther(airshipCombination)
  isGoingToCollide(airshipCombination)
  setTimeout(trackThem, 50)
}

module.exports = {
  trackThem,
  getMinDistanceAirport,
  getMinDistanceAirships,
  getMinTime,
  getDistantPoint
}