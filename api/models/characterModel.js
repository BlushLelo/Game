'use strict';
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var characterSchema = new Schema({
	personagem: {
		type: String,
		required: 'Personagem requerido'
	},
	img: {
		type: String,
		required: 'Imagem requerida'
	}
	});
module.exports = mongoose.model('Character', characterSchema);