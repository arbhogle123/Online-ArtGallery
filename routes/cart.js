var express = require('express');
var cart= express.Router();
var mongoose=require('mongoose'),
    assert=require('assert');
var User=require('../models/user');
var shoppingcart = require('../models/image');

cart.get('/', function(req, res, next) {
    if(req.session.user)
    {
        var msg=req.session.user;

        var url = 'mongodb://127.0.0.1/artgalleryuser';
        mongoose.connect(url);
        var db=mongoose.connection;
        db.on('error',console.error.bind(console,'conection error:'));
        db.once('open',function(){
            console.log('connected correct');

            User.find({username:msg})
                .exec(function(err,user){

                    var resultArray = [] ;

                    if(err) throw err;
                    if(user){

                        user.forEach(function(item){
                            resultArray.push(item);
                        });
                        fname1 =resultArray[0].fname;
                        lname1 =resultArray[0].lname;
                        usname =resultArray[0].username;
                        email1 = resultArray[0].email;
                        mno1 = resultArray[0].mno;
                        res.render('cart',{mess:"",msg:msg,fname:fname1,lname:lname1,uname:usname,email:email1,mno:mno1});
                        db.close();
                    }
                    else{
                        res.render('cart',{mess:"",msg:msg,fname:"",lname:"",uname:"",email:"",mno:""});
                        db.close();
                    }
                });

        });

    }
    else
        res.render('cart',{mess:"",msg:msg,fname:"",lname:"",uname:"",email:"",mno:""});
});

cart.post('/',function(req, res, next){
    var msg=req.session.user;
    var imgname=req.body.imgname;
    var address=req.body.addr;
    var payment=req.body.payment;
    var url = 'mongodb://127.0.0.1/artgalleryuser';
    mongoose.connect(url);
    var db=mongoose.connection;
    db.on('error',console.error.bind(console,'Conection error:'));
    db.once('open',function(){
        console.log('connected correctly');
        shoppingcart.findOne({username:msg})
            .exec(function(err,user){


                if(err) throw err;
                if(!user){
                    shoppingcart.findOne({imgname:imgname})
                        .exec(function(err,user){

                            if(err) throw err;
                            if(!user){
                                var newuser=new User({
                                    imgname:imgname,
                                    username:msg,
                                    address:address,
                                    payment:payment
                                });

                                newuser.save(function(err){
                                    if(err) throw err;

                                    console.log('Image registered');
                                    db.close();
                                    var mess='Please wait till further transaction page is loaded.It may take a while';
                                    res.render('\cart',{mess:mess,msg:msg,fname:"",lname:"",uname:"",email:"",mno:""});
                                });
                            }
                            else{

                                db.close();
                                var mess='No such user.You need to sign in to our site';
                                res.render('\cart',{mess:mess,msg:msg,fname:"",lname:"",uname:"",email:"",mno:""});
                            }

                        });
                }
                else{

                    db.close();
                    var mess='You have bought this image before.Have you lost it???';
                    res.render('\cart',{mess:mess,msg:msg,fname:"",lname:"",uname:"",email:"",mno:""});
                }

            });


    });


});

module.exports = cart;