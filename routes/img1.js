var express = require('express');
var img1= express.Router();


img1.get('/', function(req, res, next) {
    if(req.session.user)
    {
        var msg=req.session.user;
        res.render('img1',{msg:msg});
    }
    else
        res.render('img1',{msg:""});
});



module.exports = img1;