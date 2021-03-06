const db = require('../database/models/');
const Products = db.products;
const Users = db.products;
const fs = require('fs');
const path = require('path');
const helperFunctions = require('../functions/helpers');

let productsData = helperFunctions.getAll('todos');

const controller = {
	root: (req, res) => {
		res.render('index',{
			
	    'productos':productsData,
		'avatar' : req.session.avatar
	});
	},
	carrito: (req, res) => {
		res.render('Carrito');
	},
	metodoDePago:(req, res) => {
		res.render('MetodoPago');
	},


	
};

module.exports = controller
