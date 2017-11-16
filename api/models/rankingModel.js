'use strict';
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var rankingSchema = new Schema({
	score: {
		type: Number,
		required: 'Ranking requerido'
	},
	name: {
		type: String,
		required: 'Informe o  nome'
	}
	});
module.exports = mongoose.model('Ranking', rankingSchema);