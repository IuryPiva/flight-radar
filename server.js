const browserify = require('browserify-middleware')
const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/app.js', browserify('./client/main.js'))

app.get('/', function(req, res){
  res.render('index.ejs')
})

app.get('/black-plane.png', function(req, res){
  res.sendFile('/Users/luizfelipebolsonigomes/iury/git-repos/faculdade/flight-radar/client/assets/black-plane.png')
})

app.listen(3000)
console.log('Listening on port 3000');