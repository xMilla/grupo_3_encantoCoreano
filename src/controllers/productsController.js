const fs = require('fs');
const path = require('path');
const multer = require('multer');
const helperFunctions = require('../functions/helpers');


let diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../public/images/k-music'));
	},
	filename: function (req, file, cb) {
		let finalName = Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

let upload = multer({ storage: diskStorage })


let productsData = helperFunctions.getAll('todos');
let musicData = helperFunctions.getAll('k-pop'); //Faltaria filtrar por categoria/tipo : music, food o beauty.

const productAddController = {
	products: (req, res) => {
		res.render('todos',{'productos':productsData});
	},
	food: (req, res) => {
		//res.render('productAdd');
	},
	beauty: (req, res) => {
		//res.render('productAdd');
	},
	music: (req, res) => {
		res.render('music',{'productos':musicData});
	},
	add: (req, res) => {
		res.render('productAdd');
	},
	addProcess: (req, res) => {
		// Asignar el nombre final de la imagen
		req.body.foto = req.file.filename;

		// Guardar el producto y como la función retorna la data lo almacenamos en ela variable "product"
		let product = helperFunctions.storeData(req.body,'add');

		// Redirección para seguir agregando productos
		return res.send('Producto cargado');

	},
	borrar: function (req, res){
		let product = helperFunctions.getAll('todos');
		productosFinales = product.filter(function(producto){
			return producto.id != req.params.idProducto;
		});
		helperFunctions.storeData(productosFinales,'borrar');
		res.redirect('/products/Add');
	},
	todosAdmin: (req, res) => {
		res.render('todosAdmin',{'productos':productsData});
	},
	detail: (req, res) => {
		res.render('detalleProducto');
	},
	
};

module.exports = productAddController