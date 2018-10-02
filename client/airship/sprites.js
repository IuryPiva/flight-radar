const airship = document.createElement('IMG'),
helicopter = document.createElement('IMG'),
airshipRed = document.createElement('IMG'),
helicopterRed = document.createElement('IMG')
helicopter.src = 'helicopter.png'
airship.src = 'airship.png'
airshipRed.src = 'airship-red.png'
helicopterRed.src = 'helicopter-red.png'

module.exports = {
  helicopter,
  airship,
  airshipRed,
  helicopterRed
}