const hex = '0123456789abcdef'.split('')

function rand () {
  return Math.floor(Math.random() * 16)
}

function randomLetter () {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]
}

function randomNumber () {
  return Math.floor(Math.random() * 9)
}

export function randomHexColor() {
  return `#${hex[rand()]}${hex[rand()]}${hex[rand()]}${hex[rand()]}${hex[rand()]}${hex[rand()]}`
}

export function randomFlightId () {
  return `${randomLetter()}${randomLetter()}${randomLetter()}${randomNumber()}${randomNumber()}${randomNumber()}`
}
