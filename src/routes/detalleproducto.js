// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const detallePcontroller = require('../controllers/detallePcontroller');

/* GET - Carrito. */
router.get('/detalleproducto', detallePcontroller.root);


module.exports = router;