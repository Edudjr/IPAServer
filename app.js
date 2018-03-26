var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");

var index = require('./routes/index');
var users = require('./routes/users');

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var app = express();

//Change the login and password to fit your needs
let login = 'admin';
let password = 'admin';

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
app.use(passport.initialize());

app.use('/build', passport.authenticate('basic', { session: false }));
app.use('/build', express.static(path.join(__dirname, 'build')));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

passport.use(new BasicStrategy(
  function(username, password, done) {
    if (username === login && password === password){
      return done(null, {user: 1});
    }else{
      return done(null, false, { message: 'Incorrect username.' });
    }
  }
));

app.get('/release', passport.authenticate('basic', { session: false }),
  function(req, res) {
    let json = {
      title: 'IPA Installer',
      login: login,
      password: password
    }
    res.render('releases', json);
  });

app.use('/', index);
app.use('/users', users);

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
