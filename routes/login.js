var express = require('express');
var login= express.Router();
var mongoose=require('mongoose'),
    assert=require('assert');
var User=require('../models/user');


login.get('/', function(req, res, next) {
    res.render('login',{msg:''});
});

login.post('/',function(req,res,next){
    var username=req.body.formusername;
    var pass=req.body.formpassword;
    var url = 'mongodb://127.0.0.1/artgalleryuser';
    mongoose.connect(url);
    var db=mongoose.connection;
    db.on('error',console.error.bind(console,'conection error:'));
    db.once('open',function(){
        console.log('Connected correctly');
        User.findOne({username:username,password:pass})			//What's the correct callback synatax here?
            .exec(function(err,user){


                if(err) throw err;
                if(!user){
                    var mess='Your username or password is not Valid';
                    res.render('\login',{msg:mess});
                    db.close();
                }
                else{
                    req.session.user = username;
                    res.redirect('/');
                    db.close();
                }

            });
    });
});


module.exports = login;