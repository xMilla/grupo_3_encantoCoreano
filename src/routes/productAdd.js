// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productAdd = require('../controllers/productAdd');

/* GET - Carrito. */
router.get('/productAdd', productAdd.root);


module.exports = router;