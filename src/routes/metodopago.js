// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const MetodoPagoController = require('../controllers/MetodoPagoController');

/* GET - Carrito. */
router.get('/MetodoPago', MetodoPagoController.root);

module.exports = router;