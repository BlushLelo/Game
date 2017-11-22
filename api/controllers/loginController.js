'use strict';

var mongoose = require('mongoose'),
User = mongoose.model('Registro');


exports.getUser = function(req, res) {
    var Ruser = new User(req.body);
    Ruser.findOne({ login: req.header('login') }, function (err, user) {
        if (err)
            res.send(err);
        else
        if (Ruser.password === req.header('password')){
            console.log("Deu bom");
        } else
            res.send(err);
    });
};