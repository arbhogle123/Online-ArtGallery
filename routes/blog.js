var express = require('express');
var blog= express.Router();


blog.get('/', function(req, res, next) {
    if(req.session.user)
    {
        var msg=req.session.user;
        res.render('blog',{msg:msg});
    }
    else
        res.render('blog',{msg:""});
});



module.exports = blog;