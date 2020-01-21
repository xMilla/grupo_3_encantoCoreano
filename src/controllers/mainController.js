const fs = require('fs');
const path = require('path');
const helperFunctions = require('../functions/helpers');

<<<<<<< HEAD

const controller = {
	root: (req, res) => {
		res.render('index');
=======
let productsData = helperFunctions.getAll('todos');

const controller = {
	root: (req, res) => {
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
>>>>>>> a29b505f61aed26ceed07a80eb39f71c26d4962b
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
