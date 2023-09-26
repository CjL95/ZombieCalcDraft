let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
// const bodyparser = require('body-parser');
//Loads the handlebars module
let _handlebars = require('handlebars');
let exphbs = require('express-handlebars');
let {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
//check test
import mongoose from 'mongoose';
//import cors from 'cors';
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var postRouter = require('./routes/posts');

var app = express();

require('dotenv').config({ path: './config/.env' });
//database name
// var dbName = 'copFinal';
// var dbConnection = mongoose.connection;

//mongo connection
mongoose.Promise = global.Promise;

const dbUser = process.env.DB_USER;
const dbName = process.env.DB_NAME;
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD);

//mongo connection
async function connectToDatabase() {
  try {
    mongoose.Promise = global.Promise;
    const fullConnect = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.h5mrqz7.mongodb.net/${dbName}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('DB connected');
  } catch (e) {
    console.error('Could not connect to DB:', e.message);
  }
}

connectToDatabase();

//vhost


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//add handlebars
app.engine('.hbs', exphbs({
	layoutsDir: __dirname + '/views/layouts',
	partialsDir: __dirname + '/views/partials',
	handlebars: allowInsecurePrototypeAccess(_handlebars),
	//new configuration parameter
	extname: '.hbs', 
	defaultLayout: 'main'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/posts', postRouter);

//CORS setup
//app.use(cors());

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