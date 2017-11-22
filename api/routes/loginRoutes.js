'use restrict';

var express = require('express');
var router = express.Router();
var login = require('../controllers/loginController');

	router.get('/login', login.getUser);


module.exports = router;