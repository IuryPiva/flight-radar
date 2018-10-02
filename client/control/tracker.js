const airport = { x: 0, y: 0 }
const airships = require('../airship/airships')
const { combinatory } = require('../utils')
const {
  showAirshipCloseToAirportInfo, hideAirshipCloseToAirportInfo,
  showAirshipCloseToAirshipWarning, hideAirshipCloseToAirshipWarning,
  showAirshipsGoingToCollide, hideAirshipsGoingToCollide
} = require('./feedback')

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
    x: airship.x + 10 * (Math.cos(airship.direction * Math.PI / 180)),
    y: airship.y + 10 * -(Math.sin(airship.direction * Math.PI / 180))
  }
}

function intersects(firstAirship, secondAirship) {
  const firstAirshipB = getDistantPoint(firstAirship),
    secondAirshipB = getDistantPoint(secondAirship)
  let det, gamma, lambda
  det = (firstAirshipB.x - firstAirship.x) * (secondAirshipB.y - secondAirship.y) - (secondAirshipB.x - secondAirship.x) * (firstAirshipB.y - firstAirship.y)
  if (det === 0) {
    return false
  } else {
    lambda = ((secondAirshipB.y - secondAirship.y) * (secondAirshipB.x - firstAirship.x) + (secondAirship.x - secondAirshipB.x) * (secondAirshipB.y - firstAirship.y)) / det
    gamma = ((firstAirship.y - firstAirshipB.y) * (secondAirshipB.x - firstAirship.x) + (firstAirshipB.x - firstAirship.x) * (secondAirshipB.y - firstAirship.y)) / det
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1)
  }
}

function getIntersection(firstAirship, secondAirship) {
  const firstAirshipB = getDistantPoint(firstAirship),
    secondAirshipB = getDistantPoint(secondAirship)

  let slope1, slope2, yint1, yint2, intx
  function slope(x1, y1, x2, y2) {
    if (x1 == x2) return false;
    return (y1 - y2) / (x1 - x2);
  }
  function yInt(x1, y1, x2, y2) {
    if (x1 === x2) return y1 === 0 ? 0 : false;
    if (y1 === y2) return y1;
    return y1 - slope(x1, y1, x2, y2) * x1;
  }
  if (firstAirship.x == secondAirship.x && firstAirship.y == secondAirship.y) return { x: firstAirship.x, y: firstAirship.y }
  if (firstAirshipB.x == secondAirshipB.x && firstAirshipB.y == secondAirshipB.y) return { x: firstAirshipB.x, y: secondAirshipB.y }

  slope1 = slope(firstAirship.x, firstAirship.y, firstAirshipB.x, firstAirshipB.y)
  slope2 = slope(secondAirship.x, secondAirship.y, secondAirshipB.x, secondAirshipB.y)
  if (slope1 === slope2) return false;

  yint1 = yInt(firstAirship.x, firstAirship.y, firstAirshipB.x, firstAirshipB.y)
  yint2 = yInt(secondAirship.x, secondAirship.y, secondAirshipB.x, secondAirshipB.y)
  if (yint1 === yint2) return yint1 === false ? false : { x: 0, y: yint1 }

  if (slope1 === false) return { x: secondAirship.y, y: slope2 * secondAirship.y + yint2 }
  if (slope2 === false) return { x: firstAirship.y, y: slope1 * firstAirship.y + yint1 }
  intx = (slope1 * firstAirship.x + yint1 - yint2) / slope2
  return { x: intx, y: slope1 * intx + yint1 }
}

function timeToPoint(airship, point) {
  return distance(airship, point) / airship.speed
}

function isGoingToPoint(airship, point) {
  // AVIÃO INDO PARA A DIREITA PONTO A ESQUERDA 
  if(airship.x > point.x && (airship.direction < 90 || airship.direction > 270)) return false
  if(airship.x < point.x && (airship.direction < 90 || airship.direction > 270)) return false

}

function collisionInminent(combinedAirships) {
  const intersection = getIntersection(combinedAirships.first, combinedAirships.second)
  if (intersection) {
    const timeToIntersectionFirst = timeToPoint(combinedAirships.first, intersection)
    const timeToIntersectionSecond = timeToPoint(combinedAirships.second, intersection)
    combinedAirships.timeToCollide = (timeToIntersectionFirst + timeToIntersectionSecond) / 2
    if (combinedAirships.timeToCollide <= getMinTime()) {
      return true
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
  airships.forEach(airship => isCloseToAirport(airship))
  isCloseToEachOther(airshipCombination)
  isGoingToCollide(airshipCombination)
  setTimeout(trackThem, 1000)
}

module.exports = {
  trackThem,
  getMinDistanceAirport,
  getMinDistanceAirships,
  getMinTime
}