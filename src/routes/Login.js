// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const loginController = require('../controllers/loginController');


// ************ Middlewares ************
const registerValidations = require('../middlewares/registerValidatorMiddleware');
const upload = require('../middlewares/uploadMiddleware');

/* GET - Login/registro */
router.get('/login', loginController.login);
router.get('/registro', loginController.registro);
router.post('/registro', upload.single('avatar'), registerValidations, loginController.store);

module.exports = router;