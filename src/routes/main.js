// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');



/* GET - home page. */
router.get('/', mainController.root);
router.get('/carrito',mainController.carrito);
router.get('/metodoDePago',mainController.metodoDePago);
router.get('/login',mainController.login);



module.exports = router;
