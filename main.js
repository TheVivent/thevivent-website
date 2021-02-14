const express = require("express");
const port = 80;

const app = express();
app.set('view engine', 'hbs')
app.use(express.static("src/img"))


app.get('/*', (req, res) => {
    res.render('index');
})

app.listen(port);