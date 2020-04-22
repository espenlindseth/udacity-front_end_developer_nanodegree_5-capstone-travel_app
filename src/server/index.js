const dotenv = require('dotenv');
dotenv.config();

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist'))
})

// designates what port the app will listen to for incoming requests
const server = app.listen(8081, function () {
    console.log('App listening on port 8081!')
})

module.exports = server;
