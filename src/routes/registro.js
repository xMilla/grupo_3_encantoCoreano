// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const registrocontroller = require('../controllers/registrocontroller');

/* GET - Carrito. */
router.get('/registro', registrocontroller.root);


module.exports = router;