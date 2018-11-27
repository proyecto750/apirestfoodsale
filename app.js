var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//VAR
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var  usuarios = require('./routes/api/apirestfoodsale');
var  menus = require('./routes/api/menus');
var  ordenes = require('./routes/api/ordenes');
var  restaurantesfood = require('./routes/api/restaurantes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//USE
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apirestfoodsale', usuarios);
app.use('/menus', menus);
app.use('/ordenes', ordenes);
app.use('/restaurantes', restaurantesfood);

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

var port = 8888;
app.listen(port, () =>{
console.log("Corriendo en el puerto " + port)
});

module.exports = app;
