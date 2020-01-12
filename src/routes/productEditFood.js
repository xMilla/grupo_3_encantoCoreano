// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productEditFood = require('../controllers/productEditFoodController');

/* GET - Carrito. */
router.get('/productEditFood', productEditFood.root);
router.post('/borrar/:id', productEditFood.borrar);
router.delete('/borrar/:id', productEditFood.borrar);
module.exports = router;