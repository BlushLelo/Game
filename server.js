var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Dificuldade = require('./api/models/dificuldadesModel'),
  bodyParser = require('body-parser');
  
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/Topicos');
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  var routes = require('./api/routes/dificuldadesRoutes'); //importing route
  routes(app); //register the route

  app.listen(port);

  console.log('Dificuldade RESTful API server started on: ' + port);
