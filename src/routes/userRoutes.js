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
		cb(null, path.join(__dirname, '../../public/images/avatars'));
	},
	filename: function (req, file, cb) {
		let finalName = '../../images/avatars/' + Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

let upload = multer({ storage: diskStorage })

// ************ Middlewares ************

const authMiddleware      = require('../middlewares/authMiddleware');
const guestMiddleware     = require('../middlewares/guestMiddleware');
const registerValidations = require('../middlewares/registerValidatorMiddleware');
const loginValidations     = require('../middlewares/loginValidatorMiddleware');
const userValidations     = require('../middlewares/userEditValidatorMiddleware');
/* GET - user/profile */
router.get('/profile',authMiddleware , userController.profile);
router.get('/editUser/:id',userController.edit);

 
router.post('/editUser/:id', upload.single('avatar') , userValidations ,userController.update);

/* GET - user/login */
router.get('/login',   userController.login);

/*POST to /user/login */
router.post('/login',   loginValidations,  userController.processLogin  );

/* GET - /user/registro */
router.get('/registro',  userController.registro);
//router.get('/products/user/registro', guestMiddleware, userController.registro);

/* POST - user/registro*/ 
router.post('/registro', upload.single('avatar'),registerValidations, userController.store);

/* GET - Producto-> /products/todosAdmin */
router.get('/todosUserAdmin', userController.ListarAdm);
 /*GET to /user/logout */
router.get('/logout', userController.logout);
// Eliminar - DELETE - destroy
router.delete('/:id', userController.destroy);
module.exports = router;

