var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require('mongoose'),
    Snippet = require('./api/models/snippetModel'),
    User = require('./api/models/usermodel'),
    bodyParser = require('body-parser');

  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/Tetherdb');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  var routes = require('./api/routes/tetherRoutes');
  routes(app);

  app.listen(port);

console.log('test RESTful API server started on: ' + port);
