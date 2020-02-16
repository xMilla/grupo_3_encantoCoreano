const db = require('../database/models/');
const Products = db.products;
const Categories = db.categories;
const Brands = db.brands;
;
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const helperFunctions = require('../functions/helpers');


/*let diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../public/images/k-music'));
	},
	filename: function (req, file, cb) {
		let finalName = '../../images/k-music/' + Date.now() + path.extname(file.originalname);
		cb(null, finalName);
	}
});

let upload = multer({ storage: diskStorage })*/


let productsData = helperFunctions.getAll('todos');
let musicData = helperFunctions.getAll('k-pop'); 
let beautyData = helperFunctions.getAll('beauty');
let foodData = helperFunctions.getAll('food'); 

const productAddController = {
	products: (req, res) => {

		 
		 Products
			.findAll()
			.then(products => {
				
				return res.render('todos', { 
					title: 'Products List',
					'productos' : products
				});
			})
			.catch(error => res.send(error)); 

			
	},
	food: (req, res) => {
		/*
		Products
			.findByPk(req.body.id_category, {
				include: ['categories']
			})
			.then(product => {
				return res.render('food', { 
					title: `Food`,
					'productos' : products
				});
			})
			.catch(error => res.send(error));*/
	},
	beauty: (req, res) => {
		
		res.render('beauty',{'productos': beautyData  });
	},
	music: (req, res) => {
		res.render('music',{'productos':musicData});
	},
	add: (req, res) => {

		let brands = Brands.findAll();
		let categories = Categories.findAll();

		Promise
			.all([brands, categories])
			.then(results => {
				res.render('productAdd', {
					title: 'Product Cate',
					brands: results[0],
					categories: results[1]
				});
			})
			.catch(error => res.send(error));

		return;
	},
	update: (req, res) => {
		
		res.render('productUpdate',{'producto': helperFunctions.getProductById(req.params.idProducto)});
	},
	updateProcess: (req, res) => {
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
		return res.redirect('/products/todosAdmin');

	},
	addProcess: (req, res) => {
		Products
		.create(req.body)
		.then(product => {
			// insertar en la pivot
			product.addCategories(req.body.categories);
			return res.redirect('/products/todosAdmin');
		})
		.catch(error => res.send(error));
	},
	borrar: function (req, res){
		
		//return res.redirect('/products/todosAdmin');
		Products
			.findByPk(req.params.id)
			.then(product => {
				product.destroy();
				return res.redirect('/products/todosAdmin');
			})
			.catch(error => res.send(error));
	},
	todosAdmin: (req, res) => {
		//res.render('todosAdmin',{'productos':productsData});
		Products
			.findAll()
			.then(products => {
				
				return res.render('todosAdmin', { 
					title: 'Products List',
					'productos' : products
				});
			})
			.catch(error => res.send(error));
	},
	detail: (req, res) => {
		//let productdet = helperFunctions.getProductById(req.params.idProducto);		
		//res.render('detalleProducto',{'producto':productdet});
		Products
			.findByPk(req.params.idProducto)
			.then( product => {
				return res.render('detalleProducto', { 
					'producto' : product
				});
			})
			.catch(error => res.send(error));
	},
	
};

module.exports = productAddController