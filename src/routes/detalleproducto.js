// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productAdd = require('../controllers/detallePcontroller');

/* GET - Carrito. */
router.get('/detalleproducto', detalleproducto.root);


module.exports = router;