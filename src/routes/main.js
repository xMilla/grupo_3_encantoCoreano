// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');
const productsController = require('../controllers/productsController');
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
router.get('/login',   guestMiddleware, mainController.login);
router.get('/registro',mainController.registro);
router.get('/index', authMiddleware, loginController.index);

/* GET to /users/logout */
router.get('/logout', loginController.logout);
/* GET to /users/profile */
router.get('/users/index', authMiddleware, loginController.index);

router.post('/registro', upload.single('avatar'), registerValidations, mainController.store);
/* POST to /users/login */
router.post('/login', mainController.processLogin);
router.post('/users/login', mainController.processLogin);
 
 




/* GET - Producto-> /products/todos */
router.get('/todos', productsController.products);

/* GET - Producto-> /products/food */
router.get('/food', productsController.food);

/* GET - Producto-> /products/beauty */
router.get('/beauty', productsController.beauty);

/* GET - Producto-> /products/music */
router.get('/music', productsController.music);


/* GET - Producto-> /products/todos */
router.get('/products/todos', productsController.products);

/* GET - Producto-> /products/food */
router.get('/products/food', productsController.food);

/* GET - Producto-> /products/beauty */
router.get('/products/beauty', productsController.beauty);

/* GET - Producto-> /products/music */
router.get('/products/music', productsController.music);

 
module.exports = router;
