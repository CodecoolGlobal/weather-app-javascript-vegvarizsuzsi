
const express = require('express');
const app = express();
const port = 3000;

// const options = {
//     setHeaders: function (res, path, stat) {
//         if (/.*\.css$/.test(path)) {
//             res.set('Content-type', 'text/css');
//         }
//     }
// }

app.use(express.static('public'));


// app.use(logger)

app.set('view engine', 'html')
app.get("/", logger, (req, res) => {
    console.log('Here')
    // res.render("index")
})


function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

// app.listen(3000);
app.listen(port, () => {
    console.log(`Please click here: ${`http://localhost:3000/`}`)
  })






