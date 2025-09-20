var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRouter');
var abonnementRouter = require('./routes/abonnementRouter');
var paiementRouter = require('./routes/paiementRouter');
var reservationRouter = require('./routes/reservationRouter');
var serviceInterRouter = require('./routes/service_interRouter');
var factureRouter = require('./routes/factureRouter.js');
var categorieRouter = require('./routes/categorieRouter.js');
var reclamationRouter = require('./routes/reclamationRouter.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/abonnements', abonnementRouter); 
app.use('/paiements', paiementRouter);
app.use('/reservations', reservationRouter);
app.use('/service_inter', serviceInterRouter);
app.use('/factures', factureRouter);
app.use('/categories', categorieRouter);
app.use('/reclamations', reclamationRouter);

// catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app; // <--- IMPORTANT

