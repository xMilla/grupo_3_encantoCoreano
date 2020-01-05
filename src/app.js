// ************ Require's ************
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');

// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', './src/views'); // Seteo de la ubicación de la carpeta "views"



// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************
const mainRouter = require('./routes/main');
//app.use('/', mainRouter);
app.get('/', (req,res) => res.render('index'));

//const rutasCarrito = require('./routes/carrito');
app.get('/Carrito', (req,res) => res.render('Carrito'));

//const rutasMetodoPago = require('./routes/metodopago');
app.get('/MetodoPago', (req,res) => res.render('MetodoPago'));

//const rutasproductAdd = require('./routes/productAdd');
app.get('/productAdd', (req,res) => res.render('productAdd'));

//const rutasdetalleproducto = require('./routes/detalleproducto');
app.get('/detalleproducto', (req,res) => res.render('detalleproducto'));

//const rutasregistro = require('./routes/registro');
app.get('/registro', (req,res) => res.render('registro'));


// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ************ exports app - dont'touch ************
module.exports = app;
