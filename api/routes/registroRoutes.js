'use restrict';

var express = require('express');
var router = express.Router();
var registro = require('../controllers/registroController');

	router.post('/registro', registro.registrar);


module.exports = router;