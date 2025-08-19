var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const http = require('http')
require('dotenv').config()
const {connecttoMongoDB} = require("./config/db")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRouter');



var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


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
  res.json('error');
});

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Fonction pour démarrer le serveur après connexion à MongoDB
const startServer = async () => {
  try {
    await connecttoMongoDB(); // attend la connexion MongoDB
    console.log(" Connected to MongoDB");

    server.listen(PORT, () => {
      console.log(` App running on port ${PORT}`);
    });
  } catch (err) {
    console.error(" MongoDB connection failed:", err);
  }
};

startServer();