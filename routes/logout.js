var express = require('express');
var logout= express.Router();

logout.get('/', function(req, res, next) {
    req.session.user="";
    res.render('mainpage',{msg:""});

});

module.exports = logout;