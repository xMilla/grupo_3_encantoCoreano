const fs = require('fs');
const path = require('path');


const controller = {
	root: (req, res) => {
		res.render('index');
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
