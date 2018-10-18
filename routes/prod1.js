var express = require('express');
var prod1= express.Router();


prod1.get('/', function(req, res, next) {
    if(req.session.user)
    {
        var msg=req.session.user;
        res.render('prod1',{msg:msg});
    }
    else
        res.render('prod1',{msg:""});
});



module.exports = prod1;