'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Snippet = require('./api/models/snippetModel'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  authController = require('./api/controllers/auth');

mongoose.connect('mongodb://localhost/Tetherdb', {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

var routes = require('./api/routes/tetherRoutes');
routes(app, authController);

app.listen(port);

console.log('test RESTful API server started on: ' + port);
