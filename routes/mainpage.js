var express = require('express');
var mainpage= express.Router();



mainpage.get('/', function(req, res, next) {
    if(req.session.user)
    {
        var msg=req.session.user;
        res.render('mainpage',{msg:msg});
    }
    else
        res.render('mainpage',{msg:""});
});



module.exports = mainpage;