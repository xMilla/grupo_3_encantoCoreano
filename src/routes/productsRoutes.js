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


/* GET - Producto-> /products/add */
router.get('/add', productsController.add);



/* GET - Producto-> /products/add */

router.get('/add/:idProducto', productsController.add);

/* POST - Producto-> /products/add */
//router.post('/add', upload.single('foto'), productsController.addProcess);
router.post('/add/:idProducto', productsController.addProcess);
 
router.post('/add', productsController.addProcess);
/* GET - Producto-> /products/todosAdmin */
router.get('/todosAdmin', productsController.todosAdmin);

/* Delete - Producto-> /products/borrar/id*/
router.delete('/borrar/:idProducto', productsController.borrar);

/* GET - Producto-> /products/update/id*/
router.get('/update/:idProducto', productsController.update);

/* GET - Producto-> /products/update/id*/
router.post('/editProd/:idProducto', productsController.updateProcess);

/* GET - Producto-> /products/detalle */
router.get('/detalle', productsController.detail);

/* GET - Producto-> /products/detalle/id */
router.get('/detalle/:idProducto', productsController.detail);
router.get('/:cat', productsController.byCategory);


module.exports = router;