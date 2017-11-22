'use restrict';

var express = require('express');
var router = express.Router();
var character = require('../controllers/characterController');

	router.post('/character', character.createCharacter);
	router.get('/character', character.getCharacters);


module.exports = router;