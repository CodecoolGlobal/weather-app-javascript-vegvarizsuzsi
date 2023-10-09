
const express = require('express');
const app = express();
const port = 3001;

app.use(express.static('public'));


// app.use(logger)

app.set('view engine', 'html')
app.get("/", logger, (req, res) => {
    console.log('Here')    
})


function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

// app.listen(3000);
app.listen(port, () => {
    console.log(`Please click here: ${`http://localhost:3000/`}`)
  })






