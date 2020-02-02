// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const loginController = require('../controllers/loginController');

// ************ Middlewares ************
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const registerValidations = require('../middlewares/registerValidatorMiddleware');
const upload = require('../middlewares/uploadMiddleware');

/* GET - Login/registro */
router.get('/login', loginController.login);
router.get('/registro', loginController.registro);
router.post('/registro', upload.single('avatar'), registerValidations, loginController.store);
/* POST to /users/login */
router.post('/users/login', loginController.processLogin);

/* GET to /users/profile */
router.get('/profile', authMiddleware, loginController.profile);
/* GET to /users/profile */
router.get('/users/profile', authMiddleware, loginController.profile);
/* GET to /users/logout */
router.get('/logout', loginController.logout);


module.exports = router;