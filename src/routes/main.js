// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');
// ************ Controller Require ************
const loginController = require('../controllers/loginController');

// ************ Middlewares ************
const registerValidations = require('../middlewares/registerValidatorMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');


/* GET - home page. */
router.get('/', mainController.root);
router.get('/carrito',mainController.carrito);
router.get('/metodoDePago',mainController.metodoDePago);
router.get('/login',mainController.login);
router.get('/registro',mainController.registro);
router.post('/registro', upload.single('avatar'), registerValidations, mainController.store);
/* POST to /users/login */
router.post('/login', mainController.processLogin);
router.post('/users/login', mainController.processLogin);
 
 
router.get('/profile', authMiddleware, loginController.profile);

/* GET to /users/logout */
router.get('/logout', loginController.logout);
/* GET to /users/profile */
router.get('/users/profile', authMiddleware, loginController.profile);
module.exports = router;
