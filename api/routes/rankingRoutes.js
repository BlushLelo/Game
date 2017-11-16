'use restrict';

var express = require('express');
var router = express.Router();
var ranking = require('../controllers/rankingController');
	
	router.get('/ranking', ranking.getRanking);
	router.post('/ranking', ranking.postRanking);


module.exports = router;