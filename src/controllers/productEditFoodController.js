const fs = require('fs');
const path = require('path');


const ubicacionProductos = './src/data/productos.json';

function traerProductos () {
	let contenidoProductos = fs.readFileSync(ubicacionProductos, 'utf-8');
	contenidoProductos = contenidoProductos == '' ? [] : JSON.parse(contenidoProductos);
	return contenidoProductos;
}

 

function guardarProductos (productos) {
	fs.writeFileSync(ubicacionProductos, JSON.stringify(productos, null, ' '));
}
// ************ Function to Read an HTML File ************
function readHTML (fileName) {
	let filePath = path.join(__dirname, `/../views/${fileName}.html`);
	let htmlFile = fs.readFileSync(filePath, 'utf-8');
	return htmlFile;
}



const productEditFoodController = {
	root: (req, res) => {
		//let html = readHTML('productAdd');
		res.render('productEditFood');
	},
	borrar: function (req, res){
		let productos = traerProductos();
		productosFinales = productos.filter(function(unProducto){
			return unProducto.id != req.params.idProducto;
		});
		guardarProductos(productosFinales);
		res.render('productEditFood');
	}
};

module.exports = productEditFoodController