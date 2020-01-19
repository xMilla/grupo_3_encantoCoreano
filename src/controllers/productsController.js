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
let beautyData = helperFunctions.getAll('k-beauty'); // flor
let foodData = helperFunctions.getAll('food'); // flor
const productAddController = {
	products: (req, res) => {
		res.render('todos',{'productos':productsData});
	},
	food: (req, res) => {
		//res.render('productAdd');
		res.render('food',{'productos': foodData  });
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
	update: (req, res) => {
		res.render('productUpdate',{'productoId':req.params.idProducto});
	},
	updateAdd: (req, res) => {
		// Asignar el nombre final de la imagen
		req.body.foto = req.file.filename;

		// Guardar el producto y como la función retorna la data lo almacenamos en ela variable "product"
		if(req.body.idProducto != ' '){
			req.body.id = req.params.idProducto;			
			helperFunctions.storeData(req.body,'update');
		}
		else{
		    helperFunctions.storeData(req.body,'add');
		}
		

		// Redirección para seguir agregando productos
		res.render('todosAdmin',{'productos':productsData});

	},
	addProcess: (req, res) => {
		// Asignar el nombre final de la imagen
		req.body.foto = req.file.filename;

		// Guardar el producto y como la función retorna la data lo almacenamos en ela variable "product"
		 helperFunctions.storeData(req.body,'add');
		
		// Redirección para seguir agregando productos
		res.render('todosAdmin',{'productos':productsData});

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