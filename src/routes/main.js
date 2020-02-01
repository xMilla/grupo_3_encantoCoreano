// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

// ************ Middlewares ************
const registerValidations = require('../middlewares/registerValidatorMiddleware');
const upload = require('../middlewares/uploadMiddleware');
 


/* GET - home page. */
router.get('/', mainController.root);
router.get('/carrito',mainController.carrito);
router.get('/metodoDePago',mainController.metodoDePago);
router.get('/login',mainController.login);
router.get('/registro',mainController.registro);
router.post('/registro', upload.single('avatar'), registerValidations, mainController.store);


module.exports = router;
