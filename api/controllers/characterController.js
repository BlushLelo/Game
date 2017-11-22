'use strict';

var mongoose = require('mongoose'),
Character = mongoose.model('Character');


exports.getCharacters = function(req, res) {
    Character.find({}, function(err, character) {
        if(err)
            res.send(err);
        res.json(character);
    });
};


exports.createCharacter = function(req, res) {
    var novoCharacter = new Character(req.body);
    novoCharacter.save(function(err, character) {
        if (err)
            res.send(err);
        res.json(character);
    });
};