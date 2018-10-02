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

function getDistanceFromAirport(airship) {
  return distance(airship, airport)
}

function isCloseToAirport(airship) {
  if (getDistanceFromAirport(airship) < 2 && !airship.info) {
    airship.info = true
    showAirshipCloseToAirportInfo(airship)
  } else if (getDistanceFromAirport(airship) > 2 && airship.info) {
    airship.info = false
    hideAirshipCloseToAirportInfo(airship)
  }
}
const warnShow = []

function isCloseToEachOther(airshipCombination) {
  airshipCombination.forEach(combinedAirships => {
    if (
      distance(combinedAirships.first, combinedAirships.second) < 1 &&
      !warnShow.includes(`${combinedAirships.first.id}${combinedAirships.second.id}`)
    ) {
      warnShow.push(`${combinedAirships.first.id}${combinedAirships.second.id}`)
      showAirshipCloseToAirshipWarning(combinedAirships)
    } else if (
      distance(combinedAirships.first, combinedAirships.second) > 1 &&
      warnShow.includes(`${combinedAirships.first.id}${combinedAirships.second.id}`)
    ) {
      warnShow.splice( warnShow.indexOf(`${combinedAirships.first.id}${combinedAirships.second.id}`), 1 )
      hideAirshipCloseToAirshipWarning(combinedAirships)
    }
  })
}

function getDistantPoint(airship) {
  return { 
    x : airship.x + 10 * (Math.cos(airship.direction * Math.PI / 180)),
    y : airship.y + 10 * -(Math.sin(airship.direction * Math.PI / 180))
  }
}

function intersects(firstAirship,firstAirshipB,secondAirship,secondAirshipB) {
  var det, gamma, lambda
  det = (firstAirshipB.x - firstAirship.x) * (secondAirshipB.y - secondAirship.y) - (secondAirshipB.x - secondAirship.x) * (firstAirshipB.y - firstAirship.y)
  if (det === 0) {
    return false
  } else {
    lambda = ((secondAirshipB.y - secondAirship.y) * (secondAirshipB.x - firstAirship.x) + (secondAirship.x - secondAirshipB.x) * (secondAirshipB.y - firstAirship.y)) / det
    gamma = ((firstAirship.y - firstAirshipB.y) * (secondAirshipB.x - firstAirship.x) + (firstAirshipB.x - firstAirship.x) * (secondAirshipB.y - firstAirship.y)) / det
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1)
  }
}

function getIntersection(firstAirship, firstAirshipB, secondAirship, secondAirshipB) {
  var slope1, slope2, yint1, yint2, intx, inty;
  if (firstAirship.x == secondAirship.x && firstAirship.y == secondAirship.y) return [firstAirship.x, firstAirship.y];
  if (firstAirshipB.x == secondAirshipB.x && firstAirshipB.y == secondAirshipB.y) return [firstAirshipB.x, secondAirshipB.y];

  slope1 = this.slope(firstAirship.x, firstAirship.y, firstAirshipB.x, firstAirshipB.y);
  slope2 = this.slope(secondAirship.x, secondAirship.y, secondAirshipB.x, secondAirshipB.y);
  if (slope1 === slope2) return false;

  yint1 = this.yInt(firstAirship.x, firstAirship.y, firstAirshipB.x, firstAirshipB.y);
  yint2 = this.yInt(secondAirship.x, secondAirship.y, secondAirshipB.x, secondAirshipB.y);
  if (yint1 === yint2) return yint1 === false ? false : [0, yint1];

  if (slope1 === false) return [secondAirship.y, slope2 * secondAirship.y + yint2];
  if (slope2 === false) return [firstAirship.y, slope1 * firstAirship.y + yint1];
  intx = (slope1 * firstAirship.x + yint1 - yint2)/ slope2;
  return [intx, slope1 * intx + yint1];
}

const dangerShow = []

function isGoingToCollide(airshipCombination) {
  airshipCombination.forEach(combinedAirships => {
    if(
      intersects(
        combinedAirships.first,
        getDistantPoint(combinedAirships.first),
        combinedAirships.second,
        getDistantPoint(combinedAirships.second)
      ) &&
      !dangerShow.includes(`${combinedAirships.first.id}${combinedAirships.second.id}`)
    ) {
      dangerShow.push(`${combinedAirships.first.id}${combinedAirships.second.id}`)
      showAirshipsGoingToCollide(combinedAirships)
    } else
    if(
      !intersects(
        combinedAirships.first,
        getDistantPoint(combinedAirships.first),
        combinedAirships.second,
        getDistantPoint(combinedAirships.second)
      ) &&
      dangerShow.includes(`${combinedAirships.first.id}${combinedAirships.second.id}`)
    ) {
      dangerShow.splice( dangerShow.indexOf(`${combinedAirships.first.id}${combinedAirships.second.id}`), 1 )
      hideAirshipsGoingToCollide(combinedAirships)
    }
  })
}

function trackThem() {
  const airshipCombination = combinatory(airships) // OPTIMIZATION FIX THIS
  airships.forEach(airship => isCloseToAirport(airship))
  isCloseToEachOther(airshipCombination)
  isGoingToCollide(airshipCombination)
  setTimeout(trackThem, 10)
}

module.exports = {
  trackThem
}