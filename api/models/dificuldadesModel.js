'use strict';
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var dificuldadeSchema = new Schema({
	dificuldade: {
		type: String,
		required: 'Informe a dificuldade',
	},
	cenario: {
	type: String,
	required: 'Por favor entre com a dificuldade'
	},
	velocidade: {
	type: Number,
	required: 'Por favor informe a velocidade'
	}
	});
	
	module.exports = mongoose.model('Dificuldade', dificuldadeSchema);