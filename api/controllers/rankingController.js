'use strict';

var mongoose = require('mongoose'),
Ranking = mongoose.model('Ranking');

exports.getRanking = function(req, res) {
	Ranking.find({}, function(err, ranking) {
		if(err)
			res.send(err);
		res.json(ranking);
	});
};

exports.postRanking = function(req, res) {
	var novoRanking = new Ranking(req.body);
	novoRanking.save(function(err, ranking) {
		if (err)
				res.send(err);
		res.json(ranking);
	});
};