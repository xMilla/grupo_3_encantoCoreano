const fs = require('fs');
const path = require('path');

const productAddController = {
	add: (req, res) => {
		res.render('productAdd');
	},
	detail: (req, res) => {
		res.render('detalleProducto');
	},
	
};

module.exports = productAddController