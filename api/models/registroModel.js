'use strict';
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var registroSchema = new Schema({
	login: {
		type: String,
		required: 'Login requerido'
	},
	password: {
		type: String,
		required: 'Senha requerida'
	}
	});
module.exports = mongoose.model('Registro', registroSchema);