'use strict';

var mongoose = require('mongoose'),
Dificuldade = mongoose.model('Dificuldade');

exports.getDificuldades = function(req, res) {
	Dificuldade.find({}, function(err, dificuldade) {
		if(err)
			res.send(err);
		res.json(dificuldade);
	});
};

exports.createDificuldade = function(req, res) {
	var novaDificuldade = new Dificuldade(req.body);
	novaDificuldade.save(function(err, dificuldade) {
		if (err)
				res.send(err);
		res.json(dificuldade);
	});
};

exports.getDificuldade = function(req, res) {
	Dificuldade.findById({ _id: req.params.dificuldadeId}, function(err, dificuldade) {
		if (err)
			res.send(err)
		res.json(dificuldade);
	});		
};

exports.deleteDificuldade = function(req, res) {


  Dificuldade.remove({
    _id: req.params.dificuldadeId
  }, function(err, dificuldade) {
    if (err)
      res.send(err);
    res.json({ message: 'Dificuldade successfully deleted' });
  });
};
