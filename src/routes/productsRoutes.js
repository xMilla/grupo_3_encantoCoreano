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
		let finalName = Date.now() + path.extname(file.originalname);
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

/* POST - Producto-> /products/add */
router.post('/add', upload.single('foto'), productsController.addProcess);

/* GET - Producto-> /products/detalle */
router.get('/detalle', productsController.detail);


module.exports = router;