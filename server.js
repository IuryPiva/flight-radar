const browserify = require('browserify-middleware')
const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(__dirname + '/public'))

app.get('/app.js', browserify('./client/main.js'))

app.get('/', function(req, res){
  res.render('index.ejs')
})

app.get('/black-plane.png', function(req, res){
  res.sendFile(path.resolve('./client/assets/black-plane.png'))
})
app.get('/bootstrap.css', function(req, res){
  res.sendFile(path.resolve('./node_modules/bootstrap/dist/css/bootstrap.min.css'))
})

app.listen(3000)
console.log('Listening on port 3000');