const hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']

function rand() {
  return Math.floor(Math.random() * 16)
}


function randomLetter() {
  const alphabeth = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return alphabeth[Math.floor(Math.random() * 26)]
}

function randomNumber() {
  return Math.floor(Math.random() * 9)
}


module.exports = {
  randomHexColor: () => {
    return `#${hex[rand()]}${hex[rand()]}${hex[rand()]}${hex[rand()]}${hex[rand()]}${hex[rand()]}`
  },
  randomFlightId: () => {
    return `${randomLetter()}${randomLetter()}${randomLetter()}${randomNumber()}${randomNumber()}${randomNumber()}`
  }
}