const fs = require('fs');
const path = require('path');
const helperFunctions = require('../functions/helpers');

let productsData = helperFunctions.getAll('todos');

const controller = {
	root: (req, res) => {
		console.log("hola");
		res.render('index',{'productos':productsData});
	},
	carrito: (req, res) => {
		res.render('Carrito');
	},
	metodoDePago:(req, res) => {
		res.render('MetodoPago');
	},

	login:(req, res) => {
		res.render('login');
	},
	
};

module.exports = controller
