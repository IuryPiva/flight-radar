export class Random {
  hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']

  rand() {
    return Math.floor(Math.random() * 16)
  }
  randomLetter() {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]
  }
  randomNumber() {
    return Math.floor(Math.random() * 9)
  }
  randomHexColor() {
    return `#${this.hex[this.rand()]}${this.hex[this.rand()]}${this.hex[this.rand()]}${this.hex[this.rand()]}${this.hex[this.rand()]}${this.hex[this.rand()]}`
  }
  randomFlightId() {
    return `${this.randomLetter()}${this.randomLetter()}${this.randomLetter()}${this.randomNumber()}${this.randomNumber()}${this.randomNumber()}`
  }
}