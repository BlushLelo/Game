'use strict';
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var dificuldadeSchema = new Schema({
	level: {
	type: String,
	required: 'Por favor entre com a dificuldade'
	},
	periodo: { 
	type: String,
	required: 'Por favor entre com o periodo'
	}
	});
	
	module.exports = mongoose.model('Dificuldade', dificuldadeSchema);