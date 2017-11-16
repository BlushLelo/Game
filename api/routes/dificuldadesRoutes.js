'use restrict';
var express = require('express');
var router = express.Router();
var dificuldade = require('../controllers/dificuldadesController');
	
	router.get('/dificuldade',
		dificuldade.getDificuldades);

	router.post("/dificuldade", dificuldade.createDificuldade);
		
	router.get('/dificuldade/:dificuldadeId',
		dificuldade.getDificuldade);

	router.delete('/dificuldade', dificuldade.deleteDificuldade);

module.exports = router;