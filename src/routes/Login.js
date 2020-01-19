// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const loginController = require('../controllers/loginController');

/* GET - Login/registro */
router.get('/login', loginController.login);


module.exports = router;