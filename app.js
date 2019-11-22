var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');
const initializePassportAuthen = require('./controller/passport_authen_config');
const { checkRequestAuthenticated, checkRequestNotAuthenticated } = require('./middleware/authenticate');

var app = express();

// setup authentication with passport-local strategy
initializePassportAuthen(passport);

// setup session
app.set('trust proxy', 1);
app.use(session({
  secret: 'my secret',      // used to encrypt session id
  resave: false,            // force save session even if session data not change
  saveUninitialized: true   // force save session if it is new
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(methodOverride('_method'));   // user for /logout router

// Init Passport & restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// setup routing
app.use('/', indexRouter);
app.use('/users', checkRequestAuthenticated, usersRouter);
app.use('/login', checkRequestNotAuthenticated, loginRouter(passport));
app.use('/register', checkRequestNotAuthenticated, registerRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
