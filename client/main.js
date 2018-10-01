require('bootstrap')
const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")

const img = document.createElement('IMG')
img.src = "black-plane.png"

const FPS = 120

img.onload = function () {
  const grid = {
    cell: {
      width: canvas.width / 10,
      height: canvas.width / 10,
    },
    center: {
      x: canvas.width / 2,
      y: canvas.height / 2
    },
  }
  const rings = {
    diameter: grid.cell.width * 10,
    radius: grid.cell.width * 10 / 2,
    lineWidth: 1,
    amount: 5,
  }
  
  const gradient = ctx.createLinearGradient(rings.radius, 0, 0, 0),
    hueEnd= 170,
    hueStart= 120,
    hueDiff= Math.abs(170 - 120),
    saturation= 50,
    lightness= 40
    gradient.addColorStop(0, 'hsla( ' + hueStart + ', ' + saturation + '%, ' + lightness + '%, 1 )')
  gradient.addColorStop(1, 'hsla( ' + hueEnd + ', ' + saturation + '%, ' + lightness + '%, 0.1 )')
  const airships = require('./airships')

  const renderRings = function () {
    for (let i = 0; i < rings.amount; i++) {
      ctx.beginPath()
      ctx.arc(grid.center.x, grid.center.y, ((rings.radius - (rings.lineWidth / 2)) / rings.amount) * (i + 1), 0, Math.PI * 2, false)
      ctx.strokeStyle = 'black'
      ctx.lineWidth = rings.lineWidth
      ctx.stroke()
    }
  }

  const dToR = function (degrees) {
    return degrees * (Math.PI / 180)
  }
  let sweepAngle = 270,
  sweepSpeed = 120 // GRAUS POR SEGUNDO

  const renderSweep = function () {
    ctx.save()
    ctx.translate(grid.center.x, grid.center.y)
    ctx.rotate(dToR(sweepAngle))
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.arc(0, 0, rings.radius, dToR(-1), dToR(1), false)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()
    ctx.restore()
  }

  function coordinatesToPx(x, y) {
    return {
      x: grid.center.x + (x * grid.cell.width),
      y: grid.center.y + (y * grid.cell.height)
    }
  }

  function drawGrid() {
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 1

    for (let i = 0; i <= canvas.width; i += grid.cell.width) {
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
    }

    for (let i = 0; i <= canvas.height; i += grid.cell.height) {
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
    }
    ctx.stroke()
  }

  function drawAirship(airship) {
    const pixel = coordinatesToPx(airship.x, airship.y)
    const rad = (airship.direction * Math.PI / 180) * (-1)
    ctx.save()
    ctx.font="12px Georgia"
    ctx.fillText(airship.id, pixel.x + airship.width / 2, pixel.y + airship.height / 2)
    ctx.translate(pixel.x, pixel.y)
    ctx.translate(0, 0)
    ctx.rotate(rad)
    ctx.drawImage(img, -airship.width / 2, -airship.height / 2)
    ctx.restore()
  }

  function drawAirships() {
    return airships.forEach(airship => drawAirship(airship))
  }

  function rotate(deg, airship) {
    airship.direction = (airship.direction + deg) % 360
  }

  function distance(a, b) {
    return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2))
  }

  function getNextPosition(airship) {
    return { 
      x : airship.x + airship.speed/grid.cell.width/FPS * (Math.cos(airship.direction * Math.PI / 180)),
      y : airship.y + airship.speed/grid.cell.height/FPS * -(Math.sin(airship.direction * Math.PI / 180))
    }
  }

  function animateAirships() {
    airships.forEach(airship => {
      const nextPosition = getNextPosition(airship)
      const pixels = coordinatesToPx(nextPosition.x , nextPosition.y)

      // CURVA ALEATÓRIA
      // airship.direction += Math.random() * (3 - (-4) + 1) + (-4)

      // HITTING RIGHT WALL
      if(pixels.x + airship.width/2 > canvas.width) {
        const newDirection = Math.floor(Math.random() * (270 - 90+1) + 90)
        airship.direction = newDirection
      } else
      // HITTING LEFT WALL
      if (pixels.x < airship.width/2) {
        const newDirection = ((Math.floor(Math.random() * (270 - 90+1) + 90) + 180) % 360)
        airship.direction = newDirection
      } else
      // HITTING BOTTOM WALL
      if(pixels.y + airship.height/2 > canvas.height) {
        const newDirection = Math.floor(Math.random() * 180)
        airship.direction = newDirection
      } else 
      // HITTING TOP WALL
      if(pixels.y < airship.height/2) {
        const newDirection = Math.floor(Math.random() * (360 - 180+1) + 180)
        airship.direction = newDirection
      }

      airship.x = nextPosition.x
      airship.y = nextPosition.y
    })
  }

  function drawTable() {
    const tableBody = document.getElementById('table-body')
    tableBody.innerHTML = ''
    airships.forEach(airship => {
      let html = `
        <tr>
          <th scope="row">${airship.id}</th>
          <td>${Number(airship.x.toFixed(1))}, ${Number(airship.y.toFixed(1))}</td>
          <td>${Number(airship.direction.toFixed(1))}°</td>
          <td>${Number(airship.speed.toFixed(1))}</td>
        </tr>`
        tableBody.innerHTML += html
    })
    setTimeout(drawTable, 1000)
  }

  function animateSweep() {
    sweepAngle += sweepSpeed / FPS
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    drawGrid()
    drawAirships()
    animateAirships()
    renderRings()
    renderSweep()
    animateSweep()
  }
  drawTable()

  setInterval(draw, 1000 / FPS)
}
