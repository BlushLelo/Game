var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  mongoDB = 'mongodb://admin:admin@ds064198.mlab.com:64198/prezado0';
  Dificuldade = require('./api/models/dificuldadesModel'),
  Ranking = require('./api/models/rankingModel'),
  bodyParser = require('body-parser');
  
  mongoose.Promise = global.Promise;
  mongoose.connect(mongoDB, {
    useMongoClient: true
  });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error: '));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  var routes = require('./api/routes/dificuldadesRoutes'); //importing route
  routes(app); //register the route


  app.listen(port);

  console.log('Dificuldade RESTful API server started on: ' + port);
