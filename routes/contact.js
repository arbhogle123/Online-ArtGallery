var express = require('express');
var contact= express.Router();



contact.get('/', function(req, res, next) {
    if(req.session.user)
    {
        var msg=req.session.user;
        res.render('contact',{msg:msg});
    }
    else
        res.render('contact',{msg:""});
});



module.exports = contact;