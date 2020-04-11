const db = require('../database/models/');
const Products = db.products;
const Categories = db.categories;
const Brands = db.brands;
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const helperFunctions = require('../functions/helpers');
const { validationResult } = require('express-validator'); 

 


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
	byCategory: (req, res) => {
		// return res.send("sfsd")

		Categories.findAll({
			where:{
				nombre:req.params.cat	
			},
			include: ["products"]
		})
		.then(result => {	
		   return	res.render(req.params.cat,{'productos': result  });
		})

		.catch(error => res.send(error)); 
			 
		 
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
		let brands = Brands.findAll();
		let categories = Categories.findAll();
		//res.render('productUpdate',{'producto': helperFunctions.getProductById(req.params.idProducto)});
		Products
			.findByPk(req.params.idProducto)
			.then( product => {
				return res.render('ProductUpdate', { 
					'product' : product,
					'brands' : brands,
					'categories' : categories 

				});
			})
			.catch(error => res.send(error));
	},
	updateProcess: (req, res) => {
		 
		const hasErrorGetMessage = (field, errors) => {
			for (let oneError of errors) {
				if (oneError.param == field) {
					return oneError.msg;
				}
			}
			return false;
		}
				
		let errorsResult = validationResult(req);
         console.log('hola');
		console.log(errorsResult );
	 

		if ( !errorsResult.isEmpty() ) {

			
	 
		Products
		.findByPk(req.params.idProducto)
		.then( product => {
			return res.render('ProductUpdate', { 
				'product' : product,
				errors: errorsResult.array(),
				hasErrorGetMessage,
				oldData: req.body

			});
		})
		.catch(error => res.send(error));
			

		

		} else {

					// Asignar el nombre final de la imagen
		req.body.foto = req.file.filename;

		Products
		.update({
			nombre_product: req.body.nombre_product,
			descripcion_larga:	req.body.descripcion_larga,
			descripcion:	req.body.descripcion,
			tamaño:	req.body.tamaño,
			precio:	req.body.precio,
			stock:	req.body.stock,
			foto:	req.body.foto
		
		},
			
			{

                where:{ id: req.params.idProducto}

			}
			
			)
		.then(products => {
 
	
				// Redirección para seguir agregando productos	
		return res.redirect('/products/todosAdmin');
		 
		}
		
		
		)
		.catch(error => res.send(error));
		
	}

	},
	addProcess: (req, res) => {

		const hasErrorGetMessage = (field, errors) => {
			for (let oneError of errors) {
				if (oneError.param == field) {
					return oneError.msg;
				}
			}
			return false;
		}
				
		let errorsResult = validationResult(req);
         console.log('hola');
		console.log(errorsResult );
	 

		if ( !errorsResult.isEmpty() ) {

			
		let brands = Brands.findAll();
		let categories = Categories.findAll();
		Promise
			.all([brands, categories])
			.then(results => {
				return res.render('productAdd', {
					brands: results[0],
					categories: results[1],
					errors: errorsResult.array(),
					hasErrorGetMessage,
					oldData: req.body
				});
			})
			.catch(error => res.send(error));
			

		

		} else {
		Products
		.create(req.body)
		.then(product => {
			// insertar en la pivot
			product.addCategories(req.body.categories);
			return res.redirect('/products/todosAdmin');
		})
		.catch(error => res.send(error));

	}
	},
	borrar: function (req, res){
		
			//return res.redirect('/products/todosAdmin');
			Products
			.findByPk(req.params.idProducto, {
				include: ["categories"]
			})
			.then(product => {
				// return res.send(product.categories)
				product.removeCategories(product.categories);
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