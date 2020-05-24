const createError  = require('http-errors');
const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
require('dotenv').config();

const indexRouter    = require('./routes/index');
const registerRouter = require('./routes/register');
//newrouter


const app = express();


/* db çağır */
const  db = require("./helper/db.js")();


//ara katman dahil et
const tokenDogrula = require('./arakatman/tokendogrula');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('token_key', process.env.TOKEN_KEY);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //aslı false
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/public/register', registerRouter);


app.use('/api', tokenDogrula);
//useRouter


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: res.locals.error});
});

module.exports = app;
