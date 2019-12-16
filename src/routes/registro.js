// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productAdd = require('../controllers/registrocontroller');

/* GET - Carrito. */
router.get('/registro', registro.root);


module.exports = router;