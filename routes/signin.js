var express = require('express');
var signin= express.Router();
var mongoose=require('mongoose'),
    assert=require('assert');
var User=require('../models/user');


signin.get('/', function(req, res, next) {
    res.render('signin',{msg:''});
});

signin.post('/',function(req, res, next){
    var fname=req.body.formfname;
    var lname=req.body.formlname;
    var username=req.body.formusername;
    var pass=req.body.formpassword;
    var email=req.body.formemail;
    var mno=req.body.formmno;

    var url = 'mongodb://adi123:bhogle123@ds135433.mlab.com:35433/artgallery';
    mongoose.connect(url);
    var db=mongoose.connection;
    db.on('error',console.error.bind(console,'Conection error:'));
    db.once('open',function(){
        console.log('connected correctly');
        User.findOne({username:username})
            .exec(function(err,user){


                if(err) throw err;
                if(!user){
                    User.findOne({email:email})
                        .exec(function(err,user){


                            if(err) throw err;
                            if(!user){
                                var newuser=new User({

                                    username:username,
                                    password:pass,
                                    fname: fname,
                                    lname: lname,
                                    email:email,
                                    mno:mno
                                });


                                newuser.save(function(err){
                                    if(err) throw err;

                                    console.log('User created');
                                    db.close();
                                    var mess='You are register successfully and Now you can login';
                                    res.render('\login',{msg:mess});
                                });
                            }
                            else{

                                db.close();
                                var mess='This email is already registered try another one';
                                res.render('\signin',{msg:mess});
                            }

                        });
                }
                else{

                    db.close();
                    var mess='This username is already registered try another one';
                    res.render('\signin',{msg:mess});
                }

            });


    });


});


module.exports = signin;
