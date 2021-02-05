/////////////////////////////////////////express server ///////////////////////////////////

const express = require("express");

var app = express();

var bodyParser = require("body-parser");

const initiateMongo = require('./config/database');

initiateMongo() //starting mongo db

app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({message: "Welcome to your JukeBox......! Keep loving Music "}); //default message
});

const view = require('./routes/router')(app);

app.listen(8082);

console.log("Listening to PORT 8082");