'use strict';
var dotenv = require('dotenv');
dotenv.config();

var express = require('express'),
    app = express(),
    port = process.env.PORT,
    mongoose = require('mongoose'),
    Snippet = require('./api/models/storyModel'),
    User = require('./api/models/userModel'),
    bodyParser = require('body-parser'),
    authController = require('./api/controllers/auth'),
    cookieParser = require('cookie-parser')

mongoose.connect('mongodb://localhost/Tetherdb', {
    useMongoClient: true
});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST")
    next();
});

var routes = require('./api/routes/tetherRoutes');
routes(app, authController);

app.listen(port);

console.log('test RESTful API server started on: ' + port);
