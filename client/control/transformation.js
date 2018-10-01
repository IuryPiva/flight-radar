function rotate(deg, airship) {
  airship.direction = (airship.direction + deg) % 360
}