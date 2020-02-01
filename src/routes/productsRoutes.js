// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

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

// ************ Middlewares ************



let upload = multer({ storage: diskStorage })



/* GET - Producto-> /products/todos */
router.get('/todos', productsController.products);

/* GET - Producto-> /products/food */
router.get('/food', productsController.food);

/* GET - Producto-> /products/beauty */
router.get('/beauty', productsController.beauty);

/* GET - Producto-> /products/music */
router.get('/music', productsController.music);

/* GET - Producto-> /products/add */
router.get('/add', productsController.add);

/* GET - Producto-> /products/add */
router.get('/add/:idProducto', productsController.add);

/* POST - Producto-> /products/add */
router.post('/add', upload.single('foto'), productsController.addProcess);

/* GET - Producto-> /products/todosAdmin */
router.get('/todosAdmin', productsController.todosAdmin);

/* POST - Producto-> /products/borrar/id*/
router.post('/borrar/:idProducto', productsController.borrar);

/* GET - Producto-> /products/update/id*/
router.get('/update/:idProducto', productsController.update);

/* GET - Producto-> /products/update/id*/
router.get('/updatedata/:idProducto',upload.single('foto'), productsController.updateAdd);

/* POST - Producto-> /products/update/id*/
router.post('/updatedata/:idProducto',upload.single('foto'), productsController.updateAdd);

/* GET - Producto-> /products/detalle */
router.get('/detalle', productsController.detail);

/* GET - Producto-> /products/detalle/id */
router.get('/detalle/:idProducto', productsController.detail);


module.exports = router;