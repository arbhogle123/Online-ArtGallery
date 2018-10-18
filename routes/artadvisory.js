var express = require('express');
var artadvisory = express.Router();



artadvisory.get('/', function(req, res, next) {
    if(req.session.user)
    {
        var msg=req.session.user;
        res.render('artadvisory',{msg:msg});
    }
    else
        res.render('artadvisory',{msg:""});
});



module.exports = artadvisory;