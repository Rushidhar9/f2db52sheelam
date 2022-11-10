var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Biryani = require("./models/biryani");

require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var biryaniRouter = require('./routes/biryani');
var gridRouter = require('./routes/gridbuild');
var selectRouter = require('./routes/selector');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/biryani',biryaniRouter);
app.use('/gridbuild',gridRouter);
app.use('/selector',selectRouter);


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

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

async function recreateDB(){
  // Delete everything
  await Biryani.deleteMany();
  let instance1 = new Biryani({biryaniType: "Chicken", biryaniFlavor: "masala", biryaniPrice: 15});
  let instance2 = new Biryani({biryaniType: "Mutton", biryaniFlavor: "dum", biryaniPrice: 17});
  let instance3 = new Biryani({biryaniType: "Prawn", biryaniFlavor: "spicy", biryaniPrice: 19});

  instance1.save( function(err,doc) {
    if(err) return console.error(err);
    console.log("First object saved")
  });
  instance2.save( function(err,doc) {
    if(err) return console.error(err);
    console.log("Second object saved")
  });
  instance3.save( function(err,doc) {
    if(err) return console.error(err);
    console.log("Third object saved")
  });

  }
  let reseed = true;
  if (reseed) { recreateDB();}

module.exports = app;
