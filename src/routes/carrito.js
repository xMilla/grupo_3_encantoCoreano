// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const carritoController = require('../controllers/carritoController');

/* GET - Carrito. */
router.get('/Carrito', carritoController.root);

module.exports = router;