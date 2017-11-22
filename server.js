var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Dificuldade = require('./api/models/dificuldadesModel'),
  Ranking = require('./api/models/rankingModel'),
  Registro = require('./api/models/registroModel'),
  path = require('path'),
  bodyParser = require('body-parser');
  
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://admin:admin@ds064198.mlab.com:64198/prezado0');
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  app.use(require('./api/routes/dificuldadesRoutes'));
  app.use(require('./api/routes/rankingRoutes'));//importing route
  app.use(require('./api/routes/registroRoutes'));
  app.use(require('./api/routes/loginRoutes'));
  //routes(app); //register the route
  app.use(express.static(path.join(__dirname, 'views')));

  app.listen(port);

  console.log('Dificuldade RESTful API server started on: ' + port);
