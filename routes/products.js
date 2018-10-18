var express = require('express');
var products = express.Router();



products.get('/', function(req, res, next) {
    if(req.session.user)
    {
        var msg=req.session.user;
        res.render('products',{msg:msg});
    }
    else
        res.render('products',{msg:""});
});



module.exports = products;