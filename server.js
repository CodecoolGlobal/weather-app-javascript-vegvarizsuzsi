
const express = require('express');
const app = express();


app.use(logger)
app.use(express.static("public"))

app.set('view engine', 'html')
app.get("/", logger, (req, res) => {
    console.log('Here')
    // res.render("index")
})


function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

app.listen(3000);







