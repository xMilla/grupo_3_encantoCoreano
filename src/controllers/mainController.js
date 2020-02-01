const fs = require('fs');
const path = require('path');
const helperFunctions = require('../functions/helpers');
const { validationResult } = require('express-validator'); 
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
	registro:(req, res) => {
		res.render('registro');
	},

	store: (req, res) => {
		const hasErrorGetMessage = (field, errors) => {
			for (let oneError of errors) {
				if (oneError.param == field) {
					return oneError.msg;
				}
			}
			return false;
		}
		
		let errorsResult = validationResult(req);

		if ( !errorsResult.isEmpty() ) {
			return res.render('registro', {
				errors: errorsResult.array(),
				hasErrorGetMessage,
				oldData: req.body
			});
		} else {
			
	    // Asignar el nombre final de la imagen
	//	req.body.foto = req.file.filename;
		// Guardar el producto y como la función retorna la data lo almacenamos en ela variable "product"

		 	// Hasheo la contraseña
	//req.body.user_password = bcrypt.hashSync(req.body.user_password, 11);
	// Genero la data del usuario
	let newUserData = {
		id: helperFunctions.generateUserId(),
		avatar: req.file.filename,
		...req.body
	}
	// Guardo al usuario en el JSON
	helperFunctions.storeUser(newUserData);
	// Redirección
    return res.send('<h1>Ok, pasó las validaciones</h1>');
	
}
},
};


 
module.exports = controller
