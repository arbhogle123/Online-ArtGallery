var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var formidable = require('formidable');
var fs = require('fs');

var mainpage = require('./routes/mainpage');
var contact = require('./routes/contact');
var artadvisory = require('./routes/artadvisory');
var blog = require('./routes/blog');
var products = require('./routes/products');
var login = require('./routes/login');
var signin = require('./routes/signin');
var img1 = require('./routes/img1');
var logout = require('./routes/logout');
var cart = require('./routes/cart');
var admin = require('./routes/admin');
var prod1 = require('./routes/prod1');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret:'ss',saveUninitialized:true, resave:false}));

app.use('/', mainpage);
app.use('/contactus',contact);
app.use('/artadvisory',artadvisory);
app.use('/blog',blog);
app.use('/products',products);
app.use('/login',login);
app.use('/signin',signin);
app.use('/img1',img1);
app.use('/logout',logout);
app.use('/cart',cart);
app.use('/admin1997',admin);
app.use('/product',prod1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
