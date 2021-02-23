// imports
const express = require("express");
const urlParser = require("url")
const handlebars = require("express-handlebars");
const Handlebars = require('handlebars')
const fs = require("fs");

// config
const port = 80; // server port (no shit)
const defaultLayoutName = "defaultLayout"

// load app
const app = express();
app.set('view engine', 'hbs')
app.engine('hbs', handlebars({
    extname: 'hbs',                                 // set hbs extension
    defaultLayout: defaultLayoutName,               // set default layout (in views/layouts)
    layoutsDir: __dirname + '/views/layouts',       // set layouts dir
    partialsDir: __dirname + '/views/partials/',    // set partials dir
    helpers: {                                      // load helpers (if)
        "compare": function (lvalue, operator, rvalue, options) {  // helper from http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/#comment-44

            var operators, result;
            
            if (arguments.length < 3) {
                throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
            }
            
            if (options === undefined) {
                options = rvalue;
                rvalue = operator;
                operator = "===";
            }
            
            operators = {
                '==': function (l, r) { return l == r; },
                '===': function (l, r) { return l === r; },
                '!=': function (l, r) { return l != r; },
                '!==': function (l, r) { return l !== r; },
                '<': function (l, r) { return l < r; },
                '>': function (l, r) { return l > r; },
                '<=': function (l, r) { return l <= r; },
                '>=': function (l, r) { return l >= r; },
                'typeof': function (l, r) { return typeof l == r; }
            };
            
            if (!operators[operator]) {
                throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
            }
            
            result = operators[operator](lvalue, rvalue);
            
            if (result) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        }
    }
}))

app.use(express.static("public")) // make website use sources from public dir

// handling pages. Needs to be moved to separate file & find better solution for handling AJAX
app.get('/', (req, res) => {
    url = urlParser.parse(req.url, true);
    data = {
        head: {
            title: "TheVivent",
            description: "Lorem ipsum..."
        },
        header: {
            currentPage: "home"
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
        head:{
            title: "TheVivent - CV",
            description: "Lorem ipsum..."
        },
        header: {
            currentPage: "CV"
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

    data = {
        head:{
            title: "TheVivent - projekty",
            description: "Lorem ipsum..."
        },
        header: {
            currentPage: "projekty"
        },
        projects: []
    }

    // read all projects from dir
    var i = 0
    fs.readdirSync(__dirname + '/views/projekty/').forEach(file => {
        data.projects[i++] = file.replace('.hbs', '')
    });
    console.log(data.projects)

    if(url.query.ajax){
        html = fs.readFileSync( __dirname + '/views/projekty.hbs' ).toString();
        html = Handlebars.compile(html)
        data.html = html(data)
        res.json(data)
    }
    else{
        res.render("projekty", data)
    }

})

app.get('/projekty/:project', (req, res) => {
    url = urlParser.parse(req.url, true);

    data = {
        head:{
            title: "TheVivent - projekty",
            description: "Lorem ipsum..."
        },
        header: {
            currentPage: "projekty"
        }
    }

    if(url.query.ajax){
        data.html = fs.readFileSync( __dirname + `/views/projekty/${req.params.project}.hbs` ).toString();
        res.json(data)
    }
    else{
        res.render(`projekty/${req.params.project}`, data)
    }
    
})

app.listen(port); // turn on web-server