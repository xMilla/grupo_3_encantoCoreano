// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/* GET - Producto-> /products/add */
router.get('/add', productsController.add);

/* GET - Producto-> /products/detalle */
router.get('/detalle', productsController.detail);

module.exports = router;