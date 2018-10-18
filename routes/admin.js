var express = require('express');
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var admin= express.Router();


admin.get('/', function(req, res, next) {
    if(req.session.user)
    {
        var msg=req.session.user;
        res.render('admin',{msg:msg});
    }
    else
        res.render('admin',{msg:""});
});

admin.post('/',function (req,res,next) {
    var name = req.body.name;
    var password = req.body.pass;
    if(name == "aditya" && password == "admin123"){
        res.render('dashboard',{msg:""});
    }
    else {
        var msg = "Wrong Name/Password";
        res.render('admin', {msg: msg});
    }
});

admin.post('/admin?12',function (req,res,next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = 'C:/Users/hp/Documents/NetBeansProjects/artgallery/uploads' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;

            res.render('dashboard', {done: 'File uploaded and saved my server!'});
            res.end();
        });
    });
});

module.exports = admin;