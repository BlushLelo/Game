'use strict';

var mongoose = require('mongoose'),
Registro = mongoose.model('Registro');


exports.registrar = function(req, res) {
	var novoRegistro = new Registro(req.body);
    Registro.findOne({ login: novoRegistro.login }, function (err, registro) {
        if (err)
            res.send(err);
        else
            if (novoRegistro.login !== registro.login){
                novoRegistro.save(function(err, register) {
                    if (err)
                        res.send(err);
                    res.json(register);
                });
            } else
                res.send(err);
    });
};