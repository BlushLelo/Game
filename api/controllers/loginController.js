'use strict';

var mongoose = require('mongoose'),
User = mongoose.model('Registro');


exports.getUser = function(req, res) {
    var Ruser = new User(req.body);
    Ruser.findOne({ login: user.login }, function (err, user) {
        if (err)
            res.send(err);
        else
        if (Ruser.password === user.password){
            console.log("Deu bom");
        } else
            res.send(err);
    });
};



exports.registrar = function(req, res) {
	var novoRegistro = new Registro(req.body);
    Registro.findOne({ login: novoRegistro.login }, function (err, registro) {
        if (err)
            res.send(err);
        else
            if(registro) {
            if (novoRegistro.login !== registro.login){
                novoRegistro.save(function(err, register) {
                    if (err)
                        res.send(err);
                    res.json(register);
                });
            }
            }else
                novoRegistro.save(function(err, register) {
                    if (err)
                        res.send(err);
                    res.json(register);
                });
    });
};