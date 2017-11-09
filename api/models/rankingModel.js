'use strict';
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var rankingSchema = new Schema({
	Score: {
	type: Number,
	required: 'Ranking requerido'
	}
	});
module.exports = mongoose.model('Ranking', rankingSchema);