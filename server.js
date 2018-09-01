var express = require('express')
var app = express()
var expressHandlebars = require('express-handlebars')
var cheerio = require('cheerio')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var request = require('request')
// var Article = require('./articleModel')

var port = 3000 || process.env.PORT

app.use(bodyParser.json())

mongoose.connect('mongodb://newuser:123456A@ds239692.mlab.com:39692/mongo-mongoose"')


app.engine('handlebars', expressHandlebars({ defualtLayout: "main"}))
app.set("view engine", 'handlebars')

app.get("/", function(req, res){
    res.render("index");
})

app.listen(port, function(){
    console.log("app is listening on port" + port)
});


