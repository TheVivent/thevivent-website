const express = require("express");
const urlParser = require("url");
const port = 80;

const app = express();
app.set('view engine', 'hbs')
app.use(express.static("src"))


app.get('/*', (req, res) => {
    body = "test";
    url = urlParser.parse(req.url, true);


    if (url.query.ajax) {
        url_tab = url.pathname.split('/')
        res.render(url_tab[1])
    }
    else{

        res.render('index', {
            body: body
        });
    }
})

app.listen(port);