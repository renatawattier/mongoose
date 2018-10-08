var express = require('express')
var CONNECTION_URI = process.env.MONGODB_URI || 'mongodeb://localhost/users';
var app = express()
var expressHandlebars = require('express-handlebars')
var cheerio = require('cheerio')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var request = require('request')
var Article = require('./articleModel')

var PORT = process.env.PORT || 3000

app.use(bodyParser.json())

 mongoose.connect(CONNECTION_URI, 'mongodb://newuser:123456A@ds239692.mlab.com:39692/mongo-mongoose')


app.engine('handlebars', expressHandlebars({ defualtLayout: "main"}))
app.set("view engine", 'handlebars')

// Scrape New Data stores database
app.get("/scrape", function(req, res){
    request("https://wftda.com/news/", function(error, response, body){
        var $=cheerio.load(body);
        var array = [];
        $(".entry-title").each(function(){
            var title = $(this).children("a").text();
            var link = $(this).children("a").attr("href");
            array.push({title:title, link:link});
            var article = Article({title:title, link:link});
            article.save();
        })

        res.send(array);
    })
    
})

// shows all articles on the dababase
app.get("/all", function(req, res){
    Article.find().then(function(result){
        res.send(result)
    })
})

//get all articles and renders on handlebars
app.get("/", function(req, res){
    Article.find().then(function(result){
        res.render("index", {
            items: result
        })
    })
})

//deletes all articles from database
app.get("/clear", function(req, res){
    Article.remove().then(function(result){
        
    res.send(result)
    })
})


app.listen(PORT, function(){
    console.log("app is listening on port" + PORT)
});


