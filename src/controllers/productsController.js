const fs = require('fs');
const path = require('path');
const helperFunctions = require('../functions/helpers');

let productsData = helperFunctions.getAll();

const productAddController = {
	products: (req, res) => {
		res.render('todos',{'productos':productsData});
	},
	food: (req, res) => {
		res.render('productAdd');
	},
	beauty: (req, res) => {
		res.render('productAdd');
	},
	music: (req, res) => {
		res.render('productAdd');
	},
	add: (req, res) => {
		res.render('productAdd');
	},
	detail: (req, res) => {
		res.render('detalleProducto');
	},
	
};

module.exports = productAddController