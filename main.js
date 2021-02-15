const express = require("express");
const handlebars = require("express-handlebars");
const port = 80; // server port (no shit)

// load app
const app = express();
app.set('view engine', 'hbs')
app.engine('hbs', handlebars({
    extname: 'hbs',                             // set hbs extension
    defaultLayout: 'defaultLayout',             // set default layout (in views/layouts)
    layoutsDir: __dirname + '/views/layouts',   // set layouts dir
    partialsDir: __dirname + '/views/partials/' // set partials dir
}))

app.use(express.static("public")) // make website use sources from public dir

// handling pages. Needs to be moved to separate file & find better solution for handling AJAX
app.get('/', (req, res) => {

    if (url.query.ajax) {
        res.render("home",
            {layout: false})
    }
    else{
        res.render('home');
    }

})

app.get('/CV', (req, res) => {

    if (url.query.ajax) {
        res.render("CV",
            {layout: false})
    }
    else{
        res.render('CV');
    }

})

app.listen(port); // turn on web-server