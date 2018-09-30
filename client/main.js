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
      height: canvas.height / 10,
    },
    center: {
      x: canvas.width / 2,
      y: canvas.height / 2
    },
  }

  const airships = [
    {
      width: 32,
      height: 32,
      x: 0,
      y: 0,
      direction: 78,
      speed: 500
    },
    {
      width: 32,
      height: 32,
      x: 3,
      y: 2,
      direction: 90,
      speed: 500
    },
    {
      width: 32,
      height: 32,
      x: -1,
      y: 2,
      direction: 33,
      speed: 500
    },
    {
      width: 32,
      height: 32,
      x: -3,
      y: 2,
      direction: 22,
      speed: 500
    },
  ]

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
    });
  }

  function drawTable() {
    
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    drawGrid()
    drawAirships()
    animateAirships()
    drawTable()
  }

  setInterval(draw, 1000 / FPS)
}
