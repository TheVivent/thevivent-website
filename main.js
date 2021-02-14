const express = require("express");
const urlParser = require("url");
const port = 80;

const app = express();
app.set('view engine', 'hbs')
app.use(express.static("src"))


app.get('/*', (req, res) => {
    body = "test";
    url = urlParser.parse(req.url, true);


    console.log(url.query.ajax)

    if (url.query.ajax) {
        res.send("asdsa")
    }
    else{

        res.render('index', {
            body: body
        });
    }
})

app.listen(port);