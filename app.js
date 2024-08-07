var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');  // index.jsの設定 
var usersRouter = require('./routes/users');  // users.jsの設定
var helloRouter = require('./routes/hello');  // hello.jsの設定
var notesRouter = require('./routes/notes');  // notes.jsの設定
var catRouter = require('./routes/cat');  // cat.jsの設定
var dogRouter = require('./routes/dog');  // dog.jsの設定
var notes_from_bRouter = require('./routes/notes_from_b');  // notes_from_b.jsの設定

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);                    // index
app.use('/users', usersRouter);               // index/users
app.use('/hello', helloRouter);               // index/hello
app.use('/notes', notesRouter);               // index/notes
app.use('/cat', catRouter);                   // index/cat
app.use('/dog', dogRouter);                   // index/dog
app.use('/notes_from_b', notes_from_bRouter); // index/notes_from_b

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
