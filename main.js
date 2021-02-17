// imports
const express = require("express");
const urlParser = require("url")
const handlebars = require("express-handlebars");
const fs = require("fs");

// config
const port = 80; // server port (no shit)
const defaultLayoutName = "defaultLayout"

// load app
const app = express();
app.set('view engine', 'hbs')
app.engine('hbs', handlebars({
    extname: 'hbs',                             // set hbs extension
    defaultLayout: defaultLayoutName,             // set default layout (in views/layouts)
    layoutsDir: __dirname + '/views/layouts',   // set layouts dir
    partialsDir: __dirname + '/views/partials/' // set partials dir
}))

app.use(express.static("public")) // make website use sources from public dir

// handling pages. Needs to be moved to separate file & find better solution for handling AJAX
app.get('/', (req, res) => {
    url = urlParser.parse(req.url, true);
    data = {
        "head":{
            "title": "TheVivent",
            "description": "Lorem ipsum..."
        }
    }

    if(url.query.ajax){
        data.html = fs.readFileSync( __dirname + '/views/home.hbs' ).toString();
        res.json(data)
    }
    else{
        res.render("home", data)
    }


})

app.get('/CV', (req, res) => {
    url = urlParser.parse(req.url, true);

    data = {
        "head":{
            "title": "TheVivent - CV",
            "description": "Lorem ipsum..."
        }
    }

    if(url.query.ajax){
        data.html = fs.readFileSync( __dirname + '/views/CV.hbs' ).toString();
        res.json(data)
    }
    else{
        res.render("CV", data)
    }

    res.render("CV",
        {layout: (!url.query.ajax?defaultLayoutName:false)})

})

app.get('/projekty', (req, res) => {
    url = urlParser.parse(req.url, true);

    res.render("projekty",
        {layout: (!url.query.ajax?defaultLayoutName:false)})

})

app.listen(port); // turn on web-server