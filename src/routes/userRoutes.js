// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const userController = require('../controllers/userController');

/***********************MULTER***************************/
let diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../public/images/k-music'));
	},
	filename: function (req, file, cb) {
		let finalName = '../../images/k-music/' + Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

let upload = multer({ storage: diskStorage })

// ************ Middlewares ************

const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const registerValidations = require('../middlewares/registerValidatorMiddleware');


/* GET - user/profile */
router.get('/profile',authMiddleware,userController.profile);

/* GET - user/login */
router.get('/login', guestMiddleware, userController.login);

/*POST to /user/login */
router.post('/login',userController.processLogin);

/* GET - /user/registro */
router.get('/registro', guestMiddleware, userController.registro);
router.get('/products/user/registro', guestMiddleware, userController.registro);

/* POST - user/registro*/ 
router.post('/registro', upload.single('avatar'),registerValidations, userController.store);

/* GET - Producto-> /products/todosAdmin */
router.get('/todosUserAdmin', userController.ListarAdm);
 /*GET to /user/logout */
router.get('/logout', userController.logout);
// Eliminar - DELETE - destroy
router.delete('/:id', userController.destroy);
module.exports = router;