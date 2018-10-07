const browserify = require('browserify-middleware')
const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(__dirname + '/public'))

app.get('/app.js', browserify('./client/main.js'))

app.get('/', function(req, res){
  res.render('index.ejs')
})

app.get('/airship.png', function(req, res){
  res.sendFile(path.resolve('./client/assets/airship.png'))
})
app.get('/helicopter.png', function(req, res){
  res.sendFile(path.resolve('./client/assets/helicopter.png'))
})
app.get('/airship-red.png', function(req, res){
  res.sendFile(path.resolve('./client/assets/airship-red.png'))
})
app.get('/helicopter-red.png', function(req, res){
  res.sendFile(path.resolve('./client/assets/helicopter-red.png'))
})
app.get('/airship-shadow.png', function(req, res){
  res.sendFile(path.resolve('./client/assets/airship-shadow.png'))
})
app.get('/helicopter-shadow.png', function(req, res){
  res.sendFile(path.resolve('./client/assets/helicopter-shadow.png'))
})
app.get('/bootstrap.css', function(req, res){
  res.sendFile(path.resolve('./node_modules/bootstrap/dist/css/bootstrap.min.css'))
})

app.listen(3000)
console.log('Listening on port 3000');