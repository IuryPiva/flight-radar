const hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']

function rand() {
  return Math.floor(Math.random() * 16)
}

module.exports = {
  randomHexColor: () => {
    return `#${hex[rand()]}${hex[rand()]}${hex[rand()]}${hex[rand()]}${hex[rand()]}${hex[rand()]}`
  }
}